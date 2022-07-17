import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Art from './components/Art/Art';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/art' element={<Art></Art>}></Route>
      </Routes>
    </div>
  );
}

export default App;
