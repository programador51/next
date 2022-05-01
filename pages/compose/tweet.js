import Button from "components/Button";
import useUser from "hooks/useUser";
import { useState, useEffect } from "react";
import { addDevit, uploadImage } from "../../firebase/clients";
import { useRouter } from "next/router";
import ScaleLoader from "react-spinners/ScaleLoader";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { getDownloadURL } from "firebase/storage";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATE = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const user = useUser();

  const [message, setMessage] = useState("");

  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);

  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE);

  /**
   * Upload result of the image
   * @type {[import("firebase/storage").UploadTaskSnapshot,()=>void]}
   */
  const [task, setTask] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (task) {
      if (task.state === "success") {
        getDownloadURL(task.ref).then((downloadUrl) =>
          setImageUrl(downloadUrl)
        );
        toast.success("Archivo cargado", {
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        toast.warning("Hubo un problema al cargar el archivo", {
          autoClose: 2500,
          closeOnClick: true,
        });
      }
    }
  }, [task]);

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
      img: imageUrl,
    });

    if (wasAdded) {
      router.push("/home");
    }

    setStatus(COMPOSE_STATES.SUCCESS);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATE.NONE);
  };

  /**
   * Handle drag a file
   * @param {DragEventHandler<HTMLTextAreaElement>} e - Event drag param
   */
  const handleDrag = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATE.NONE);
    const file = e.dataTransfer.files[0];

    uploadImage(file).then(setTask);
  };

  /**
   * Delete image from the devit
   * @param {MouseEventHandler<HTMLButtonElement>} e - Button event
   */
  const deleteImage = (e) => {
    e.preventDefault();
    setImageUrl(null);
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <>
      <>
        <ToastContainer />
        <form onSubmit={submit}>
          <textarea
            placeholder="¿Que esta pasando?"
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrag}
          ></textarea>
          {/* <Image src={imageUrl} height={300} layout="fill" /> */}
          {imageUrl && (
            <div>
              <button onClick={deleteImage}></button>
              <img src={imageUrl} alt="devter-post-photo" />
            </div>
          )}

          {status === COMPOSE_STATES.LOADING ? (
            <ScaleLoader loading={true} />
          ) : (
            <Button disabled={isButtonDisabled}>Devitear</Button>
          )}
        </form>
      </>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }
        div {
          position: relative;
        }

        div button::after {
          content: "❌";
        }

        div button {
          position: absolute;
          right: 0;
          top: 0;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #e1e1e1ab;
          border: 1px solid #616161;
          cursor: pointer;
          margin: 10px 10px 0 0;
        }

        div img {
          max-height: 200px;
          width: 100%;
          object-fit: contain;
        }

        div {
          display: flex;
          justify-content: center;
          align-items: end;
          background-color: #474747cc;
        }

        textarea {
          width: 100%;
          margin: 0;
          resize: none;
          border: 0;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          border: ${drag === DRAG_IMAGE_STATE.DRAG_OVER
            ? "3px dashed #000"
            : "3px solid transparent"};
        }
      `}</style>
    </>
  );
}
