import React from "react";
import { styles } from "./styles";

export default function AppLayout({ children }) {
  return (
    <>
      <style jsx>{styles}</style>
      <div>
        <main>{children}</main>
      </div>
    </>
  );
}
