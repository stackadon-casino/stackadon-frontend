import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client'
import { store } from '../index'
import { satOnTable, addedBet, dealtCards } from '../reducers/table'
import { deal } from '../reducers/deal'
import { dealDealer } from '../reducers/dealer'
import { updatedDeck } from '../reducers/deck'
import { currentPlayerIndex } from '../reducers/table'

let socket
class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
      selectGames: 'home',
      error: false
    }
    this.blackjack = this.blackjack.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
    this.selectBlackjack = this.selectBlackjack.bind(this)
    this.errorPage = this.errorPage.bind(this)
  }

  componentDidMount() {
    // socket = io('localhost:7070')
    socket = io('https://stackadon-backend.herokuapp.com')
    socket.on('takenSeat', ind => {
      store.dispatch(satOnTable(ind))
    })
    socket.on('addBet', players => {
      store.dispatch(addedBet(players))
    })
    socket.on('addedDeck', decks => {
      store.dispatch(updatedDeck(decks))
    })
    socket.on('dealtCards', cards => {
      store.dispatch(dealtCards(cards))
    })
    socket.on('dealtDealer', cards => {
      store.dispatch(dealDealer(cards))
    })
    socket.on('dealtTrigger', trigger => {
      store.dispatch(deal(trigger))
    })
    socket.on('index', order => {
      store.dispatch(currentPlayerIndex(order))
    })
  }

  blackjack() {
    this.setState({
      redirect: true
    })
  }

  selectBlackjack() {
    this.setState({
      selectGames: 'blackjack'
    })
  }

  errorPage() {
    this.setState({
      error: true
    })
  }

  renderRedirect(game) {
    return <Redirect to={{ pathname: `/${game}` }} />
  }

  render() {
    return (
      <div>
        <div>
          <h1>Home Page</h1>
        </div>
        <div>
          {this.state.selectGames === 'home' ? (
            <div>
              <li>
                <button
                  onClick={() => {
                    this.setState(() => {
                      return { selectGames: 'blackjack' }
                    })
                  }}
                >
                  Blackjack
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    this.setState(() => {
                      return { selectGames: 'texasholdem' }
                    })
                  }}
                >
                  Texas Holdem
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    this.setState(() => {
                      return { selectGames: 'roulette' }
                    })
                  }}
                >
                  Roulette
                </button>
              </li>
            </div>
          ) : null}
          {this.state.selectGames === 'home'
            ? null
            : this.renderRedirect(this.state.selectGames)}
        </div>
      </div>
    )
  }
}

export { socket }

export default connect(null, null)(Home)
