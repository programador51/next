import css from "styled-jsx/css";

export const styles = css.global`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }

  main {
    background-color: var(--white);
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    height: 90vh;
    width: 100%;
  }

  @media (min-width: 520px) {
    main {
      width: var(--mobileWidth);
    }
  }
`;
