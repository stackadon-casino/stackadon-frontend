import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUpThunk } from '../reducers/user'

class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
    this.signupHandler = this.signupHandler.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
  }
  signupHandler(event) {
    const userInfo = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      password: event.target.password.value,
      login: event.target.loginName.value
    }
    this.props.signup(userInfo)
    this.setState(() => {
      return {
        redirect: true
      }
    })
  }
  renderRedirect() {
    return <Redirect to="/" />
  }
  render() {
    return (
      <div>
        {this.state.redirect ? this.renderRedirect() : null}
        <form
          onSubmit={event => {
            event.preventDefault()
            this.signupHandler(event)
          }}
        >
          <label>
            First Name:
            <input type="text" name="firstName"></input>
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName"></input>
          </label>
          <label>
            Login:
            <input type="text" name="loginName"></input>
          </label>
          <label>
            Password:
            <input type="password" name="password"></input>
          </label>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signup: userInfo => dispatch(signUpThunk(userInfo))
})

export default connect(null, mapDispatchToProps)(Signup)
