import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetChecked = () => setChecked(!checked);

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const[emailNode, passwordNode] = form.elements
    setIsLoading(true);
    login(emailNode.value, passwordNode.value).then((
      setIsLoading(false)
    ))

  }

  return (

    <form onSubmit={handleSubmit}>
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        className="inputField"
        type={checked ? 'text' : 'password'}
        // type="password"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={checked}
            onClick={handleSetChecked}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        <FaSignInAlt />
        <span>{isLoading ? "Loading..." : "Login"}</span>
      </TabsButton>
    </form>
  )
}
