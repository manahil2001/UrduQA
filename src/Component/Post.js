import { Avatar, Button, Dialog, DialogActions, DialogContent, IconButton } from "@mui/material";
import React, { useState } from "react";
import "../CSS/Post.css";
import { useSelector } from "react-redux";
import db from "../firebase";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Answer from "./Answer";

function Post({ Id, question, imageUrl, timestamp, email, whoPosted, likes = 0, dislikes = 0, q }) {
  const user = useSelector((state) => state.user.user);

  const [openModal, setOpenModal] = useState(false);

  const [answer, setAnswer] = useState("");
  const [getAnswers, setGetAnswers] = useState([]);

  const answerRef = collection(db, `questions/${Id}/answer`);

  const handleAnswer = async (e) => {
    e.preventDefault();

    await addDoc(answerRef, { answer, questionId: Id, user: user, timestamp: Date.now() });

    setAnswer("");

    setOpenModal(false);
  };
  console.log(getAnswers);

  const likeHandler = async (e) => {
    e.stopPropagation();

    const question = doc(db, "questions", Id);

    await updateDoc(question, { likes: 1 + likes });
  };

  const dislikeHandler = async (e) => {
    e.stopPropagation();

    const question = doc(db, "questions", Id);

    await updateDoc(question, { dislikes: 1 + dislikes });
  };

  return (
    <div
      className="post"
      onClick={() => {
        const questionsRef = collection(db, `questions/${Id}/answer`);
        const getAnswer = async () => {
          const answerSnap = await getDocs(questionsRef);

          setGetAnswers(answerSnap.docs.map((a) => ({ ...a.data(), id: a.id })));
        };

        getAnswer();
      }}
    >
      <div className="post_info">
        <Avatar src={whoPosted.photo || "/images/avatars/default-avatar.png"} />
        <h5>{whoPosted?.email}</h5>
        <small>{new Date(timestamp).toLocaleString()}</small>
      </div>
      <div className="post_body">
        <div className="post_question">
          <p style={{ fontSize: "19px" }}>{question}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();

              setOpenModal(true);
            }}
            className="post_btnAnswer"
            disabled={user?.email === "guest"}
          >
            جواب دیں
          </button>
          <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
            <DialogContent>
              <div className="modal_question">
                <h1>{question}</h1>
                <p>
                  پوچھا
                  <span className="name"></span>
                  <span className="name">{new Date(timestamp).toLocaleString()}</span>
                </p>
              </div>
              <div className="modal_answer">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter Your Answer"
                  type="text"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <div className="">
                <Button
                  onClick={() => setOpenModal(false)}
                  sx={{
                    padding: "6px",
                    border: "1px solid  #ccc",
                    fontFamily: "Noto Nastaliq Urdu",
                    marginRight: "8px",
                  }}
                >
                  منسوخ کریں
                </Button>

                <Button
                  type="sumbit"
                  onClick={handleAnswer}
                  sx={{
                    fontFamily: "Noto Nastaliq Urdu",
                    backgroundColor: "blue !important",
                    color: "white",
                  }}
                >
                  جواب شامل کریں
                </Button>
              </div>
            </DialogActions>
          </Dialog>
        </div>
        <div className="post_answer">
          {getAnswers.length > 0 && <h3>Answers:</h3>}
          {getAnswers.map((a) => (
            <Answer a={a} key={a.id} />
          ))}
        </div>
        <img src={imageUrl} alt="" />
      </div>
      <div className="post_footer">
        <IconButton onClick={likeHandler} disabled={user?.email === "guest"}>
          <ThumbUp style={{ width: "30px", height: "30px", color: "lightblue" }} />
        </IconButton>
        <span>({likes})</span>
        <IconButton onClick={dislikeHandler} disabled={user?.email === "guest"}>
          <ThumbDown style={{ width: "30px", height: "30px" }} />
        </IconButton>
        <span>({dislikes})</span>
      </div>
    </div>
  );
}

export default Post;
