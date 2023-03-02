import { Avatar } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import '../CSS/UrduQABox.css';
import { selectUser } from '../reducers/userSlice';


export default function UrduQABox() {
  const user = useSelector(selectUser);


  return (
    <div className='urduqabox'>
        <div className='urduqabox_info'>
            <Avatar 
            src=
               "https://e7.pngegg.com/pngimages/779/586/png-clipart-letter-case-u-alphabet-word-us-letter-size-english-rectangle-thumbnail.png"
            
            className="urduqabox__infoAvatar"
            />
            <h5>Manahil</h5>
        </div>
        <div className='urduqabox_urdu'>
            <p>آپ کا سوال یا لنک کیا ہے؟</p>
        </div>
    </div>
  );
}

