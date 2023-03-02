import { Avatar } from '@mui/material'
import React, {  useEffect, useState } from 'react';
import '../CSS/Post.css';
import ArrowUpwordOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../reducers/userSlice";
import Modal from "react-modal";
import db  from "../firebase";
import { selectQuestionId, selectQuestionName, setQuestionInfo } from "../reducers/questionSlice";




function Post({ Id, question, imageUrl, timestamp, email, users }) {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  const [openModal, setOpenModal   ] = useState(false);
  const questionId = useSelector(selectQuestionId);
  const questionName = useSelector(selectQuestionName);
  const [answer, setAnswer] = useState('');
  const [getAnswers, setGetAnswers] = useState([]);

  
  useEffect(() => {
    if (questionId) {  
      db.collection("questions")
        .doc(questionId)
        .collection("answer")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setGetAnswers(
            snapshot.docs.map((doc) => (
              { 
                id: doc.id, 
                answers: doc.data() 
              }))
          )
          )
        
    }
  }, [questionId]);
  
  const handleAnswer =(e) =>{
    e.preventDefault()


    if(questionId){
      db.collection('questions').doc(questionId).collection('answer').add({
        questionId: questionId,
        
        answer: answer,
        user: user,
        
        
      });
    }

      console.log(questionId, questionName);
      
      setAnswer('');
      
      setOpenModal(false);  
    
  }

 


  return (
    <div className='post' onClick={() =>
      dispatch(
        setQuestionInfo({
          questionId: Id,
          questionName: question,
        })
      )
    }>
        <div className='post_info'>
          <Avatar  src= {
             users?.avatarPhotoUrl
             ? "https://2.bp.blogspot.com/-eOuR8lETJ6c/VEVTG8LelEI/AAAAAAAAG-4/_GCJ9G4d-3k/s1600/butterfly-12.png"
             : '/images/avatars/default-avatar.png'
          }
          />
          <h5>{users?.email}</h5>
          <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>        
        </div>
        <div className='post_body'>
          <div className='post_question'>
            <p>{question}</p>
            <button onClick={() => setOpenModal(true)} className='post_btnAnswer'>جواب دیں</button>
            <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: 680,
                height: 550,
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: "1000",
                top: "50%",
                left: "50%",
                marginTop: "-250px",
                marginLeft: "-350px",
              },
            }}
          >
            <div className="modal_question">
              <h1>{question}</h1>
              <p>
              پوچھا 
                <span className="name">
                
                </span>{" "}
                
                <span className="name">
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </span>
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
            <div className="modal_button">
              <button className="cancle" onClick={() => setOpenModal(false)}>
              منسوخ کریں
              </button>
              <button type="sumbit" onClick={handleAnswer} className="add">
              جواب شامل کریں
              </button>
            </div>
          </Modal>
          </div>
          <div className='post_answer'>
         
          {getAnswers.map(({ id, answers }) => (
            <p key={id} style={{ position: "relative", paddingBottom: "5px" }}>
              {Id === answers.questionId ? (
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      position: "absolute",
                      color: "gray",
                      fontSize: "small",
                      display: "flex",
                      right: "0px",
                    }}
                  >
                    <span style={{ color: "#b92b27" }}>
                      {answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.email}{" "}
                      on{" "}
                      {new Date(answers.timestamp?.toDate()).toLocaleString()}
                    </span>
                  </span>
                </span>
              ) : (
                ""
              )}
            </p>
          ))}
          

            
             
           
          </div>
          <img src={imageUrl}
          alt='' />
        </div>
        <div className='post_footer'>
          <div className='post_footerAction'>
            <ArrowUpwordOutlinedIcon />
            <ArrowDownwardOutlinedIcon />
          </div>

          
        </div>
        </div>
  );
}

export default Post