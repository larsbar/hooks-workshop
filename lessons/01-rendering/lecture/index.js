import "./styles.css"
import React from "react" // how to build the UI (like the HTML)
import ReactDOM from "react-dom" // actually renders the UI (like the browser that shows it)

/**********************************************************/
// We like React because:
//
// 1. It's declarative
// 2. It's composable

/**********************************************************/
// All React needs to render is a dom element, and a react element

// const reactElement = <div>Heyooooooo</div>
// const domElement = document.getElementById("root")

// // and away we go!
// ReactDOM.render(reactElement, domElement)
// ReactDOM.render(renderThisReactElement, intoThatDomElement)

/**********************************************************/
// This html looking syntax in JavaSCript is called JSX, and it’s special to
// React, but it's not that special. We’ve got a build setup that uses a tool called
// "babel" that converts it to 1-to-1 function calls.
//
// Instead of having babel do it, let's do it ourselves

// const reactElement = React.createElement("div", null, "Ayyyyyy")
// const domElement = document.getElementById("root")

// // and away we go!
// ReactDOM.render(reactElement, domElement)

/**********************************************************/
// The first argument is the type, the second is the attributes, but we call
// them `props` in React (we’ll get back to that) and the rest of the arguments
// are the children

// const reactElement = React.createElement(
//   "button",  // what it is
//   { className: "icon_button cta" }, // html props 
//   "+" // children
// )

// createElement is public API, so you can use it anywhere isntead of JSX

// const domElement = document.getElementById("root")
// ReactDOM.render(reactElement, domElement)

/**********************************************************/
// Children can be more than text, just like in HTML, you can have more than
// text as your children, and you can have multiple children.

// const reactElement = React.createElement(
//   "button",
//   { className: "icon_button cta" },
//   "+",
//   React.createElement(
//     "span",
//     { style: { fontWeight: "bold", marginLeft: "5px" } }, // style is special
//     "Add"
//   )
// )

// const domElement = document.getElementById("root")
// ReactDOM.render(reactElement, domElement)

/**********************************************************/
// Since it's all Just JavaScript™, we can use variables to render

// const title = "Add"
// const reactElement = React.createElement(
//   "button",
//   { className: "icon_button cta" },
//   "+",
//   React.createElement(
//     "span",
//     { style: { fontWeight: "bold", marginLeft: "5px" } },
//     title
//   )
// )

// const domElement = document.getElementById("root")
// ReactDOM.render(reactElement, domElement)

/**********************************************************/
// Let's put this back into JSX. To jump out of JSX Land into JS Land, you use
// curlies ({}).  Inside the curlies is Just JavaScript™. Don't think about a
// "template placeholder", think about a argument to a function (like we just
// saw). Any JS expression can go there, because it is a JS expression.

// const getTitle = () => "Add"
// const reactElement = (
//   <button className="icon_button cta">
//     +
//     <span style={{ fontWeight: "bold", marginLeft: "5px" }}>{getTitle()}</span>
//   </button>
// )

// const domElement = document.getElementById("root")
// ReactDOM.render(reactElement, domElement)

/**********************************************************/
// Now, check this out, you can wrap up a bunch of elements inside of what's
// called a "component" like <FaPlus/>. That thing is a ton of SVG. // react-icons/fa, pulls in fontawesome

// const getTitle = () => "Add"
// const reactElement = (
//   <button className="icon_button cta"> // host component, from browser
//     <FaPlus /> // component, user generated
//     <span style={{ fontWeight: "bold", marginLeft: "5px" }}>{getTitle()}</span>
//   </button>
// )

// const domElement = document.getElementById("root")
// ReactDOM.render(reactElement, domElement)

/**********************************************************/
// Let's turn our button into a component and remove some stuff

// const Button = () => ( // capitalized name
//   <button className="icon_button">
//     <FaPlus />
//     <span>Add</span> // or it could be and declare it below <span>{props.text}</span>
//   </button>
// )

// const domElement = document.getElementById("root")
// ReactDOM.render(<Button />, domElement) // ReactDOM.render(<Button text="Maybe it's translated"/>, domElement)

/**********************************************************/
// One thing that makes components great is that they're reusable, they are the
// foundation of composition in React. This button always renders the same stuff inside,
// but if we use the props that get passed in, we can use it in multiple contexts.

// function Button(props) {
//   return (
//     <button className="icon_button">
//       {props.children} // The only difference between children and other props is you can pass it by name, but you can also pass it by putting them in the actual element
//     </button>
//   )
// }

// const App = () => (
//   <div className="Minutes">
//     <Button>
//       <FaPlus aria-label="Add" />
//     </Button>
//     <input className="Minutes_input" />
//     <Button>
//       <FaMinus aria-label="Subtract" />
//     </Button>
//   </div>
// )
