import styled from "styled-components";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";

const EmptyPage = styled.div`
  display: flex;
  justify-content: center;
  height: 1000px;
  margin-top: 68px;
  color: #666666;
`;

function Search() {
  return (
    <>
      <Helmet>
        <title>넷플릭스</title>
      </Helmet>
      <Layout headerMovieNone={true}>
        <EmptyPage></EmptyPage>
      </Layout>
    </>
  );
}

export default Search;
