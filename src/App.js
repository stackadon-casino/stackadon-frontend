import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Blackjack from './component/Blackjack'
import Home from './component/Home'
import BlackjackHome from './component/BlackjackHome'
import Login from './component/Login'
import Navbar from './component/Navbar'
import Signup from './component/Signup'
import './App.css';
import logo from './logo.svg';

function App() {
  console.log(logo,'this is logo')
  return (
    <Router>
      <div>
        <Navbar></Navbar>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/blackjack/1">
            <Blackjack />
          </Route>
          <Route path="/blackjack">
            <BlackjackHome />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path='/'>
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function Welcome(){
  return(
    <div>Welcome to my Casino</div>
  )
}
