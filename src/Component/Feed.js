import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/Feed.css";
import db from "../firebase";
import { QuestionActions } from "../reducers/questionSlice";
import Post from "./Post";
import UrduQABox from "./UrduQABox";

function Feed() {
  const dispatch = useDispatch();

  const getAllBooks = useCallback(async () => {
    const questionsRef = collection(db, "questions");
    const q = query(questionsRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (questionsSnap) => {
      dispatch(QuestionActions.setQuestions(questionsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
    });
  }, [dispatch]);

  const filtered = useSelector((state) => state.question.filteredQuestions);

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  return (
    <div className="feed">
      <UrduQABox />
      {filtered?.map((p) => (
        <Post
          key={p.id}
          Id={p.id}
          question={p.question}
          imageUrl={p.imageUrl}
          timestamp={p.timestamp}
          whoPosted={p.user}
          likes={p.likes}
          dislikes={p.dislikes}
          q={p}
        />
      ))}
    </div>
  );
}

export default Feed;
