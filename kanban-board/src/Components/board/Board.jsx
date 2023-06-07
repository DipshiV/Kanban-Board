import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from '@mui/icons-material/Delete';
import Editable from "../editable/Editable";
import { useSelector, useDispatch } from "react-redux";
import Card from "../card/Card";
import { DragDropContext } from 'react-beautiful-dnd'
import { updatedTask, deleteTask} from "../../store/listSlice";
import './Board.css'
const Board = () => {
    const dispatch = useDispatch();
    const listItem = useSelector(store => store.listSlice.list)
    const[showDelete,setShowDelete] = useState(false);

    const handleEdit = (id, newText) => {
        console.log('edit', id)
        dispatch(updatedTask({ id, newText }))
    };
    const handleDeleteTask = taskId => {
        dispatch(deleteTask(taskId));
        setShowDelete(false);
        
    };
    return (<DragDropContext>
        {listItem && listItem.map((list) => (<div className="p-3 w-1/3 " key={list.id}>
            <div className="p-3 bg-gray-200  ">
                <div className="mb-3">
                    <input value={list.title} onChange={e => handleEdit(list.id, e.target.value)} />
             <span>
              <button onClick={()=>handleDeleteTask(list.id)}><DeleteIcon/></button>
            
              </span>
     
                </div>
                {list?.children?.length > 0 && list.children.map((children) => <div key={children.id}>
                   <Card key={children.id} cardInfo={children}  List={list} />
                </div>)}

                <div className="mt-4"><Editable type="card" parentId={list.id} /></div>
            </div>
        </div>
        ))}
        <div className="p-3 w-1/3">
            <div className="p-3 bg-gray-200  " >
                <Editable />
            </div>
        </div>
    </DragDropContext>
    );
}
export default Board