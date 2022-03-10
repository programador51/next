import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>devter</title>
      </Head>

      <main>
        <Link href="https://nextjs.org/learn/basics/assets-metadata-css/third-party-javascript">
          <h1>
            <a>devter</a>
          </h1>
        </Link>

        <nav>
          <Link href="/timeline">
            <a>timeline</a>
          </Link>
        </nav>
      </main>

      <style jsx>{`
        h1 {
          color: red;
        }
      `}</style>
    </div>
  );
}
