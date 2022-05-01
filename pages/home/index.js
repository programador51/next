import React, { useEffect, useState } from "react";
import Devit from "components/Devit";
import { fetchLatestDevits } from "../../firebase/clients";
import useUser from "hooks/useUser";
import Link from "next/link";
import Create from "components/Icons/Create";
import Home from "components/Icons/Home";
import Search from "components/Icons/Search";
import Head from "next/head";

export default function HomePage() {
  /**
   * @type {[import("types/context/UserContext").DevitI[],()=>void]}
   */
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline);
  }, [user]);

  return (
    <>
      <style jsx>
        {`
          header {
            position: sticky;
            height: 49px;
            top: 0;
            background-color: #fff;
            width: 100%;
            border-bottom: 2px solid gray;
            display: flex;
            align-items: center;
            z-index: 50;
          }

          header > strong {
            margin: 0 0 0 1rem;
          }

          nav {
            height: 49px;
            position: sticky;
            background-color: #fff;
            width: 100%;
            border-top: 2px solid gray;
            bottom: 0;
            z-index: 50;
            display: flex;
            align-items: center;
            justify-content: space-around;
          }

          nav > a {
            transition: background 0.25s ease;
            padding: 10px;
          }

          nav > a:hover {
            background: radial-gradient(#0099ff22 15%, transparent 16%);
            background-size: 180px 180px;
            background-position: center;
          }

          section {
            padding: 10px 0;
            display: block;
            background-color: #fff;
            flex: 1;
            min-height: 100%;
          }

          article {
            padding: 10px 15px;
            display: flex;
          }
        `}
      </style>
      <>
        <Head>
          <title>Inicio / Devter</title>
        </Head>
        <header>
          <strong>Inicio</strong>
        </header>

        <section>
          {timeline.map((devit) => (
            <Devit
              key={window.crypto.randomUUID()}
              avatar={devit.avatar}
              id={devit.id}
              message={devit.content}
              username={devit.email}
              createdAt={devit.normalizedDate}
              img={devit.img}
            />
          ))}
        </section>

        <nav>
          <Link href="/compose/tweet">
            <a>
              <Create stroke="#09f" width={32} height={32} />
            </a>
          </Link>

          <Link href="/compose/tweet">
            <a>
              <Home stroke="#09f" width={32} height={32} />
            </a>
          </Link>

          <Link href="/compose/tweet">
            <a>
              <Search stroke="#09f" width={32} height={32} />
            </a>
          </Link>
        </nav>
      </>
    </>
  );
}
