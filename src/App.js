import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import Encuesta from './routes/Encuesta';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/encuesta' element={<Encuesta />}/>
      </Routes>
    </div>
  );
}

export default App;
