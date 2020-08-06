const DEAL = 'DEAL'
const LATEJOINDEAL = 'LATEJOINDEAL'

export const deal = trigger => ({
  type: DEAL,
  trigger
})

export const lateJoinDeal = current => ({
  type: LATEJOINDEAL,
  current
})
export default function dealTrigger(trigger = false, action) {
  switch (action.type) {
    case LATEJOINDEAL:
      return action.current
    case DEAL:
      return action.trigger
    default:
      return trigger
  }
}
