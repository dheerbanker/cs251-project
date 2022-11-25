import './App.scss';

import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Canvas from './components/canvas/Canvas';
import Chat from './components/chat/Chat';
import Home from './components/home/Home'
import ScoreBoard from './components/scoreboard/ScoreBoard';
import MainGame from './components/game/MainGame';
import FinalScore from './components/final_score/finalScore';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route exact path='/canvas' element={<Canvas dim={{height:500,width:800}} drawAllowed={true} />} /> */}
          <Route exact path='/canvas' element={<Canvas drawAllowed={true} />} />
          <Route exact path='/chat' element={<Chat />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/scoreboard' element={<ScoreBoard />} />
          <Route exact path='/game' element={<MainGame />} />
          <Route exact path='/finalScore' element={<FinalScore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
