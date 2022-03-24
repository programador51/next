import AppLayout from "components/AppLayout";
import Button from "components/Button";
import useUser from "hooks/useUser";
import { useState } from "react";
import { addDevit } from "../../firebase/clients";
import { useRouter } from "next/router";
import ScaleLoader from "react-spinners/ScaleLoader";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

export default function ComposeTweet() {
  const user = useUser();

  const [message, setMessage] = useState("");

  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);

  const router = useRouter();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    const wasAdded = await addDevit({
      avatar: user.urlProfilePic,
      content: message,
      userId: user.id,
      email: user.email,
    });

    if (wasAdded) {
      router.push("/home");
    }

    setStatus(COMPOSE_STATES.SUCCESS);
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <>
      <AppLayout>
        <form onSubmit={submit}>
          <textarea
            placeholder="¿Que esta pasando?"
            onChange={handleChange}
          ></textarea>

          {status === COMPOSE_STATES.LOADING ? (
            <ScaleLoader loading={true} />
          ) : (
            <Button disabled={isButtonDisabled}>Devitear</Button>
          )}
        </form>
      </AppLayout>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        textarea {
          width: 100%;
          margin: 0;
          resize: none;
          border: 0;
          min-height: 200px;
          padding: 15px;
          outline: 0;
        }
      `}</style>
    </>
  );
}
