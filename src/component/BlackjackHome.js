import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import room1 from '../asset/room1.png'
import room2 from '../asset/room2.png'
import room3 from '../asset/room3.png'
import room4 from '../asset/room4.png'
import room5 from '../asset/room5.png'
import room6 from '../asset/room6.png'

let smallArr = [room1, room2, room3]
let bigArr = [room4, room5, room6]

class BlackjackHome extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
      stake: 0
    }
    this.renderRedirect = this.renderRedirect.bind(this)
  }
  renderRedirect(game) {
    return <Redirect to={{ pathname: `/blackjack/${game}` }} />
  }
  render() {
    const smallRoomNumbers = ['1', '2', '3']
    const biggerRoomNumbers = ['4', '5', '6']
    return (
      <div className="blackjackHome">
        <div className="roomNums">
          <div className="stakes">
            <h1 className="colorOfStake">LOW STAKES</h1>
            <div className="roomCol">
              {smallRoomNumbers.map((cur, index) => {
                return (
                  <img
                    className="roomButton"
                    key={cur}
                    src={smallArr[index]}
                    type="button"
                    alt="lower stakes"
                    onClick={() => {
                      this.setState(() => {
                        return {
                          redirect: true,
                          stake: cur
                        }
                      })
                    }}
                  ></img>
                )
              })}
            </div>
          </div>
          <div className="stakes">
            <h1 className="colorOfStake">HIGH STAKES</h1>
            <div className="roomCol">
              {biggerRoomNumbers.map((cur, index) => {
                return (
                  <img
                    className="roomButton"
                    key={bigArr[index]}
                    src={bigArr[index]}
                    type="button"
                    alt="higher stakes"
                    onClick={() => {
                      this.setState(() => {
                        return {
                          redirect: true,
                          stake: cur
                        }
                      })
                    }}
                  ></img>
                )
              })}
            </div>
          </div>
          {this.state.redirect ? this.renderRedirect(this.state.stake) : null}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  table: state.table,
  decks: state.decks,
  dealer: state.dealer,
  trigger: state.trigger
})

export default connect(mapState, null)(BlackjackHome)
