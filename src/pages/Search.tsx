import styled from "styled-components";
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
      <Layout headerMovieNone={true} pageTitle="">
        <EmptyPage></EmptyPage>
      </Layout>
    </>
  );
}

export default Search;
