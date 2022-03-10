import React from "react";
import Link from "next/link";
import axios from "axios";

export default function Timeline({ userName }) {
  return (
    <div>
      <h1>Timeline of {userName}</h1>
      <Link href="/">
        <a>Go back</a>
      </Link>
    </div>
  );
}

Timeline.getInitialProps = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/hello`);

    return {
      userName: data.name,
    };
  } catch (error) {
    return {
      userName: "No user",
    };
  }
};
