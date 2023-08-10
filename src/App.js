import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Home from './views/layout/Index'
import Login from './views/login/Index'
import {authLogin} from './utils/auth'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
          
            
            {/* <Route path="/" exact render={(props)=>{
              return <Redirect to="/login"></Redirect>
            }}></Route> */}

            <Route path="/index" render={(props)=>{ 
              if(!authLogin()){
                return <Redirect to="/login"></Redirect>
              }
              return <Home {...props}></Home>
            }}></Route>

            <Route path="/login" render={(props)=>{
              if(authLogin()){
                return <Redirect to="/index/home"></Redirect>
              }
              return <Login {...props}></Login>
            }}></Route>

          </Switch>
        </Router>  
      </div>
    )
  }
}
