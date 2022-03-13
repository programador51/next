import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { createContext, useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
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

      <AppLayout>
        <section>
          <Image
            src="/devter-logo.png"
            width={150}
            height={150}
            alt="devter-logo"
          />
          <Link href="https://nextjs.org/learn/basics/assets-metadata-css/third-party-javascript">
            <h1>
              <a>devter</a>
            </h1>
          </Link>
          <h2>Le'ts talk about development 😎</h2>
          <GithubLogin />
        </section>
      </AppLayout>
    </Provider>
  );
}
