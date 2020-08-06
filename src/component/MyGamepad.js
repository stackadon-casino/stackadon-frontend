import React from 'react'

const MyGamepad = props => {
  const { user, socket, roomNum } = props
  return (
    <div className="gamePad">
      <button
        onClick={() => {
          socket.emit('hit', { roomNum, socketId: socket.id })
        }}
      >
        Hit
      </button>
      <button
        onClick={() => {
          socket.emit('stand', { roomNum, socketId: socket.id, autoStand: false })
        }}
      >
        Stand
      </button>
      <button
        onClick={() => {
          socket.emit('reset', { roomNum, socketId: socket.id })
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default MyGamepad
