import Avatar from "components/Avatar";
import useTimeago from "hooks/useTimeago";
import Link from "next/link";
import React from "react";

export default function Devit({
  username,
  avatar,
  message,
  id,
  createdAt,
  img = "",
}) {
  const timeago = useTimeago(createdAt);

  return (
    <>
      <article key={Math.random()}>
        <Avatar userName={username} url={avatar} showUserName={false} />

        <div className="devit">
          <strong>{username}</strong>
          <Link
            href={{
              pathname: "/status/[id]",
              query: {
                id: id,
              },
            }}
          >
            <a>
              <date>{timeago}</date>
            </a>
          </Link>
          <p>{message}</p>
          {img !== "" ? (
            <div className="devit-img">
              <img src={img} />
            </div>
          ) : null}

          {/* <Image height={300} width={300} url/> */}
        </div>
      </article>

      <style jsx>
        {`
          article {
            padding: 10px 15px;
            display: flex;
          }

          p {
            margin: 0;
          }

          .devit {
            margin: 0 0 0 10px;
            width: 100%;
          }

          img {
            max-width: 100%;
            max-height: 200px;
          }

          .devit-img {
            display: flex;
            justify-content: center;
          }

          date:before {
            content: " - ";
          }
        `}
      </style>
    </>
  );
}
