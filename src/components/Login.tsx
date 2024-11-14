import React, { useState } from "react"
import { type UserInfo } from "firebase/auth"
import { handleLogin, handleLogout } from "../firebase"
import Button from "./Button"

interface LoginProps {
  currentUser: UserInfo | null | undefined
  setUserFunction: (loggedUser: UserInfo | null | undefined) => void
}

const Login: React.FC<LoginProps> = ({ currentUser, setUserFunction }) => {
  const [message, setMessage] = useState("")

  const login = async () => {
    await handleLogin().then((loggedUser) => {
      if (!loggedUser) setMessage("You must be an admin on this project in order to see this data.")
      setUserFunction(loggedUser)
    })
  }
  const logout = async () => {
    await handleLogout()
    setUserFunction(null)
    setMessage("")
  }
  return (
    <section className="flex flex-col gap-6">
      <div>
        {currentUser ? (
          <Button onClick={() => logout()}>Log Out</Button>
        ) : (
          <Button onClick={() => login()}>Log In</Button>
        )}
      </div>
      {message && <p className="text-primary-300 font-semibold">{message}</p>}
    </section>
  )
}
export default Login
