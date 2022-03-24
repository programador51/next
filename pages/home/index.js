import React, { useEffect, useState } from "react";
import AppLayout from "components/AppLayout";
import Devit from "components/Devit";
import { fetchLatestDevits } from "../../firebase/clients";
import useUser from "hooks/useUser";

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
          }

          section {
            padding: 10px 0;
            display: block;
            background-color: #fff;
          }

          article {
            padding: 10px 15px;
            display: flex;
          }
        `}
      </style>
      <AppLayout>
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
            />
          ))}
        </section>

        <nav>123</nav>
      </AppLayout>
    </>
  );
}
