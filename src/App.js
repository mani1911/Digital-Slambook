import './App.css';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Register from './components/pages/register';
import Login from './components/pages/login';
import Header from './components/header';
import Home from './components/pages/home';
import Profile from './components/pages/profile';
import ViewProfile from './components/pages/viewprofile';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Header />
        <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path = "/register" element = {<Register/>} />
          <Route path = "/login" element = {<Login/>} />
          <Route path = "/profile" element = {<Profile/>}/>
          <Route path = "/profile/:id" element = {<ViewProfile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
