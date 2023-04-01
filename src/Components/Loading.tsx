import styled from "styled-components";

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 3vw;
`;

function Loading() {
  return <LoadingBox>Loading...</LoadingBox>;
}

export default Loading;
