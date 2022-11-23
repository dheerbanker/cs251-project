import './App.scss';

import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Canvas from './components/canvas/Canvas';
import Chat from './components/chat/Chat';
import Home from './components/home/Home'
import ScoreBoard from './components/scoreboard/ScoreBoard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/canvas' element={<Canvas dim={{height:500,width:800}} drawAllowed={true} />} />
          <Route exact path='/chat' element={<Chat />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/scoreboard' element={<ScoreBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
