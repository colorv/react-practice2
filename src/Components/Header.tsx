import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { previewState, scorllState } from "../atoms";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 68px;
  top: 0;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 10%,
    transparent
  );
  color: white;
  position: fixed;
  font-size: 14px;
  padding: 0 4%;
  box-sizing: border-box;
  z-index: 2;
`;

const Column = styled.div`
  display: flex;
`;

const Logo = styled(motion.svg)`
  margin-right: 45px;
  width: 95px;
  height: 25px;
  fill: ${({ theme }) => theme.red};
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  margin-right: 20px;
  color: ${({ theme }) => theme.white.darker};

  position: relative;
  &:hover {
    color: ${({ theme }) => theme.white.hover};
  }
  &.selected {
    border-bottom: 1.5px solid white;
  }
`;

const ItemText = styled.span`
  color: ${({ theme }) => theme.white.lighter};
`;

const Search = styled(motion.div)`
  height: 35px;
  display: flex;
  align-items: center;
  color: white;
  svg {
    cursor: pointer;
    height: 25px;
  }
`;

const SearchInput = styled(motion.input)`
  width: 250px;
  padding-left: 20px;
  box-sizing: border-box;
  transform-origin: right center;
  background-color: unset;
  border: none;
  color: ${({ theme }) => theme.white.darker};
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.white.hover};
  }
`;

const logoVariants = {
  initial: {
    fillOpacity: 1,
  },
  hover: {
    fillOpacity: [0.1, 1],
    transition: {
      duration: 2,
    },
  },
};

const navVariants = {
  initial: {
    backgroundColor: "rgba(20,20,20,1)",
    transition: { duration: 0.1, ease: "linear" },
  },
  scroll: {
    backgroundColor: "rgba(20,20,20,0)",
    transition: { duration: 0.5, ease: "linear" },
  },
};

function Header() {
  const homeMatch = useMatch("/");
  const seriesMatch = useMatch("/series");
  const movieMatch = useMatch("/movies");
  const latestMatch = useMatch("latest");
  const myListMatch = useMatch("/my-list");
  const originalAudioMatch = useMatch("/original-audio");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchAnimation = useAnimation();
  const searchIconAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const setScrollY = useSetRecoilState(scorllState);

  const previewActive = useRecoilValue(previewState);

  const searchClick = () => {
    if (searchOpen) {
      searchAnimation.start({
        backgroundColor: "rgba(20, 20, 20,0)",
        border: "1px none rgba(255,255,255)",
        transition: { duration: 0 },
      });
      searchIconAnimation.start({ x: 0, transition: { duration: 0 } });
    } else {
      searchAnimation.start({
        backgroundColor: "rgba(20, 20, 20,0.5)",
        border: "1px solid rgba(255,255,255)",
      });
      searchIconAnimation.start({ x: -240 });
    }
    setSearchOpen((prev) => !prev);
  };
  const resetScrollY = () => {
    setScrollY(0);
  };

  useEffect(() => {
    if (previewActive === false) {
      scrollY.on("change", (y) => {
        if (y > 10) {
          navAnimation.start("initial");
        } else {
          navAnimation.start("scroll");
        }
      });
    }
    if (previewActive === true) {
      scrollY.on("change", (y) => {
        navAnimation.stop();
      });
    }
  }, [scrollY, navAnimation, previewActive]);

  return (
    <Nav variants={navVariants} animate={navAnimation}>
      <Column>
        <Logo
          variants={logoVariants}
          initial="initial"
          whileHover="hover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>

        <Links>
          <Item>
            <Link to="/" onClick={resetScrollY}>
              {homeMatch ? <ItemText>홈</ItemText> : "홈"}
            </Link>
          </Item>
          <Item>
            <Link to="/series" onClick={resetScrollY}>
              {seriesMatch ? <ItemText>시리즈</ItemText> : "시리즈"}
            </Link>
          </Item>
          <Item>
            <Link to="/movies" onClick={resetScrollY}>
              {movieMatch ? <ItemText>영화</ItemText> : "영화"}
            </Link>
          </Item>
          <Item>
            <Link to="/latest" onClick={resetScrollY}>
              {latestMatch ? (
                <ItemText>NEW! 요즘 대세 콘텐츠</ItemText>
              ) : (
                "NEW! 요즘 대세 콘텐츠"
              )}
            </Link>
          </Item>
          <Item>
            <Link to="/my-list" onClick={resetScrollY}>
              {myListMatch ? (
                <ItemText>내가 찜한 콘텐츠</ItemText>
              ) : (
                "내가 찜한 콘텐츠"
              )}
            </Link>
          </Item>
          <Item>
            <Link to="/original-audio" onClick={resetScrollY}>
              {originalAudioMatch ? (
                <ItemText>언어별로 찾아보기</ItemText>
              ) : (
                "언어별로 찾아보기"
              )}
            </Link>
          </Item>
        </Links>
      </Column>
      <Column>
        <Search animate={searchAnimation}>
          {searchOpen ? (
            <SearchInput
              initial={{ x: 25, scaleX: 0 }}
              animate={{ scaleX: searchOpen ? 1 : 0 }}
              transition={{ ease: "linear" }}
              placeholder="제목, 사람, 장르"
              type="text"
            />
          ) : null}

          <motion.svg
            animate={searchIconAnimation}
            transition={{ ease: "linear" }}
            onClick={searchClick}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="eveneodd"
            />
          </motion.svg>
        </Search>
      </Column>
    </Nav>
  );
}

export default Header;
