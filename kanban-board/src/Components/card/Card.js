import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { deleteTodoListItem,editTodo } from "../../store/listSlice";
import { useSelector, useDispatch } from "react-redux";
const Card = ({cardInfo,List}) => {
  const dispatch= useDispatch();
  
  const handleDelete = (todoListId, itemId) => {
    
    dispatch(deleteTodoListItem({ todoListId, itemId }));
  };
  const handleEdit = (id,updatedTodo) => {
    dispatch(editTodo({ id, updatedTodo }));
  };


  return (<div className="bg-white p-2 mt-2 shadow-md rounded-md">
  <input
  type="text"
  value={cardInfo.title}
  onChange={(e)=>handleEdit(cardInfo.id,{...cardInfo,title:e.target.value}) }
/>
<span>
 <button className="mr-9" onClick={(e)=>handleEdit(List.id,{...cardInfo,title:e.target.value})}><EditIcon/></button>
  <button onClick={() => handleDelete(List.id, cardInfo.id)}><DeleteIcon/></button>
  </span>
    </div>
   
   
    
  )
}

export default Card