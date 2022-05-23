import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface ContainerProps {
  $hasFloatingPreview: boolean;
}

export const Container = styled(motion.div)<ContainerProps>`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  ${(props) =>
    !props.$hasFloatingPreview &&
    css`
      display: flex;

      main {
        display: flex;
        flex: 1;
        overflow: hidden;
        position: relative;
        margin-top: 12px;
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

interface TabsProps {
  $hasLogo: boolean;
}

export const Tabs = styled.nav<TabsProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
  background: #13111b;

  ${(props) =>
    !props.$hasLogo &&
    css`
      padding-left: 32px;
    `}

  .logo-container {
    width: 74px;
    text-align: center;
  }

  img {
    width: 16px;
  }

  button {
    background: transparent;
    border: none;
    color: #e1e1e6;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    outline: none;
    padding: 0px 6px;
    position: relative;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 4px;
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  button.active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
