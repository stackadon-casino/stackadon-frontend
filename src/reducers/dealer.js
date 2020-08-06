const DEALDEALER = 'DEALDEALER'
const LATEJOINDEALER = 'LATEJOINDEALER'

export const dealDealer = cards => ({
  type: DEALDEALER,
  cards
})

export const lateJoinDealer = current =>({
  type: LATEJOINDEALER,
  current
})

export default function dealer(cards = { hand: [], total: 0 }, action) {
  switch (action.type) {
    case LATEJOINDEALER:
      return action.current
    case DEALDEALER:
      return action.cards
    default:
      return cards
  }
}
