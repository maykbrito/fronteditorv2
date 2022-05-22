import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;

  &.fixed-right {
    display: flex;
    /* grid-template-rows: 2rem 1fr; */
    /* grid-template-columns: 1fr 50vw; */
    /* grid-template-areas:
      'A B'
      'C B'; */

    & div:nth-child(1) {
      flex: 1;
    }

    main {
      /* grid-area: C; */
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;

      margin-top: 0.4rem;
      height: 100vh;
    }

    #preview {
      position: initial;
      height: 100%;
      width: 50vw;
      border-radius: 0;

      display: grid;
      grid-template-columns: 2px 1fr; /* .dragger width */

      .dragger {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: #ccc;
        cursor: col-resize;

        position: relative;
        z-index: 1;

        &.is-dragging {
          width: 100vw;
          opacity: 0.6;
        }
      }

      header {
        display: none;
      }

      iframe {
        height: 100%;
      }
    }
  }
`;
