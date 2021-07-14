import './App.css';
import Topbar from './components/Topbar/TopBar';
import { DataProvider } from './GlobalState';
import {
  BrowserRouter as Router
} from "react-router-dom";
import Main from './pages/Main'
import '@fontsource/roboto';


function App() {


  return (
    <DataProvider>
      <Router>
        <div className="app">
          <Topbar />
          <div style={{ marginTop: "80px" }}>
            <Main />
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
