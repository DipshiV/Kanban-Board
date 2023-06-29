import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { CgClose } from "react-icons/cg";
import store from "../../store/index";
import "./DescriptionBox.css";
import { ViewIcon, HamburgerIcon, RepeatClockIcon,} from "@chakra-ui/icons";
import TextEditor from "./TextEditor";
import { editTodo, updateListItem } from "../../store/listSlice";
const DescriptionBox = () => {

  const { cardObj } = useSelector((store) => store.listSlice);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const listItem = useSelector((store) => store.listSlice.list);
  const [descFocus, setDescFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activity, setActivity] = useState("");
  const [ActiFocus, setActiveFocus] = useState(false);
  

  const navigate = () => {
    Navigate("/");
  };

  useEffect(() => {
    setInputValue(cardObj.title);
  }, [cardObj]);

  const handleEdit = () => {
    console.log('cardObj:', cardObj); // Check the value of cardObj
 // console.log('cardObj.activity:', cardObj.activity); 
    const currentDate = new Date().toLocaleString();
  //  const updatedActivity = [...cardObj.activity, `${currentDate}: Card updated by [cardObj.title]`];
    dispatch(editTodo({
      cardObj: cardObj,
      updatedTodo: inputValue,
      activity: '',
    }));
    dispatch(updateListItem({
      itemId: cardObj.id,
      updatedTitle: inputValue,
    }));
    console.log("Redux store state:", store.getState());
  };
  

  return (
    <div className="Desc-page">
      <div className="Desc-container">
        <div className="Task-div">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="btn" onClick={handleEdit}>
           update
          </button>
          <button className="close" onClick={navigate}>
            <CgClose />
          </button>
        </div>
        <div className="Notification">
          <br />
          <p>Notifications</p>
          <button className="Notification-icon">
            <ViewIcon />
          </button>
        </div>
        <div className="Desc-box">
          <div className="Task-div">
            <HamburgerIcon />
            <h3>Description</h3>
          </div>
          <div>
            {descFocus ? (
              <div className="Editor">
                <TextEditor />
                <div className="Editor-button">
                  <button  className="ml-6" onClick={() => setDescFocus(false)}>Save</button>
                  <button  className='mr-2 ml-2'onClick={() => setDescFocus(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Add Description Here..."
                onFocus={() => setDescFocus(true)}
                onBlur={() => setDescFocus(false)}
              />
            )}
          </div>
          <div>
            <div className="Task-div">
              <RepeatClockIcon />
              <h3>Activity</h3>
            </div>
            <div>
               <div className="Editor">
               <div className="Activity-record">
      {cardObj.activity && cardObj.activity.map((record, index) => (
        <p key={index}>{record}</p>
      ))}
    </div>
               
            </div>
               
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;
