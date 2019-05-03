import "./styles.css"
import React, { useState } from "react" // allows us to take something static and make it dynamic
import { FaMinus, FaPlus } from "react-icons/fa"

/**********************************************************/
// We can render with values put into variables:

export default function Minutes() {
  const minutes = 5
  return (
    <div className="Minutes">
      <div>
        <button type="button" className="icon_button Minutes_button">
          <FaMinus />
        </button>
      </div>
      <div className="Minutes_label" htmlFor="minutes">
        {minutes} Minutes
      </div>
      <div>
        <button type="button" className="icon_button Minutes_button">
          <FaPlus />
        </button>
      </div>
    </div>
  )
}

// /**********************************************************/
// We can make that value stateful by introducing useState. When we click the
// buttons react calls `Minutes()` again, compares the element we returned last
// time with the element we've returned this time. React is tracking the old
// and new elements for us, as well as the current state. When it finds a
// difference between the old and new element, it updates the DOM with the
// minimal set of changes required and leaves the rest alone. We can watch it
// in the browser dev tools.

// export default function Minutes() {
//   const [minutes, setMinutes] = useState(5) // deconstructed

//   const handleAdd = () => setMinutes(minutes + 1)
//   const handleSubtract = () => setMinutes(minutes - 1)

//   return (
//     <div className="Minutes">
//       <div>
//         <button
//           onClick={handleSubtract}
//           type="button" className="icon_button Minutes_button">
//           <FaMinus />
//         </button>
//       </div>
//       <div className="Minutes_label" htmlFor="minutes">
//         {minutes} Minutes
//       </div>
//       <div>
//         <button
//           onClick={handleAdd}
//           type="button" className="icon_button Minutes_button">
//           <FaPlus />
//         </button>
//       </div>
//     </div>
//   )
// }

// React diffs through the object to see what changed to know what update to render on the page
// Old function + new function = diif to render

/**********************************************************/
// We get to decide when to change state and when not to,
// maybe we only want values 1 through 9.

// export default function Minutes() {
//   const [minutes, setMinutes] = useState(5)

//   const handleAdd = () =>{
//     if (minutes < 9) {
//       setMinutes(minutes + 1)
//     }
//   }

//   const handleSubtract = () => {
//     if (minutes > 1) {
//       setMinutes(minutes - 1)
//     }
//   }

//   return (
//     <div className="Minutes">
//       <div>
//         <button
//           onClick={handleSubtract}
//           type="button" className="icon_button Minutes_button">
//           <FaMinus />
//         </button>
//       </div>
//       <div className="Minutes_label" htmlFor="minutes">
//         {minutes} Minutes
//       </div>
//       <div>
//         <button
//           onClick={handleAdd}
//           type="button" className="icon_button Minutes_button">
//           <FaPlus />
//         </button>
//       </div>
//     </div>
//   )
// }

/**********************************************************/
// We can add multiple states, like an error state when they try to use an
// invalid value. You can use && like an "if" inside of JSX

// If you think about state first, everything in React gets a lot easier

// export default function Minutes() {
//   const [minutes, setMinutes] = useState(5)
//   const [error, setError] = useState(null)

//   const handleAdd = () => {
//     if (minutes < 9) {
//       setMinutes(minutes + 1)
//       setError(null) // If they have a valid number, clear out the error
//     } else {
//       setError("Less than 10 please.")
//     }
//   }

//   const handleSubtract = () => {
//     if (minutes > 1) {
//       setMinutes(minutes - 1)
//       setError(null) // If they have a valid number, clear out the error
//     } else {
//       setError("Greater than 0 please")
//     }
//   }

//   return (
//     <div>
//       <div className="Minutes">
//         <div>
//           <button
//             onClick={handleSubtract}
//             type="button"
//             className="icon_button Minutes_button"
//           >
//             <FaMinus />
//           </button>
//         </div>
//         <div className="Minutes_label" htmlFor="minutes">
//           {minutes} Minutes
//         </div>
//         <div>
//           <button
//             onClick={handleAdd}
//             type="button"
//             className="icon_button Minutes_button"
//           >
//             <FaPlus />
//           </button>
//         </div>
//       </div>
//       <div style={{ textAlign: 'center' }}>
//         {error && (
//           <p>
//             {error}{" "}
//             <span role="img" aria-label="yikes">
//               😬
//             </span>
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

/**********************************************************/
// Multiple elements can change the same state, here we can close
// the error message by clicking a button inside it.

// export default function Minutes() {
//   const [minutes, setMinutes] = useState(5)
//   const [error, setError] = useState(null)

//   const handleAdd = () => {
//     if (minutes < 9) {
//       setMinutes(minutes + 1)
//       setError(null)
//     } else {
//       setError("Less than 10 please.")
//     }
//   }

//   const handleSubtract = () => {
//     if (minutes > 1) {
//       setMinutes(minutes - 1)
//       setError(null)
//     } else {
//       setError("Greater than 0 please")
//     }
//   }

//   return (
//     <div>
//       <div className="Minutes">
//         <div>
//           <button
//             onClick={handleSubtract}
//             type="button"
//             className="icon_button Minutes_button"
//           >
//             <FaMinus />
//           </button>
//         </div>
//         <div className="Minutes_label" htmlFor="minutes">
//           {minutes} Minutes
//         </div>
//         <div>
//           <button
//             onClick={handleAdd}
//             type="button"
//             className="icon_button Minutes_button"
//           >
//             <FaPlus />
//           </button>
//         </div>
//       </div>
//       <div style={{ textAlign: 'center' }}>
//         {error && (
//           <p>
//             {error}{" "}
//             <span role="img" aria-label="eep!">
//               😬
//             </span><br/>
//             <button onClick={() => setError(null)}>dismiss</button>
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

// Any time anything happens, setState. That's the trick of React.
// Create the state, hand it off to the React element, and React will syncronise it with the DOM for you
// Wait for something to happen, set state.
