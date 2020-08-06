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
import Blackjack2 from './component/BlackjackTwo'
import Blackjack3 from './component/BlackjackThree'
import Blackjack4 from './component/BlackjackFour'
import Blackjack5 from './component/BlackjackFive'
import Blackjack6 from './component/BlackjackSix'

function App() {
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
          <Route path="/blackjack/2">
            <Blackjack2 />
          </Route>
          <Route path="/blackjack/3">
            <Blackjack3 />
          </Route>
          <Route path="/blackjack/4">
            <Blackjack4 />
          </Route>
          <Route path="/blackjack/5">
            <Blackjack5 />
          </Route>
          <Route path="/blackjack/6">
            <Blackjack6 />
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
