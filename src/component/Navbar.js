import { Link } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import logo from '../asset/logo.png'

class Navbar extends React.Component {
  render() {
    const { loggedIn } = this.props
    return (
      <div>
        <nav>
          <ul>
            {loggedIn ? (
              <li>
                <div className="navbar">
                  <div id="chipBar">Chips: {this.props.chips}</div>
                  <div id="optionBar">
                    <div>
                      <Link to="/home">Home</Link>
                    </div>
                    <div>Account</div>
                    <div>Logout</div>
                  </div>
                  <div>
                    <img
                      src={logo}
                      width="50px"
                      height="50px"
                      alt="logo"
                    ></img>
                  </div>
                </div>
              </li>
            ) : (
              <div className="navbar">
                <div id="chipBar">Chips: Please login</div>
                <div id="optionBar">
                  <div>
                    <Link to="/home">Home</Link>
                  </div>
                  <Link to="/login">Login</Link>
                  <div>
                    <Link to="/signup">SignUp</Link>
                  </div>
                </div>
                <div>
                  <img src={logo} width="50px" height="50px" alt="logo"></img>
                </div>
              </div>
            )}
          </ul>
        </nav>
      </div>
    )
  }
}

const mapStateToProp = state => ({
  chips: state.user.chips,
  loggedIn: state.user.status
})
export default connect(mapStateToProp)(Navbar)
