import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pathState, previewState, scorllState } from "../store/atoms";

const PreviewOverlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  z-index: 99;
`;

const PreviewModal = styled(motion.div)`
  width: 80%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.black.darker};
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  z-index: 99;
  overflow: hidden;
  font-size: 14px;
`;

const overlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { delay: 0.2 },
  },
};

const PreviewMovieVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2, type: "tween" },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};
function AllMovie() {
  const history = useNavigate();
  const currentPath = useRecoilValue(pathState);
  const setPreviewActive = useSetRecoilState(previewState);
  const scrollY = useRecoilValue(scorllState);

  const onExitPreview = () => {
    window.scrollTo(0, scrollY);
    setPreviewActive(false);
    history(`${currentPath}`);
  };
  return (
    <>
      <PreviewOverlay
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        onClick={onExitPreview}
        className="preview-overlay"
      />

      <PreviewModal
        variants={PreviewMovieVariants}
        initial="initial"
        animate="animate"
        className="preview"
      ></PreviewModal>
    </>
  );
}

export default AllMovie;
