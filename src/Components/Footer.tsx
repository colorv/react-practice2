import styled from "styled-components";
import { FacebookIcon, InstagramIcon, TwiiterIcon, YoutubeIcon } from "./Icons";

const FooterContainer = styled.footer`
  padding: 0 4%;
  max-width: 980px;
  margin: 20px auto 0 auto;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 16px;
`;

const FooterSocial = styled.div`
  display: flex;
  margin-bottom: 1em;
`;

const FooterSocialItem = styled.a`
  padding: 0 5px;
  margin-right: 15px;
`;

const FooterLinks = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-size: 13px;
  margin-bottom: 14px;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const FooterLinkItem = styled.li`
  margin-bottom: 16px;
  & span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const FooterService = styled.div``;
const FooterServiceItem = styled.button`
  padding: 0.5em;
  margin-bottom: 20px;
  font-size: 13px;
  background-color: unset;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.4);
  &:hover {
    color: ${({ theme }) => theme.white.hover};
    cursor: pointer;
  }
`;

const FooterCopyRight = styled.div`
  margin-bottom: 1.5em;
`;

const FooterCopyRigthRow = styled.div`
  margin-top: 4px;
`;

function Footer() {
  const socialItem = [
    { link: "https://www.facebook.com/", icon: <FacebookIcon /> },
    { link: "https://www.instagram.com/", icon: <InstagramIcon /> },
    { link: "https://twitter.com/", icon: <TwiiterIcon /> },
    { link: "https://www.youtube.com/", icon: <YoutubeIcon /> },
  ];

  const linkItem = [
    "화면 해설",
    "고객 센터",
    "기프트카드",
    "미디어 센터",
    "투자 정보(IR)",
    "입사 정보",
    "이용 약관",
    "개인정보",
    "법적 고지",
    "쿠키 설정",
    "회사 정보",
    "문의하기",
  ];

  const copyRight = [
    "넷플릭스서비시스코리아 유한회사 통신판매업신고번호 : 제1000-서울ㅇㅇ-0111호 전화번호: 080-001-2345",
    "대표: ㅇㅇㅇㅇ ㅇ ㅇㅇㅇ",
    "이메일 주소: korea@netfllx.com",
    "주소: 대한민국 서울특별시 ㅇㅇ구 ㅇㅇㅇ로 00, ㅇㅇㅇㅇㅇㅇ 0동 00층 우편번호 00000",
    "사업자등록번호: 111-02-00000",
    "클라우드 호스팅: Amaooo Web Services Inc.",
    "공정거래위원회 웹사이트",
  ];

  return (
    <FooterContainer className="footer">
      <FooterSocial className="footer-social">
        {socialItem.map((item, index) => (
          <FooterSocialItem key={index} href={item.link}>
            {item.icon}
          </FooterSocialItem>
        ))}
      </FooterSocial>

      <FooterLinks className="footer-links">
        {linkItem.map((item, index) => (
          <FooterLinkItem key={index}>
            <span>{item}</span>
          </FooterLinkItem>
        ))}
      </FooterLinks>

      <FooterService className="footer-service">
        <FooterServiceItem>서비스 코드</FooterServiceItem>
      </FooterService>

      <FooterCopyRight className="footer-copyRight">
        {copyRight.map((item, index) => (
          <FooterCopyRigthRow key={index}>
            <span>{item}</span>
          </FooterCopyRigthRow>
        ))}
      </FooterCopyRight>
    </FooterContainer>
  );
}

export default Footer;
