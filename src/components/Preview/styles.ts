import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

interface PreviewProps {
  state: 'minimized' | 'maximized' | 'closed';
  // top: string;
  // left: string;
}

const previewState = {
  minimized: css`
    width: min(30%, 600px);
    height: min(30vw, 400px);

    left: unset;
    right: 2%;
    top: 6%;

    transform: translateX(0);
  `,
  maximized: css`
    top: 6%;
    left: 50%;
    right: unset;

    width: 90vw;
    height: 85vh;

    transform: translateX(-50%);
  `,
  closed: css`
    width: 40px;
    height: 16px;

    right: 8px;
    top: 8px;
  `,
};

export const Container = styled(motion.div)<PreviewProps>`
  --orange: #ffb82a;
  --green: #25c73a;
  --red: #ff4b46;

  position: absolute;
  right: 2%;
  top: 40px;
  z-index: 10;
  width: min(30%, 600px);
  height: min(30vw, 400px);
  background: white;
  border-radius: 4px 4px 0 0;
  box-shadow: 0px 2px 8px -4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  resize: both;

  transition-property: width, height;
  transition-duration: 0.2s;

  ${props => previewState[props.state]}
`;

export const Header = styled.header`
  background-color: #eee;
  border-radius: 4px 4px 0 0;
  width: 100%;
  height: 16px;
  cursor: move;
  display: flex;
  align-items: center;
  padding-left: 4px;

  &:hover button:nth-of-type(1) {
    background-color: var(--red);
  }

  &:hover button:nth-of-type(2) {
    background-color: var(--orange);
  }

  &:hover button:nth-of-type(3) {
    background-color: var(--green);
  }

  button {
    width: 8px;
    height: 8px;
    background-color: #777;
    border: none;
    border-radius: 50%;
    display: block;
    overflow: hidden;
    text-indent: -9999px;
    cursor: pointer;
    margin-right: 4px;
  }
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: calc(100% - 16px);
  position: relative;
`;
