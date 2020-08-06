const UPDATEDECK = 'UPDATEDECK'
const LATEJOINDECK = 'LATEJOINDECK'

export const updatedDeck = decks => ({
  type: UPDATEDECK,
  decks
})

export const lateJoinDeck = current =>({
  type: LATEJOINDECK,
  current
})

export default function deck(decks = [], action) {
  switch (action.type) {
    case LATEJOINDECK:
      return action.current
    case UPDATEDECK:
      return action.decks
    default:
      return decks
  }
}
