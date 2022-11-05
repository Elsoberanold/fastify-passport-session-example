import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const API_URL = `http://localhost:${4000}`

function App() {

  const [userObject, setUserObject] = useState<any>();

  useEffect(() => {
    axios.get('/getuser', {
      baseURL: API_URL,
      withCredentials: true
    }).then(res => {
      if (res.data) {
        setUserObject(res.data)
      }
    })
  }, [])

  console.log(userObject)

  if (userObject) {
    return (
    <div className="App">
    <h1>Welcome {userObject.name}!</h1>
    <div className="card">
      <a href={`${API_URL}/logout`} ><div className='btn-login'><p className='btn-label'>LogOut</p></div></a>
    </div>
  </div>)
  }

  return (
    <div className="App">
      <h1>LOGIN</h1>
      <div className="card">
        <a href={`${API_URL}/auth/google`} ><div className='btn-login'><p className='btn-label'>Login with Google</p></div></a>
      </div>
    </div>
  )
}

export default App
