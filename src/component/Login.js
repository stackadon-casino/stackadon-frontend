import React from 'react'
import { connect } from 'react-redux'
import { currentUserThunk } from '../reducers/user'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
      attempted: false
    }
    this.renderRedirect = this.renderRedirect.bind(this)
    this.loginHandler = this.loginHandler.bind(this)
  }
  loginHandler(event) {
    const { getUser } = this.props
    const userInfo = {
      login: event.target.loginName.value,
      password: event.target.password.value
    }
    getUser(userInfo)

    this.setState(() => {
      return {
        attempted: true
      }
    })
  }
  renderRedirect() {
    return <Redirect to="/" />
  }
  render() {
    const { user } = this.props
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault()
            this.loginHandler(event)
          }}
        >
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
        {this.state.attempted ? <div>Wrong Login Or Password</div>: null}
        {user.status ? this.renderRedirect() : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getUser: userInfo => dispatch(currentUserThunk(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
