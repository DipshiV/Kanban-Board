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
      if (type === 'card') {
        dispatch(addCard({   id: Math.random().toString(), currentDate :new Date().toLocaleString(), title: inputVal, parentId: parentId }))
      } else {
        dispatch(
          addTodo({
            id: Math.random().toString(),
            currentDate :new Date().toLocaleString(),
            title: inputVal,
            description: '',
            activity:'',
            

          })
        );
      }
    }
    setIsFormVisible(false);
    setInputVal('')
  };

  return (
    <div >

      <button  className ="m-3 p-1 bg-slate-500 shadow-md rounded-md " onClick={() => setIsFormVisible(true)}> + Add {type== 'card' ? "a card" : "another list"}</button>
      {isFormVisible && <form onSubmit={handleSubmit} className='mt-3'>
        <input className='w-full h-10 p-2 bg-gray-400 text-pink-600 ' value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder={type=='card' ? "Enter Card Name" : "Enter List Name"} />
        <div className='mt-3'>
          <button className="mr-3 mt-1 bg-red-900 px-7 py-2 shadow-md  rounded-md" onClick={() => setIsFormVisible(false)}><CgClose /></button>
          <button className=' px-3 py-1  mt-1 bg-green-900 shadow-md rounded-md' onClick={handleSubmit}>Add <AddIcon /></button>
        </div>
      </form>}
    </div>
  )
}
export default Editable