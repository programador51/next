import React from "react";
import { GithubLoginButton } from "react-social-login-buttons";
import { useContext } from "react";
import { loginWithGithub } from "../../../firebase/clients";
import { ContextUser } from "../../../pages/index";
import Image from "next/image";

export default function GithubLogin() {
  const { setUser, user } = useContext(ContextUser);

  const handleClick = async () => {
    try {
      const user = await loginWithGithub();

      setUser(user);
    } catch (error) {}
  };

  return (
    <>
      {user === null ? (
        <GithubLoginButton onClick={handleClick} className="ghButton" />
      ) : (
        <Image src={user.urlProfilePic} width={200} height={200} />
      )}
    </>
  );
}
