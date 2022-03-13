import React from "react";

/**
 * Render a button
 * @param {React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>} props - Props of the button
 * @returns {JSX.Element}
 */
export default function Button(props) {
  return (
    <>
      <style jsx>
        {`
          button {
            background-color: var(--black);
            color: var(--white);
            border: 0;
            border-radius: 999999px;
            font-weight: 800;
            padding: 8px 24px;
            margin: 10px 0;
            cursor: pointer;
            transition: opacity 0.3s ease;
          }

          button:hover {
            opacity: 0.7;
          }
        `}
      </style>

      <button {...props}>{props.children}</button>
    </>
  );
}
