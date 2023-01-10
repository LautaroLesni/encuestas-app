import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import Encuesta from './routes/Encuesta';
import Resultados from './routes/Resultados';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/encuesta' element={<Encuesta />}/>
        <Route path='/resultados' element={<Resultados />}/>
      </Routes>
    </div>
  );
}

export default App;
