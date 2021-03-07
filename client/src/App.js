import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

//helpers
import MenuNav from './components/navbar';
import { Container } from 'semantic-ui-react';
import {AuthProvider} from './context/AuthContext';
import AuthRouter from './security/AuthRouter';

//pages 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import IndividualPost from './pages/IndividualPost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuNav/>   
          <Switch>   
          <AuthRouter exact path="/login" component={Login}/>
          <AuthRouter exact path="/register" component={Register}/>
          <Route exact path="/post/:postId" component={IndividualPost}/>
          <Route path="/" component={Home}/>
          </Switch>
        </Container>
      </Router>
      </AuthProvider>
  );
}

export default App;
