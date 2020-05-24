
0. Today i am gonna talk about React, so the main question that i wanna rise in my speach is “Who needs to React?”
1. We can divide webDev into two parts: front-end and back-end. Client and server parts. Today i am gona talk about the client side - the front end. User is contacts directly with this part. 
2. JavaScript is the main and only one programming language that browser understands. Some advanced users, of course, can object to me and say, okey, but what about the coffee script, type-script and others? Fine But No… all of them are compiled in JavaScript before execution. 
3. If we have enough knowledge of JS, we can develop complexity application and website. But However, when we working with vanilla JS, our speed, simplicity, and scalability often suffer. This is especially felt in the modern web, in which single-page applications are popular.
4. To solve this problems we have some frameworks and libraries developed. Their names are probably known to many of you, they are in our ears. THIS is Angular (developed by Google), VUE (they are olso frameworks) and React ReactJS
5. React is a declarative, efficient and flexible JavaScript library for creating user interfaces . It allows you to create complex UIs from small and isolated parts of code
6. The smallest example (Hello World) at ReactJS  looks like this. 
7. React was developed by Facebook engineers and the first project implemented on ReactJS is the Facebook news feed. in 2011. Later, the Instagram feed was also rewritten to React. 
8. And less than a year later, in 2013, at the JSConf US conference, Facebook opened the source code for React. This has become one of the advantages of React, I mean open source. 
9. The main feature of React is a virtual DOM. React creates a cache structure in memory, which allows you to calculate the difference between the previous and current states of the interface to optimally update the browser DOM. Thus, the programmer can work with the page, believing that it is being updated all, but the library independently decides which components of the page need to be updated. Depending on the state of your application, you can draw only some of the components on the page without triggering a re-rendering on the entire page.
10. We are use JSX when writing React Code - I call it a mixture of HTML and JavaScript. but it is also possible to use regular JavaScript. React does not require to use of JSX but JSX is highly recommended.
11. React is based on a component approach. Components allow you to divide the UI into independent parts that can be reused and work with each part separately. Conceptually, components are similar to JavaScript functions. They take data (called props) and return React elements that describe what should appear on the screen. All React components should work as pure functions with respect to their props properties.
12. Components can also be represented as classes. We can turn a component function into a component class in 5 steps. 
- Create an ES6 class that extends React.Component.
- Add to it the only empty method with name render ().
- Place the body of the function in the render () method.
- Replace props with this.props in the body of the render () method.
- Delete the remaining empty function definition
13.  The state is similar to the props properties, however it is private and is completely controlled by the component. Previously, only class components could have state. However, with the advent of hooks (we will talk about them later), function components may also have a state. We can add state to the class through the constructor. 
14. We update the state through the setState () method. There are three things you need to know about it.
- You cannot modify the state directly only through the setState () method. this.state can only be used in the constructor
- Status updates can be asynchronous. We cannot rely on the value of the state before calculating. In order not to get the wrong value, the setState method must take a function instead of an object. This function takes two value the previous state and properties at the time of the update. 
- When you call setState (), React merges the current state and the object you provided. In the example, this.setState ({users}) leaves this.state.permissions intact, but completely replaces this.state.users.
14a - the state is called local or encapsulated. Parent and child elements are not aware the state of the component. But component can pass this state down as props properties to its child components. You can also pass state up the hierarchy. 
15. However, state management have some problems. especially in the case of a long hierarchy of components. However, this can be cumbersome for certain types of properties. Now you can solve this issue using context. In that case we can avoid passing properties through intermediate elements.
16. It is important to free up resources occupied by components when they are destroyed in order to avoid memory leak. React allows you to declare special methods in a component class to run specific code when the component is mounted or dismounted. These methods are called “lifecycle hooks” in the documentation.
17. Hooks are available in React version 16.8. You don't need to write Classes for use state with Hooks.  On screen, the new useState function is a hook. They are provide a more direct API for properties, states, context, ref links, and the life cycle. Hooks are also offer a powerful new way to combine them.
18. So now we can answer the question that we raise in the first slide (showing the first slide) “Who needs to React” 
It will be a Front End developers who keep up with the times, are developing single-page applications. Progressive people who value their time and understand how fast their product should work and assume the scaling of their project. And looking for a model way for this. If this is about you, You need to react NOW!

