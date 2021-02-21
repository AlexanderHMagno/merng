import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

//helpers
import MenuNav from './components/navbar';
import { Container } from 'semantic-ui-react'

//pages 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Container>
        <MenuNav/>   
        <Switch>   
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route path="/" component={Home}/>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
