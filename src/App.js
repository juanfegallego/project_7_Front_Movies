import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Profile from './containers/Profile/Profile';
import Header from './components/Header/Header';
import Register from './containers/Register/Register';
import MovieInfo from './containers/MovieInfo/MovieInfo';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Header/>

      <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/profile" exact component={Profile}/>
      <Route path="/movieInfo" exact component={MovieInfo}/>


      </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
