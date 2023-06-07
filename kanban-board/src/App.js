

import Navbar from './Components/navbar/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import Board from './Components/board/Board';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Card from './Components/card/Card';
import './App.css'



function App() {
  return (
    <Provider store={store}>
    <Navbar/>
    <div className="w-full border p-3 w- 1/3 ">
    <div className=' flex flex-wrap gap-3'>
    <Board/>
    </div>
    </div>
    </Provider>
   
  );
}

export default App;
