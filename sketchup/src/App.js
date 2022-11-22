import './App.css';

import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Canvas from './components/canvas/Canvas';
import Chat from './components/chat/Chat';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/canvas' element={<Canvas dim={{height:500,width:800}} drawAllowed={true} />} />
          <Route exact path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
