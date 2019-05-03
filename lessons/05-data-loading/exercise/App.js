import React, { useState, useEffect } from 'react'

import { onAuthStateChanged } from 'app/utils'
import LoggedIn from 'app/LoggedIn'
import LoggedOut from 'app/LoggedOut'

// Cleaned up into custom Hook in post-discussion
function useAuth() {
  const [auth, setAuth] = useState(null)
  const [authAttempted, setAuthAttempted] = useState(false)

  seEffect(() => {
      return onAuthStateChanged(auth => {
        setAuthAttempted(true)
        setAuth(auth)
      })
    }, [])

    return { auth, authAttepmted }
}

export default function App() {
  // Cleaned up into custom Hook in post-discussion
  const { auth, authAttempted } = useAuth()
  
  // My first runthrough:
  // const [authAttempted, setAuthAttempted] = useState(false)
  // const [auth, setAuth] = useState(null)
  //
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth => {
  //     setAuthAttempted(true)
  //     setAuth(auth)
  //     console.log(auth, authAttempted);
  //   }, [])

  //   return unsubscribe
  // }, [auth, authAttempted])

  // From post-exercise discussion
  // const [authAttempted, setAuthAttempted] = useState(false)
  // const [auth, setAuth] = useState(null)
  //
  // useEffect(() => {
  //   return onAuthStateChanged(auth => {
  //     setAuthAttempted(true)
  //     setAuth(auth)
  //   })
  // }, [])


  if (!authAttempted) {
    return <p>Authenticating...</p>
  }


  return (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  )
}
