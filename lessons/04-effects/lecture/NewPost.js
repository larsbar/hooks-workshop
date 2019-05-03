import React, { useState, useRef, useEffect } from 'react'
// useRef - get a "ref"erence to an object accross renders
// useEffect - effect is like a side-effect on the DOM (other things its doing when it renders)
//    - fetch some data
//    - scroll the page
//    - save something to local storage
//    - side effects of the state updating
// Can't use Hooks inside a class component, only functional componenets and custom Hooks
// Use the React debugger extension for Chrome to manually tweak props and such
// useEffct has a second array that tells the effect what to listen to for updates instead of running on every render
//    - IE if prop (date) changes instead of state we're wanting (message), we don't need to re-run the side effect because it hasn't changed
// Effects can be bundled into a function so it can be reused multiple times, kind of like a custom Hook
//    - Custom Hooks must start with 'use' keyword or React gets mad at you
import { FaDumbbell } from 'react-icons/fa'

import { useAppState } from 'app/app-state'
import Avatar from 'app/Avatar'
import Minutes from 'app/Minutes'
import RecentPostsDropdown from 'app/RecentPostsDropdown'

const errorClass = 'NewPost_error'
const MAX_MESSAGE_LENGTH = 200

/******************************************************************************/
// Consider the message length counter. Every time we type, we set state, and
// then react updates the DOM for us.

