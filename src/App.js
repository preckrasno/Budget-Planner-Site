import React from "react"
import Signup from "./components/auth/Signup"
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/auth/Login'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/auth/ForgotPassword'
import UpdateProfile from './components/UpdateProfile'

function App() {
  return (
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
  )
}

export default App
