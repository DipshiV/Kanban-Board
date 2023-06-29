import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { deleteTodoListItem,setCardObject } from "../../store/listSlice";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import DescriptionBox from "../description/DescriptionBox";
import { useNavigate } from "react-router";

const Card = ({ cardInfo, List, index,cardId }) => {
  console.log('cardId',cardId)
  console.log('cardInfo',cardInfo);
  console.log('List',List)
  const [showDescription, setShowDescription] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (todoListId, itemId) => {
    dispatch(deleteTodoListItem({ todoListId, itemId }));
  };

  const handleEdit = (cardInfo) => {
    dispatch(setCardObject(cardInfo))
    navigate(`/description/${cardInfo.id}`);
   // setShowDescription(true);
  };

  return (
    <Draggable draggableId={cardId.toString()} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="bg-white p-2 mt-2 shadow-md rounded-md"
      >
    <span>
        {cardInfo.title}
        <button className="shadow-md rounded-md  "
          style={{ marginLeft: "100px" }}
          onClick={() => handleDelete(List.id, cardInfo.id)}
        >
          <DeleteIcon />
        </button>
        <button  className="shadow-md rounded-md  "onClick={() => handleEdit(cardInfo)}>
          <EditIcon />
        </button>
        </span>
      {showDescription && (
        <DescriptionBox cardId={cardInfo.id} />
      )}
    </div>
    )}
    </Draggable>
  );
}

export default Card;
