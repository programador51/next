import Head from "next/head";
import Image from "next/image";
import React, { createContext, useState, useEffect } from "react";
import GithubLogin from "../components/Button/Github";
import { onAuthStateChangedState } from "../firebase/clients";

/**
 * Context user app
 * @type {React.Context<import("../types/context/UserContext").UserContextI>}
 */
export const ContextUser = createContext();
const { Provider } = ContextUser;

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChangedState(setUser);
  }, []);

  return (
    <Provider
      value={{
        setUser,
        user,
      }}
    >
      <style jsx>{`
        h1 {
          color: var(--primary);
          font-weight: 800;
          margin: 0;
        }

        section {
          display: grid;
          place-content: center;
          place-items: center;
          height: 100%;
        }

        h2 {
          color: var(--secondary);
          font-size: 1rem;
          margin: 0;
        }
      `}</style>

      <Head>
        <title>devter</title>
      </Head>

      <>
        <section>
          <Image
            src="/devter-logo.png"
            width={150}
            height={150}
            alt="devter-logo"
          />

          <h1>devter</h1>

          <h2>Le&apos;ts talk about development 😎</h2>
          <GithubLogin />
        </section>
      </>
    </Provider>
  );
}
