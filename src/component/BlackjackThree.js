import React from 'react'
import { connect } from 'react-redux'
import MyGamepad from './MyGamepad'
import { socket } from './Home'
import plus from '../asset/plus.png'
import diamond from '../asset/diamond.png'
import heart from '../asset/heart.png'
import spade from '../asset/spade.png'
import club from '../asset/club.png'
import { store } from '../index'
import { lateJoinDeal } from '../reducers/deal'
import { lateJoinDealer } from '../reducers/dealer'
import { lateJoinTable, removePlayer } from '../reducers/table'
import { userChipsThunk } from '../reducers/user'
import dealerImg from '../asset/dealerImg.png'
import one from '../asset/one.png'
import five from '../asset/five.png'
import ten from '../asset/ten.png'

let suit = { club, spade, diamond, heart }

class Blackjack extends React.Component {
  constructor() {
    super()
    this.state = {
      time: 10
    }
  }
  componentDidMount() {
    const { firstName, id } = this.props.user
    const { updateChips, clearPlayer } = this.props
    socket.on('updateChips', () => {
      updateChips(id)
    })
    socket.emit('joinRoom', { roomNum: 3, firstName, id })
    socket.on('standing', roomNum => {
      socket.emit('createOrder', roomNum)
    })

    socket.on('updateUser', currentGame => {
      store.dispatch(lateJoinDeal(currentGame.trigger))
      store.dispatch(lateJoinDealer(currentGame.dealer))
      store.dispatch(lateJoinTable(currentGame.table))
    })

    socket.on('removedPlayer', index => {
      clearPlayer(index)
    })

    socket.emit('lateJoin', 3)

    socket.on('autoRemove', removedPlayers => {
      for (let x = 0; x < removedPlayers.length; x += 1) {
        socket.emit('clearSeat', removedPlayers[x])
      }
    })
    socket.on('timedOut', roomNum => {
      socket.emit('stand', { roomNum, autoStand: true })
    })
    socket.on('hitStand', ({ roomNum, socketId }) => {
      socket.emit('stand', { roomNum, socketId })
    })
    socket.on('startTimer', newTime => {
      this.setState(() => {
        return {
          time: newTime
        }
      })
    })
  }

  render() {
    const {
      table,
      decks,
      dealer,
      trigger,
      user,
      state,
      currentIndex
    } = this.props
    const { id } = socket

    return (
      <div className="blackjack">
        <div>
          <h1>{this.state.time}</h1>
        </div>
        <div className="columns" id="header">
          <h1>Blackjack</h1>
        </div>
        <div className="columns" id="header">
          <div className="allDealer">
            <div>
              <img src={dealerImg} alt="dealer"></img>
            </div>
            <div>
              {dealer.hand.map((cur, index) => {
                return (
                  <section className="height-100vh center-aligned">
                    <img
                      className="cards"
                      src={suit[cur.suit]}
                      alt="suits"
                      style={{ width: '30px', height: '40px' }}
                    ></img>
                    <div className={`text${cur.color}`}>{cur.id}</div>
                  </section>
                )
              })}
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="seats">
            {table.map((cur, index) => {
              return (
                <div key={index}>
                  <div>
                    {cur.taken === false ? (
                      <img
                        src={plus}
                        height="50px"
                        width="50px"
                        alt="sit here"
                        onClick={() =>
                          socket.emit('takeSeat', { ind: index, roomNum: 3 })
                        }
                      />
                    ) : cur.player.hand[index].cards.length === 0 ? (
                      <div className="bet">
                        <div className="betAmount">
                          <h2>{cur.player.hand[index].bet}</h2>
                        </div>
                        <div className="chipRow">
                          <img
                            src={one}
                            alt="one"
                            type="button"
                            onClick={() =>
                              socket.emit('bet', { bet: 1, index, roomNum: 3 })
                            }
                            className="chips"
                          ></img>
                          <img
                            src={five}
                            type="button"
                            alt="five"
                            onClick={() =>
                              socket.emit('bet', { bet: 5, index, roomNum: 3 })
                            }
                            className="chips"
                          ></img>
                          <img
                            src={ten}
                            type="button"
                            alt="ten"
                            onClick={() =>
                              socket.emit('bet', { bet: 10, index, roomNum: 3 })
                            }
                            className="chips"
                          ></img>
                        </div>
                        <button
                          onClick={() => {
                            socket.emit('clearSeat', {
                              index,
                              roomNum: 3,
                              socketId: id
                            })
                          }}
                        >
                          Clear
                        </button>
                        <div className="name">{cur.player.name}</div>
                      </div>
                    ) : (
                      <div className="bet">
                        <div className="betAmount">
                          <h2>{cur.player.hand[index].bet}</h2>
                        </div>
                        <div>
                          {cur.player.hand[index].cards.map(card => {
                            return (
                              <section className="height-100vh center-aligned">
                                <img
                                  className="cards"
                                  src={suit[card.suit]}
                                  alt= "card suit"
                                  style={{ width: '30px', height: '40px' }}
                                ></img>
                                <div className={`text${card.color}`}>
                                  {card.id}
                                </div>
                              </section>
                            )
                          })}
                        </div>
                        {currentIndex === index ? (
                          <div className="name" id="currentPlayer">
                            {cur.player.name}
                          </div>
                        ) : (
                          <div className="name">{cur.player.name}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="columns" id="controller">
          <div className="buttons">
            {trigger ? (
              <div>
                <button>Deal</button>
                <button>Add Deck</button>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    socket.emit('deal', 3)
                    socket.emit('deal', 3)
                    socket.emit('dealTrigger', { trigger: true, roomNum: 3 })
                    socket.emit('createOrder', { roomNum: 3, socketId: id })
                  }}
                >
                  Deal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    socket.emit('addDeck', 3)
                  }}
                >
                  Add Deck
                </button>
              </div>
            )}
          </div>
          <div className="buttons">
            <MyGamepad user={user} socket={socket} roomNum={3}></MyGamepad>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  table: state.table,
  decks: state.decks,
  dealer: state.dealer,
  trigger: state.trigger,
  user: state.user,
  currentIndex: state.indexReducer
})

const mapDispatchToProps = dispatch => ({
  updateChips: userId => dispatch(userChipsThunk(userId)),
  clearPlayer: index => dispatch(removePlayer(index))
})
export default connect(mapState, mapDispatchToProps)(Blackjack)
