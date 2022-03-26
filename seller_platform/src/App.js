import logo from './logo.svg';
import './App.css';
import SignIn from './pages/signin/signin';
import SignUp from './pages/signup/signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <Router>
      <div className="App">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Navbar/>
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
