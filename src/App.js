
import './App.css';
import routes from './routes';
import {withRouter} from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
       {/* {this.props.location.pathname!=='/' && <Nav/>} */}
      { routes }
    </div>
  );
}

export default App;
