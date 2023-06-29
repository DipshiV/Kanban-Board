import { Provider ,useDispatch } from 'react-redux';
import store from './store';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Page from './Components/Pages/Pages';
import DescriptionBox from './Components/description/DescriptionBox';


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="w-full border p-3 w- 1/3 ">
    <div className=' flex flex-wrap gap-3'>
    <Routes>
    <Route path="/description/:id" element={<DescriptionBox />} />
    <Route path="/" element={<Page />} />
     </Routes>
    </div>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
