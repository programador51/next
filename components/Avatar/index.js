import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

export default function Avatar({
  url = "",
  userName = "Loading...",
  showUserName = true,
}) {
  return (
    <div className={styles.avatarContainer}>
      <Image
        src={url}
        width={50}
        height={50}
        title="user_profile_picture"
        alt="user_profile_picture"
        className={styles.avatarPicture}
      />
      {showUserName ? <strong>{userName}</strong> : null}
    </div>
  );
}