export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) { // whole function is kind of like your renderer
  const [{ auth }] = useAppState()
  const [message, setMessage] = useState('Ran around the lake.')
  const messageTooLong = message.length > MAX_MESSAGE_LENGTH
  const messageLengthRef = useRef()

  function handleMessageChange(event) {
    setMessage(event.target.value)
  }

  useEffect(() => {
    console.log("update the title")
    document.title = "New Post" + (mesage ? `: ${message}` : '')
  }, [message]) // basically a data dependency for the Hook
  // empty array means it only runs on the initial render, since nothing in the array ever changes

  return (
    <div className={'NewPost' + (messageTooLong ? ` ${errorClass}` : '')}>
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form className="NewPost_form">
        <textarea
          className="NewPost_input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleMessageChange}
        />
        <div className="NewPost_char_count">
          <span ref={messageLengthRef}></span>/{MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown
          uid={auth.uid}
          onSelect={message => {
            setMessage(message)
          }}
        />
        <div className="NewPost_buttons">
          <Minutes date={date} />
          <div>
            <button type="submit" className="icon_button cta">
              <FaDumbbell /> <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

/******************************************************************************/
// What if we wanted to be weird and *we* wanted to update the DOM manually? We
// can do it in the onChange handler I guess?
//
// How do we even get access to the real DOM elements? useRef. React generally
// manages these instances for us, but if we to reference one, it will give it
// to us.

// export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
//   const [{ auth }] = useAppState()
//   const [message, setMessage] = useState("Ran around the lake.")
//   const messageTooLong = message.length > MAX_MESSAGE_LENGTH
//   const messageLengthRef = useRef()

//   function handleMessageChange(event) {
//     setMessage(event.target.value)

//     // manually update the DOM...
//     const node = messageLengthRef.current
//     node.textContent = event.target.value.length
//   }

//   return (
//     <div className={"NewPost" + (messageTooLong ? ` ${errorClass}` : "")}>
//       {showAvatar && <Avatar uid={auth.uid} size={70} />}
//       <form className="NewPost_form">
//         <textarea
//           className="NewPost_input"
//           placeholder="Tell us about your workout!"
//           value={message}
//           onChange={handleMessageChange}
//         />
//         <div className="NewPost_char_count">
//           <span ref={messageLengthRef} />/{MAX_MESSAGE_LENGTH}
//         </div>
//         <RecentPostsDropdown
//           uid={auth.uid}
//           onSelect={message => {
//             setMessage(message)
//           }}
//         />
//         <div className="NewPost_buttons">
//           <Minutes date={date} />
//           <div>
//             <button type="submit" className="icon_button cta">
//               <FaDumbbell /> <span>Post</span>
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

/******************************************************************************/
// We have a couple of new problems here:
// - our initial value is just empty
// - if we insert a recent post's message it doesn't update
//
// We need a way to synchronize this with our *state* rather than *events*.
//
// Events make us think about time, which is hard. State is a snapshot, making
// everything easier to keep track of.
//
// Enter: useEffect.
//
// Again, this is weird what we're doing, but we want to explain useEffect in a
// way that helps us understand the entire model of React, not just useEffect.
//
// When react renders, it looks at the output of your element and can do a diff
// on the values to decide which of its own side-effects (updating the DOM) it
// needs to perform.
//
// Because React doesn't know the API you're trying to synchronize to, it can't
// do a diff all on its own like it can with elements, we have to give it a
// hint.
//
// The second argument to useEffect allows us to plug our effect into React's
// synchronization of state to the user interface--extending it beyond just DOM
// elements.
//
// React will hang on to our old array values and diff them against a our new
// values to decide if it should perform the side-effect or not. This should
// sound familiar to how it diffs your DOM elements.

// export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
//   const [{ auth }] = useAppState()
//   const [message, setMessage] = useState("Ran around the lake.")
//   const messageTooLong = message.length > MAX_MESSAGE_LENGTH
//   const messageLengthRef = useRef()

//   function handleMessageChange(event) {
//     setMessage(event.target.value)
//   }

//   useEffect(() => {
//     // manually update the DOM...
//     const node = messageLengthRef.current
//     node.textContent = message.length
//   }, [message])

//   return (
//     <div className={"NewPost" + (messageTooLong ? ` ${errorClass}` : "")}>
//       {showAvatar && <Avatar uid={auth.uid} size={70} />}
//       <form className="NewPost_form">
//         <textarea
//           className="NewPost_input"
//           placeholder="Tell us about your workout!"
//           value={message}
//           onChange={handleMessageChange}
//         />
//         <div className="NewPost_char_count">
//           <span ref={messageLengthRef} />/{MAX_MESSAGE_LENGTH}
//         </div>
//         <RecentPostsDropdown
//           uid={auth.uid}
//           onSelect={message => {
//             setMessage(message)
//           }}
//         />
//         <div className="NewPost_buttons">
//           <Minutes date={date} />
//           <div>
//             <button type="submit" className="icon_button cta">
//               <FaDumbbell /> <span>Post</span>
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

/******************************************************************************/
// A more real-world example is updating the document title. We can easily keep
// the title in sync with our UI.

// export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
//   const [{ auth }] = useAppState()
//   const [message, setMessage] = useState("Ran around the lake.")
//   const messageTooLong = message.length > MAX_MESSAGE_LENGTH

//   function handleMessageChange(event) {
//     setMessage(event.target.value)
//   }

//   useEffect(() => {
//     // manually update the document's title
//     document.title = "New Post" + (message.length ? `: ${message}` : "")
//   }, [message])

//   return (
//     <div className={"NewPost" + (messageTooLong ? ` ${errorClass}` : "")}>
//       {showAvatar && <Avatar uid={auth.uid} size={70} />}
//       <form className="NewPost_form">
//         <textarea
//           className="NewPost_input"
//           placeholder="Tell us about your workout!"
//           value={message}
//           onChange={handleMessageChange}
//         />
//         <div className="NewPost_char_count">
//           <span>{message.length}</span>/{MAX_MESSAGE_LENGTH}
//         </div>
//         <RecentPostsDropdown
//           uid={auth.uid}
//           onSelect={message => {
//             setMessage(message)
//           }}
//         />
//         <div className="NewPost_buttons">
//           <Minutes date={date} />
//           <div>
//             <button type="submit" className="icon_button cta">
//               <FaDumbbell /> <span>Post</span>
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

/******************************************************************************/
// And don't forget, since hooks are just functions, composing them is just like
// composing and/or refactoring any other function!
//
// We'll explore this more later.

// function useTitle(title) {
//   useEffect(() => {
//     document.title = title
//   }, [title])
// }
