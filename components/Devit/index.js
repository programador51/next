import Avatar from "components/Avatar";
import React from "react";

export default function Devit({ username, avatar, message, id, createdAt }) {
  return (
    <>
      <article key={window.crypto.randomUUID()}>
        <Avatar userName={username} url={avatar} showUserName={false} />

        <div className="devit">
          <strong>{username}</strong>
          <date>{createdAt}</date>
          <p>{message}</p>
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
          }

          date:before {
            content: " - ";
          }
        `}
      </style>
    </>
  );
}
