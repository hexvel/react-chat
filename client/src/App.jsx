// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/home'
import ChatPage from './components/chat/index'
import socketIO from 'socket.io-client'

const socket = socketIO.connect('http://localhost:5000')

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home socket={socket} />} />
      <Route path='/chat' element={<ChatPage socket={socket} />} />
    </Routes>
  )
}

export default App
