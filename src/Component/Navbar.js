import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Input,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import Modal from "react-modal";
import "../CSS/Navbar.css";
import db, { auth } from "../firebase";
import LinkIcon from "@mui/icons-material/Link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userSlice";
import { Logout, Settings } from "@mui/icons-material";

import { signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { QuestionActions } from "../reducers/questionSlice";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const navigate = useNavigate();
  const questionName = input;

  const questionRef = collection(db, "questions");
  const handleQuestion = async (e) => {
    e.preventDefault();

    setOpenModal(false);

    if (questionName) {
      await addDoc(questionRef, {
        user: user,
        question: input,
        imageUrl: inputUrl,
        timestamp: Date.now(),
      });
    }

    setInput("");
    setInputUrl("");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const questions = useSelector((state) => state.question.allQuestions);

  const handleSearch = (e) => {
    dispatch(QuestionActions.filteredQuestions(questions.filter((q) => q.question.includes(e.target.value))));
  };

  return (
    <div className="uHeader">
      <div className="uHeader_icons">
        <div className="uHeader_icon">
          <HomeIcon />
        </div>

        <div className="uHeader_icon">
          <PeopleAltOutlinedIcon />
        </div>
        <div className="uHeader_icon">
          <NotificationsOutlinedIcon />
        </div>
      </div>
      <div className="uHeader_input">
        <SearchIcon />
        <Input type="text" placeholder="Search" style={{ color: "white" }} onChange={handleSearch} />
      </div>
      <div className="uHeader_Rem">
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disabled={user?.email === "guest"}
          >
            <Avatar sx={{ width: 42, height: 42 }} src={user?.photo} />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(logout());
              signOut(auth);
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        <LanguageIcon />

        <Button
          sx={{
            fontFamily: "Noto Nastaliq Urdu",
            padding: "10px",
            ":disabled": {
              color: "white",
            },
          }}
          onClick={() => setOpenModal(true)}
          disabled={user?.email === "guest"}
        >
          سوال کریں
        </Button>

        {user?.email === "guest" && (
          <Button
            sx={{
              fontFamily: "Noto Nastaliq Urdu",
              padding: "10px",
              ":disabled": {
                color: "white",
              },
            }}
            onClick={() => {
              dispatch(logout());
              navigate("/", { replace: true });
            }}
          >
            لاگ ان کریں
          </Button>
        )}

        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          fullWidth
          sx={{ fontFamily: "Noto Nastaliq Urdu" }}
        >
          <DialogContent>
            <div className="modal_title">
              <h5>سوال شامل کریں</h5>
            </div>
            <div className="modal_info">
              <Avatar
                className="avatar"
                src={
                  user?.photo
                    ? user?.photo
                    : "https://2.bp.blogspot.com/-eOuR8lETJ6c/VEVTG8LelEI/AAAAAAAAG-4/_GCJ9G4d-3k/s1600/butterfly-12.png"
                }
              />
              <p>{user?.email}</p>
              <div className="modal_scope"></div>
            </div>
            <div className="modal_Field">
              <TextField
                sx={{ fontFamily: "Noto Nastaliq Urdu" }}
                variant="standard"
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder=" اپنا سوال 'کیا'، 'کیسے'، 'کیوں' وغیرہ سے شروع کریں۔ "
              />
            </div>
            <div className="modal_fieldLink">
              <LinkIcon />
              <TextField
                sx={{ fontFamily: "Noto Nastaliq Urdu" }}
                variant="standard"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="اختیاری: ایک لنک شامل کریں۔ "
              />
            </div>
          </DialogContent>
          <DialogActions>
            <div>
              <Button
                onClick={() => setOpenModal(false)}
                sx={{ padding: "6px", border: "1px solid  #ccc", fontFamily: "Noto Nastaliq Urdu", marginRight: "8px" }}
              >
                منسوخ کریں
              </Button>
              <Button
                type="sumbit"
                onClick={handleQuestion}
                sx={{
                  fontFamily: "Noto Nastaliq Urdu",
                  backgroundColor: "blue !important",
                  color: "white",
                }}
                disabled={user?.email === "guest"}
              >
                سوال شامل کریں
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Navbar;
