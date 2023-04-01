import styled from "styled-components";
import { FacebookIcon, InstagramIcon, TwiiterIcon, YoutubeIcon } from "./Icons";

const Wrapper = styled.div`
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

const FooterLink = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-size: 13px;
  margin-bottom: 14px;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const FooterLinkItem = styled.span`
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

const FooterCoptyRigthRow = styled.div`
  margin-top: 4px;
`;

function Footer() {
  return (
    <Wrapper>
      <FooterSocial>
        <FooterSocialItem href="https://www.facebook.com/">
          <FacebookIcon />
        </FooterSocialItem>
        <FooterSocialItem href="https://www.instagram.com/">
          <InstagramIcon />
        </FooterSocialItem>
        <FooterSocialItem href="https://twitter.com/">
          <TwiiterIcon />
        </FooterSocialItem>
        <FooterSocialItem href="https://www.youtube.com/">
          <YoutubeIcon />
        </FooterSocialItem>
      </FooterSocial>

      <FooterLink>
        <FooterLinkItem>
          <span>화면 해설</span>
        </FooterLinkItem>
        <FooterLinkItem>
          <span>고객 센터</span>
        </FooterLinkItem>
        <FooterLinkItem>
          <span>기프트카드</span>
        </FooterLinkItem>
        <FooterLinkItem>
          <span>미디어 센터</span>
        </FooterLinkItem>
        <FooterLinkItem>
          <span>투자 정보(IR)</span>
        </FooterLinkItem>
        <FooterLinkItem>
          <span>입사 정보</span>
        </FooterLinkItem>
        <FooterLinkItem>
          <span>이용 약관</span>
        </FooterLinkItem>
        <FooterLinkItem>
          <span>개인정보</span>
        </FooterLinkItem>
        <FooterLinkItem>
          <span>법적 고지</span>
        </FooterLinkItem>
        <FooterLinkItem>
          <span>쿠키 설정</span>
        </FooterLinkItem>
        <FooterLinkItem>
          <span>회사 정보</span>
        </FooterLinkItem>
        <FooterLinkItem>
          <span>문의하기</span>
        </FooterLinkItem>
      </FooterLink>

      <FooterService>
        <FooterServiceItem>서비스 코드</FooterServiceItem>
      </FooterService>

      <FooterCopyRight>
        <FooterCoptyRigthRow>
          <span>
            넷플릭스서비시스코리아 유한회사 통신판매업신고번호:
            제0000-서울ㅇㅇ-0000호 전화번호: 000-000-0000
          </span>
        </FooterCoptyRigthRow>
        <FooterCoptyRigthRow>
          <span>대표: ㅇㅇㅇㅇ ㅇ ㅇㅇㅇ</span>
        </FooterCoptyRigthRow>
        <FooterCoptyRigthRow>
          <span>이메일 주소: abced@netflix.com</span>
        </FooterCoptyRigthRow>
        <FooterCoptyRigthRow>
          <span>
            주소: 대한민국 서울특별시 ㅇㅇ구 ㅇㅇㅇ로 00, ㅇㅇㅇㅇㅇㅇ 0동 00층
            우편번호 00000
          </span>
        </FooterCoptyRigthRow>
        <FooterCoptyRigthRow>
          <span>사업자등록번호: 000-00-00000</span>
        </FooterCoptyRigthRow>
        <FooterCoptyRigthRow>
          <span>클라우드 호스팅: Amaooo Web Services Inc.</span>
        </FooterCoptyRigthRow>
        <FooterCoptyRigthRow>
          <span>공정거래위원회 웹사이트</span>
        </FooterCoptyRigthRow>
      </FooterCopyRight>
    </Wrapper>
  );
}

export default Footer;
