const SATONTABLE = 'SATONTABLE'
const ADDEDBET = 'ADDEDBET'
const DEALTCARDS = 'DEALTCARDS'
const LATEJOINTABLE = ' LATEJOINTABLE'
const CURRENTPLAYERINDEX = 'CURRENTPLAYERINDEX'
const REMOVEPLAYER = 'REMOVEPLAYER'

export const removePlayer = index => ({
  type: REMOVEPLAYER,
  index
})

export const dealtCards = cards => ({
  type: DEALTCARDS,
  cards
})
export const satOnTable = tableInfo => ({
  type: SATONTABLE,
  tableInfo
})

export const addedBet = betAmount => ({
  type: ADDEDBET,
  betAmount
})

export const lateJoinTable = current => ({
  type: LATEJOINTABLE,
  current
})

export const currentPlayerIndex = index => ({
  type: CURRENTPLAYERINDEX,
  index
})

export const indexReducer = (defaultIndex = 0, action) => {
  switch (action.type) {
    case CURRENTPLAYERINDEX:
      return action.index
    default:
      return defaultIndex
  }
}

export default function table(
  defaultTable = [
    { taken: false },
    { taken: false },
    { taken: false },
    { taken: false },
    { taken: false },
    { taken: false },
    { taken: false }
  ],
  action
) {
  switch (action.type) {
    case REMOVEPLAYER:
      const cloneTableRemove = [...defaultTable]
      cloneTableRemove[action.index] = { taken: false }
      return cloneTableRemove
    case LATEJOINTABLE:
      return action.current
    case DEALTCARDS:
      const cloneTableDealt = [...defaultTable]
      cloneTableDealt[action.cards.order].player = action.cards.player
      return cloneTableDealt
    case SATONTABLE:
      const cloneTable = [...defaultTable]
      cloneTable[action.tableInfo.ind].taken = true
      cloneTable[action.tableInfo.ind].player = action.tableInfo.player
      return cloneTable
    case ADDEDBET:
      const cloneTableBet = [...defaultTable]
      cloneTableBet[action.betAmount.ind].player = action.betAmount.player
      return cloneTableBet
    default:
      return defaultTable
  }
}
