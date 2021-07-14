import './App.css';
import Topbar from './components/Topbar/TopBar';
import { DataProvider } from './GlobalState';
import {
  BrowserRouter as Router
} from "react-router-dom";
import Main from './pages/Main'


function App() {


  return (
    <DataProvider>
      <Router>
        <div className="app">
          <Topbar />
          <Main />
        </div>
      </Router>
    </DataProvider>
  );
}  

export default App;
