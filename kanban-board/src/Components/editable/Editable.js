import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addTodo, addCard } from '../../store/listSlice'

const Editable = ({ type, parentId }) => {
  const [inputVal, setInputVal] = useState("")
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    if (inputVal) {
      if (type) {
        dispatch(addCard({ id: Math.random(), title: inputVal, parentId: parentId }))
      } else {
        dispatch(
          addTodo({
            id: Math.random(),
            title: inputVal,
            description: '',
          })
        );
      }
    }
    setIsFormVisible(false);
    setInputVal('')
  };

  return (
    <div >

      <button onClick={() => setIsFormVisible(true)}> + Add {type ? "a card" : "another list"}</button>
      {isFormVisible && <form onSubmit={handleSubmit} className='mt-3'>
        <input className='w-full h-10 p-2 ' value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder={type ? "Enter Card Name" : "Enter List Name"} />
        <div className='mt-3'>
          <button className="mr-3 " onClick={() => setIsFormVisible(false)}><CgClose /></button>
          <button className=' px-3 py-1 bg-blue-500' onClick={handleSubmit}>Add <AddIcon /></button>
        </div>

      </form>}

    </div>
  )
}
export default Editable