import './App.css';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Header from './components/header';
function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path = "/register" element = {<Register/>} />
          <Route path = "/login" element = {<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
