import { GithubLoginButton } from "react-social-login-buttons";
import { useEffect, useContext } from "react";
import { loginWithGithub } from "../../../firebase/clients";
import { ContextUser } from "../../../pages/index";
import { useRouter } from "next/router";
import Avatar from "../../Avatar/index";
// import { useEffect } from "react";

export default function GithubLogin() {
  const { setUser, user } = useContext(ContextUser);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const user = await loginWithGithub();

      setUser(user);
    } catch (error) {}
  };

  useEffect(() => {
    if (user !== null) {
      router.replace("/home");
    }
  }, [user]);

  return (
    <>
      {user === null ? (
        <GithubLoginButton onClick={handleClick} className="ghButton" />
      ) : (
        <Avatar url={user.urlProfilePic} userName={user.email} />
      )}
    </>
  );
}
