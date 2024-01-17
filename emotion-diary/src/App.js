import './App.css';
import Diary from "./pages/Diary";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import LinkComponent from "./components/LinkComponent";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <h2>App.js</h2>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/diary/:id" element={<Diary />}/>
                <Route path="/edit" element={<Edit />}/>
                <Route path="/new" element={<New />}/>
            </Routes>
            <LinkComponent />
        </div>
      </BrowserRouter>
  );
}

export default App;
