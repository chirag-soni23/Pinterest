import React from 'react'
import { UserData } from '../context/UserContext'

const Home = () => {
  const {logout} = UserData()
  function logoutHandler(){
    logout()
  }
  return (
    <div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Home