import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

interface ContainerProps {
  $hasFloatingPreview: boolean;
}

export const Container = styled(motion.div)<ContainerProps>`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  ${props =>
    !props.$hasFloatingPreview &&
    css`
      display: flex;

      main {
        display: flex;
        flex: 1;
        overflow: hidden;
        position: relative;
        margin-top: 0.4rem;
        height: 100vh;
      }

      #preview {
        position: relative;
        height: 100%;
        border-radius: 0;
        left: unset;
        top: unset;
      }
    `}
`;

export const Editor = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;

  main {
    flex: 1;
    position: relative;
  }
`;
