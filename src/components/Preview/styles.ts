import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface ContainerProps {
  $previewState: "closed" | "minimized" | "maximized";
}

export const Container = styled(motion.div)<ContainerProps>`
  --orange: #ffb82a;
  --green: #25c73a;
  --red: #ff4b46;

  position: absolute;
  z-index: 10;
  background: white;
  border-radius: 8px 8px 0 0;
  box-shadow: 0px 2px 8px -4px rgba(0, 0, 0, 0.3);
  overflow: auto;

  display: flex;
  flex-direction: column;

  ${(props) =>
    props.$previewState === "closed" &&
    css`
      width: 110px;
      height: 32px;
      overflow: hidden;
    `}

  .preview-iframe {
    resize: both;
    overflow: hidden;
    height: 100%;

    ${(props) =>
      props.$previewState === "maximized" &&
      css`
        resize: none;
        width: 100% !important;
        height: 100% !important;
      `}

    ${(props) =>
      props.$previewState === "closed" &&
      css`
        display: none;
      `}
  }
`;

interface HeaderProps {
  $canBeDraggable: boolean;
  $isFloating: boolean;
}

export const Header = styled(motion.div)<HeaderProps>`
  background-color: #eee;
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 32px;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  align-items: center;

  ${(props) =>
    !props.$isFloating &&
    css`
      grid-template-columns: 1fr 100px;
    `}

  ${(props) =>
    props.$canBeDraggable &&
    css`
      cursor: move;
    `}

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 32px;

    button {
      width: 12px;
      height: 12px;
      background-color: #aaa;
      border: none;
      border-radius: 50%;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      color: rgba(0, 0, 0, 0.5);
      font-size: 0;

      svg {
        visibility: hidden;

        &.arrow-up {
          transform: rotate(-45deg) translate(1.5px, 0);
        }

        &.arrow-down {
          transform: rotate(-45deg) translate(-2.5px, 0px);
        }
      }
    }

    &:hover button {
      svg {
        visibility: visible;
      }
    }

    &:hover button:nth-of-type(1) {
      background-color: var(--red);
    }

    &:hover button:nth-of-type(2) {
      background-color: var(--orange);
    }

    &:hover button:nth-of-type(3) {
      background-color: var(--green);
    }
  }

  .live-reload {
    font-family: sans-serif;
    font-size: 13px;
    color: #aaa;

    display: flex;
    align-items: center;
    gap: 8px;
  }

  > span {
    font-family: sans-serif;
    font-size: 13px;
    color: #aaa;
    justify-self: center;

    ${(props) =>
      !props.$isFloating &&
      css`
        justify-self: flex-start;
      `}

    ${(props) =>
      props.$canBeDraggable &&
      css`
        padding-right: 52px;
      `}
  }
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
  z-index: 5;
`;

interface ResizeHandlerProps {
  $isResizing: boolean;
}

export const ResizeHandler = styled(motion.div)<ResizeHandlerProps>`
  left: 0;
  top: 0;
  width: 12px;
  height: 100%;
  z-index: 10;
  position: absolute;
  cursor: col-resize;

  display: flex;
  align-items: center;

  ${(props) =>
    props.$isResizing &&
    css`
      width: 100%;
    `}
`;
