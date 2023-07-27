import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  color: white;

  .image-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 80%;
    width: 60%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    z-index: 9;
  }

  height: calc(100vh - 77px);
  width: 100%;
  img {
    opacity: 0.5;
    z-index: -2;
  }
  .body_section {
    position: absolute;
    /* margin: 10rem; */
    padding: 110px;
    height: 100%;
    display: flex;
    z-index: 2;
    flex-direction: row;
    gap: 20px;
  }
  .left_section {
    width: 50%;
  }
  .right_section {
    flex: 1;
  }
`;
