import React from "react";
import { styles } from "./styles";

export default function AppLayout({ children }) {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="container">
        <main>{children}</main>
      </div>
    </>
  );
}
