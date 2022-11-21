import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Canvas from './components/canvas/Canvas';
function App() {
  return (
    <div className="App">
      hello
      <BrowserRouter>
        <Routes>
          <Route exact path='/canvas' element={<Canvas dim={{height:500,width:800}} drawAllowed={false} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
