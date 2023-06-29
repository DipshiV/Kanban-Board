import React, { useState,useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Editable from "../editable/Editable";
import { useSelector, useDispatch } from "react-redux";
import Card from "../card/Card";
import { DragDropContext ,Droppable,Draggable} from 'react-beautiful-dnd'
import { updatedTask, deleteTask,moveCard,moveList} from "../../store/listSlice";
import './Board.css'
const Board = () => {
    const dispatch = useDispatch();
    const listItem = useSelector(store => store.listSlice.list)
    
    console.log('listItem',listItem)

    const[showDelete,setShowDelete] = useState(false);
    console.log('listItem Data',listItem)

    useEffect(() => {
        const storedList = localStorage.getItem("kanbanBoard");
  if (storedList) {
    dispatch(updatedTask({ list: JSON.parse(storedList) }));
  }
}, []);

    useEffect(() => {
        localStorage.setItem("kanbanBoard", JSON.stringify(listItem));
      }, [listItem]);
      
    const handleEdit = (id, newText) => {
        console.log('edit', id)
        dispatch(updatedTask({ id, newText }))
    };
    const handleDeleteTask = taskId => {
        dispatch(deleteTask(taskId));
        setShowDelete(false);
        
    };
    const onDragEnd = (result) => {
      const { destination ,source, draggableId,type } = result;
      if(!destination){
        return;
      }
     
      if(type== 'column'){
        dispatch(moveList({ source, destination}));
      } 
       
         else {
          // Different list movement
          dispatch(moveCard({ source, destination, draggableId }));
        
      }
    }
    return (
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable  droppableId='list' direction="horizontal" type="column">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-wrap">
            {listItem &&
              listItem.map((list, index) => (
                <Draggable key={list.id.toString()} draggableId={list.id.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div key={list.id.toString()}>
                        <div className="p-3 w-50 bg-gray-200 m-4">
                          <div className="mb-3">
                            <input
                              className="bg-gray-200"
                              value={list.title}
                              onChange={(e) => handleEdit(list.id, e.target.value)}
                            />
                            <span>
                              <button className="shadow-md rounded-md" onClick={() => handleDeleteTask(list.id)}>
                                <DeleteIcon />
                              </button>
                            </span>
                          </div>

                          <Droppable droppableId={list.id.toString()} type="card" >
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.droppableProps}>
                                {list?.children?.length > 0 &&
                                  list.children.map((children, index) => (
                               
                                          <Card
                                            cardInfo={children}
                                            cardId={children.id}
                                            index={index}
                                            List={list}
                                            key={children.id}
                                          />
                                     
                                  ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                          <div className="mt-4">
                            <Editable type="card" parentId={list.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            <div className="p-3 bg-sky-500 m-4">
              <Editable />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
 


export default Board

