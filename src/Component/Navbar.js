import React, {  useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import { Avatar, Button, Input } from '@mui/material';
import Modal from "react-modal";
import '../CSS/Navbar.css';
import  db from "../firebase";
import LinkIcon from "@mui/icons-material/Link";
import { useSelector } from 'react-redux';
import { logout, selectUser } from '../reducers/userSlice';
import firebase from "firebase";


Modal.setAppElement("#root");




function Navbar(users) {
  const user = useSelector(selectUser);
  



  const [openModal, setOpenModal] = useState (false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const questionName = input;

  

  const handleQuestion = (e) => {
    e.preventDefault();
   
    setOpenModal(false);

    if (questionName) {
      db.collection("questions").add({
        user: user,
        question: input,
        imageUrl: inputUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    
      

    setInput("");
    setInputUrl("");
  };

  return (
    <div className='uHeader'>
        <div className='uHeader_logo'>
            <img src='https://e7.pngegg.com/pngimages/779/586/png-clipart-letter-case-u-alphabet-word-us-letter-size-english-rectangle-thumbnail.png'
            alt=''
            />
        </div>
        <div className='uHeader_icons'>
            <div className='uHeader_icon'>
                <HomeIcon />

            </div>
            
            
            <div className='uHeader_icon'>
            <PeopleAltOutlinedIcon />
            </div>
            <div className='uHeader_icon'>
            <NotificationsOutlinedIcon />
                
            </div>
        </div>
        <div className='uHeader_input'>
            <SearchIcon />
                <Input type='text' placeholder='Search'/>
            </div>
            <div className='uHeader_Rem'>
                <div className='uHeader_avatar'>
                    <Avatar onClick={() => logout()} 
                    className="Avatar"
                    src={
                      '/images/avatars/default-avatar.png'
                    }
                    />
                </div>
                <LanguageIcon />


                <Button onClick={() => setOpenModal(true)}>سوال کریں</Button>
                

                <Modal
                isOpen = {openModal}
                onRequestClose = {() => setOpenModal(false)}
                shouldCloseOnOverlayClick={false}
                style={{
                    overlay: {
                      width: 700,
                      height: 600,
                      backgroundColor: "rgba(0,0,0,0.8)",
                      zIndex: "1000",
                      top: "50%",
                      left: "50%",
                      marginTop: "-300px",
                      marginLeft: "-350px",
                    },
                  }}

                >
                    <div className='modal_title'>
                        <h5>سوال شامل کریں</h5>
                        
                        </div>
                        <div className="modal_info">
                        
            <Avatar
              className="avatar"
              src= {
                users?.photo
                  ? users?.photo
                  :"https://2.bp.blogspot.com/-eOuR8lETJ6c/VEVTG8LelEI/AAAAAAAAG-4/_GCJ9G4d-3k/s1600/butterfly-12.png"
              }
              />
              <p>{users?.email}</p>
              <div className="modal_scope">
              
              </div>
                    </div>
                    <div className='modal_Field'>
                        <Input
                        required
                        value={input}
                        onChange= {(e) => setInput(e.target.value)}
                        type='text'
                        placeholder= " اپنا سوال 'کیا'، 'کیسے'، 'کیوں' وغیرہ سے شروع کریں۔ "
                        />
                        </div>
                        <div className='modal_fieldLink'>
                        <LinkIcon />
                        <Input
                        value={inputUrl}
                        onChange= {(e) => setInputUrl(e.target.value)}
                        type='text'
                        placeholder= "اختیاری: ایک لنک شامل کریں۔ "
                        ></Input>
                        </div>
                        <div className="modal_buttons">
                        <button onClick={() => setOpenModal(false)}>
                        منسوخ کریں
            </button>
            <button type="sumbit" onClick={handleQuestion} className="add">
          سوال شامل کریں
            </button>
            </div>

                    
                </Modal>

            </div>
        
        </div>
  );
}

export default Navbar;