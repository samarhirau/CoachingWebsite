export interface Question {
  id: number
  question: string
  answer: string
  category: string
  level: string
  example?: string
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the difference between `var`, `let`, and `const`?",
    answer:
      "`var` is function-scoped, `let` and `const` are block-scoped. `const` cannot be reassigned, whereas `let` can.",
    category: "Variables",
    level: "Beginner",
    example: `// var example
function testVar() {
  var x = 1
  if (true) {
    var x = 2
    console.log(x) // 2
  }
  console.log(x) // 2
}

// let/const example
function testLetConst() {
  let y = 1
  const z = 10
  if (true) {
    let y = 2
    const z = 20
    console.log(y, z) // 2, 20
  }
  console.log(y, z) // 1, 10
}`
  },
  {
    id: 2,
    question: "Explain closure in JavaScript.",
    answer:
      "A closure is a function that has access to variables from its outer scope even after the outer function has finished executing.",
    category: "Functions",
    level: "Intermediate",
    example: `function outer() {
  let count = 0
  return function inner() {
    count++
    return count
  }
}

const counter = outer()
console.log(counter()) // 1
console.log(counter()) // 2`
  },
  {
    id: 3,
    question: "What is event delegation?",
    answer:
      "Event delegation is attaching a single event listener to a parent element to handle events for its child elements.",
    category: "DOM",
    level: "Intermediate",
    example: `document.getElementById('parent').addEventListener('click', function(e) {
  if (e.target && e.target.matches('button.child')) {
    console.log('Button clicked:', e.target.textContent)
  }
})`
  },
  {
    id: 4,
    question: "What are Promises?",
    answer:
      "Promises are objects representing the eventual completion or failure of an asynchronous operation.",
    category: "Async",
    level: "Intermediate",
    example: `const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Done!'), 1000)
})

promise.then(result => console.log(result)) // Done!`
  },
  {
    id: 5,
    question: "What is the difference between `==` and `===`?",
    answer:
      "`==` compares values after type coercion, `===` compares both value and type without coercion.",
    category: "Operators",
    level: "Beginner",
    example: `console.log(5 == '5')  // true
console.log(5 === '5') // false`
  },
  {
    id: 6,
    question: "Explain prototypal inheritance.",
    answer:
      "Objects can inherit properties and methods from another object via the prototype chain.",
    category: "OOP",
    level: "Advanced",
    example: `function Person(name) {
  this.name = name
}
Person.prototype.greet = function() {
  console.log('Hello, ' + this.name)
}

const p = new Person('Alice')
p.greet() // Hello, Alice`
  },
  {
    id: 7,
    question: "What is an IIFE?",
    answer:
      "IIFE (Immediately Invoked Function Expression) is a function that runs immediately after it is defined.",
    category: "Functions",
    level: "Intermediate",
    example: `(function() {
  console.log('IIFE executed!')
})()`
  },
  {
    id: 8,
    question: "What is the event loop?",
    answer:
      "The event loop allows JavaScript to perform non-blocking asynchronous operations by executing callbacks after the call stack is empty.",
    category: "Async",
    level: "Advanced",
    example: `console.log('Start')

setTimeout(() => console.log('Timeout'), 0)
Promise.resolve().then(() => console.log('Promise'))

console.log('End')
// Output: Start, End, Promise, Timeout`
  },
  {
    id: 9,
    question: "What is a closure in functional programming?",
    answer:
      "A closure is a function that retains access to its lexical scope, enabling encapsulation of variables.",
    category: "FP",
    level: "Advanced",
    example: `function makeAdder(x) {
  return function(y) {
    return x + y
  }
}

const add5 = makeAdder(5)
console.log(add5(3)) // 8`
  },
]

export default QUESTIONS
