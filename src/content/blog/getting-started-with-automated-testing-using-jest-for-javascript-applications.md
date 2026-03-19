---
title: "Getting Started With Automated Testing Using Jest for JavaScript Applications"
description: "What does testing mean? what is automated testing? Do we really need to test our code? How do I achieve this? what should I test? These are popularly asked questions and this article aims to provide answers for them. Firstly, we need to understand t..."
publishedAt: "2020-12-14T20:34:28.983Z"
featured: false
sourceName: "Hashnode"
sourceUrl: "https://thecodezs.hashnode.dev/getting-started-with-automated-testing-using-jest-for-javascript-applications"
tags:
  - "JavaScript"
  - "Testing"
  - "Jest"
  - "Web Development"
---

> Originally published on [Hashnode](https://thecodezs.hashnode.dev/getting-started-with-automated-testing-using-jest-for-javascript-applications).

What does testing mean? what is automated testing? Do we really need to test our code? How do I achieve this? what should I test? 

These are popularly asked questions and this article aims to provide answers for them. Firstly, we need to understand that there are two methods of testing: automated testing and manual testing, we'll focus primarily on automated testing. At the end of this tutorial, you should be able to write automated tests for your applications conveniently. 



In this article, we will look at Unit Testing for JavaScript applications using the Jest testing framework — a framework for testing your application on the frontend and backend.

The following assumptions are made throughout this article:

- The reader is familiar with writing JavaScript.

- The reader has Node installed on their system.

- The reader has a code editor installed on their system.

<hr/>


## Table of Contents

- Introduction

- What is Automated Testing

- Benefits of Automated Testing

- Types of Tests

- Test Pyramid

- Tooling

- Writing Your First Unit Test

- Conclusion

- Resources

<hr/>


## What is automated testing?

Before defining this, let's look at the term testing itself. ** Testing ** is a process or method, to evaluate or check whether the functionality of an application whether it matches expected requirements or not and to identify bugs to ensure that the product is bug-free in order to produce a quality product. So what is automated testing?

**Automated testing** is a type of test that involves writing code to test out code, and then run those tests in an automated way. With automated testing, our code consists of our application code(production code) and test code

In other words, automated testing means automatically checking if our code meets some requirement before it is released into production. **For example**, let's say we declare a function called `getValues`, we can apply the automated test on the function to give an expected output when given a particular input.


## Benefits of Automated Testing

Automated testing can help a team's efficiency when testing software, it helps in avoiding bugs when trying to improve the software quality. some other benefits include: 

- Test your code frequently in less time

- Higher accuracy

- Increased code coverage

- Automated tests encourage reusability.

- It helps in catching bugs before deploying to production.

- It helps in deploying your application with confidence.

- It helps you focus more on quality.

## Types of Tests

There are three(3) types of automated testing,

- Unit Tests => These tests are used to test a unit of an application without talking to external dependencies such as databases, files, web services and so on. A unit test is said to be cheap to write and it executes faster than other types.

- Integration Tests => This test your application with external dependencies, it takes longer to execute but also gives more confidence. Integration Testing is a level of software testing where individual units are combined and tested to verify if they are working as they intend to when integrated. The main aim here is to test the interface between the modules.


- End-to-end Tests => This drives an application through its User Interface. End-to-end testing is a technique used to test whether the flow of an application performs as expected.

In this tutorial, we'll cover only the Unit Tests and at the end of this article, you'll find resources for the other types of tests. 


## Test Pyramid

Now that we know the types of test, we need to know which type of automated tests to implement in specific parts of our application.
This brings us to what we call "Test Pyramid". It's a test in an application so as to fulfil the requirement and improve the quality of our entire application.


![Test Pyramid](https://testerstories.com/files/001_shape.png)


## Tooling

We need a test framework when writing tests. A framework gives us a library with a bunch of utility functions. We use these utilities to write tests. It also gives a test runner, which we run from the command line and this test runner executes our test and gives us a report of how many tests passed or failed. 

Some popular frameworks include:

- Jasmine

- Mocha

- Jest

In this tutorial, we won't be looking at every test framework. We'll be using only Jest as our tool for testing.

## Writing Your First Unit Test
### Jest
 [Jest](https://jestjs.io/) is a JavaScript Testing framework built by Facebook. 
It is primarily designed for React (which is also built by Facebook for building User Interfaces) based apps but could be used to write automation scenarios for any JavaScript-based codebase(or framework) such as Babel, TypeScript, Node, React, Angular, Vue and more!. [Jest](https://opencollective.com/jest) is used and supported by a lot of companies all over the world.

Some of the advantages/features of Jest are given below:

- There's no need for configuration => Meaning you don't need extra plugins to get started.

- Jest came with Built-in code coverage => Generate code coverage by adding the flag `--coverage`. No additional setup needed. Jest can collect code coverage information from entire projects, including untested files.

- Also came with mocking support => Mock functions are also known as "spies", because they let you spy on the behaviour of a function that is called indirectly by some other code, rather than only testing the output. You can create a mock function with `jest.fn()` . If no implementation is given, the mock function will return undefined when invoked.

### Jest Installation in A Node-based project
Make sure to have Node installed on your system. create a new folder and Initialize the project using the terminal or command line with: 

``` 
mkdir jest-demo && cd jest-demo
 
```

execute the npm init script using the below command:

``` 
npm init -y

 ```
using the flag -y accept all prompts for different parameters.

then install jest with:
``` 
npm i jest --save-dev

 ```

``` 
yarn add --dev jest

 ```
**Note:** We added `--save-dev` because jest is a development dependency, we don't want to deploy jest to the production environment. 

This will install the Jest module (as well as its dependencies).

Now, we have a node project ready with Jest bindings. Let’s configure the npm test script to run the Jest tests i.e. when the command ‘npm test’ is executed, the script should run all the Jest framework based tests.

To do that, update the package.json file and add a script section as shown below.

```
"scripts": {
  "test": "jest"
 }
```

The final package.json file should look like this:

```
{
  "name": "jest-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^26.6.3"
  }
}
```
Let's create a folder called `tests` and a file in the folder called `exec.test.js` in the root directory:

```
mkdir test && cd test && touch exec.test.js

```
**Note:** please take note of the naming convention of the test file. 
This is necessary for jest to correctly pick the files and run the code in it.
Next, Enter the following in the terminal to go back to the previous directory:

```
cd ..

```
then create a file called `exec.js`:

```
touch exec.js

```

We should have a folder structure like so: 

```

=> node_modules
=> test
     --exec.test.js
=> exec.js
=> package-lock.json
=> package.json


```


Now that we're done with the project setup, let's write some code.


So let's create our first test suite, but before that, there are few things you should have in mind when writing a test for your applications. Testing is all about inputs, functions and expected outputs.

Then copy and paste the following code in the exec.js module and save: 


```
// Testing strings
module.exports.greet = function (name) {
  return 'Welcome ' + name;
};


```

We declared a simple greet function that has a name argument which returns `Welcome + name` which will be our input in the test suite.


Then copy & paste this code in exec.test.js and save, then go to the terminal and run `npm test`

```
const exec = require('../exec');
describe('Testing functions', () => {
  it('Should return welcome + input', () => {
    const result = exec.greet('Kenny');

    expect(result).toBe('Welcome Kenny');
  });
});

```
Our test is passing, you should see this in the terminal/console

```
 PASS  tests/exec.test.js
  Testing functions
    √ Should return welcome + input (13 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        5.849 s
Ran all test suites.


```

**Note:** we declared a `const` and imported our `exec.js` module into our test file.
The describe function is a jest method for containing one or more related tests. It takes two arguments, a string for describing the test suites and a callback function for wrapping the actual test, it also encourages clean code. [Click to read more on methods. ](https://jestjs.io/docs/en/api)

![Happy - YAY](https://media0.giphy.com/media/OENVpzTLu4zKM/giphy.gif?cid=e1bb72ff5ae2bd162f725172770d9009)

** You just successfully wrote your first test using Jest! **

We just tested a string, let's try testing a number.

copy and paste this code in exec.js just below the greet function and save:

```
//Testing numbers
module.exports.absolute = function (number) {
  return number >= 0 ? number : -number;
};

```
Copy this into the test file, your test suites should be like this:

```

const exec = require('../exec');
describe('Testing functions', () => {
  it('Should return welcome + input', () => {
    const result = exec.greet('Kenny');

    expect(result).toBe('Welcome Kenny');
  });
});

describe('absolute', () => {
  it('Should return a positive number if the input is positive', () => {
    const result = exec.absolute(1);

    expect(result).toBe(1);
  });
  it('Should return a positive number if the input is negative', () => {
    const result = exec.absolute(-1);

    expect(result).toBe(1);
  });
  it('Should return a 0 if the input is 0', () => {
    const result = exec.absolute(0);

    expect(result).toBe(0);
  });
});


```

We should see this in the terminal:

```
 
   PASS  tests/exec.test.js
  Testing functions
    √ Should return welcome + input (3 ms)
  absolute
    √ Should return a positive number if the input is positive
    √ Should return a positive number if the input is negative (1 ms)
    √ Should return a 0 if the input is 0

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        3.974 s
Ran all test suites.

```
All our test are passing. so in our `absolute function` declared above in the describe block, we tested for positive & negative input and used a matcher to determine the expected output.

Let's write our final test then we're done, but before that add `watchAll` flag to your test script in package.json so that you don't need to type`npm test` in your terminal each time you want to run your test. It watches your files and re-runs your test whenever you made changes to your code.

```
{
  "name": "jest-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest --watchAll"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^26.6.3"
  }
}

```

Let's test our `--watchAll` flag by breaking our code, try changing anything in your code and save. you should see error immediately without running `npm test` again. You can change it back then save.

Finally, let's try testing an array. So back to our `exec.js` file lets add this code to the previous code we have in that module.

```

// Testing arrays
module.exports.getCurrencies = function () {
  return ['USD', 'AUD', 'EUR'];
};

```
This is a simple `getCurrencies` function that returns currencies from an array.

Let's add this to our test suites, so back to our `exec.test.js` 

** Note: ** Whenever we test arrays, objects, and other types, we should be careful with the way we use our matchers. It shouldn't be too specific or general.

```

describe('getCurrencies', () => {
  it('should return currencies', () => {
    const result = exec.getCurrencies();

    //Too General
    expect(result).toBeDefined();
  });
});


```
This problem with this test is that it will pass even if I change the `getCurrencies` function to return 1 like so:

```

// Testing arrays
module.exports.getCurrencies = function () {
  // return ['USD', 'AUD', 'EUR'];
  return 1;
};


```

```

 PASS  tests/exec.test.js
  Testing functions
    √ Should return welcome + input (3 ms)
  absolute
    √ Should return a positive number if the input is positive (1 ms)
    √ Should return a positive number if the input is negative
    √ Should return a 0 if the input is 0 (1 ms)
  getCurrencies
    √ should return currencies

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        3.633 s
Ran all test suites.
```
You can see that our test are passing but it is a wrong approach, so let's change our `getCurrencies` function back to normal and check other ways which we can implement this test.

```

describe('getCurrencies', () => {
  it('should return currencies', () => {
    const result = exec.getCurrencies();

    //Too General
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // Too specific
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);

    // Right way

    expect(result).toEqual(expect.arrayContaining(['AUD', 'EUR', 'USD']));
  });
});

```

We get this result in our console.

```

 PASS  tests/exec.test.js
  Testing functions
    √ Should return welcome + input (3 ms)
  absolute
    √ Should return a positive number if the input is positive (1 ms)
    √ Should return a positive number if the input is negative
    √ Should return a 0 if the input is 0 (11 ms)
  getCurrencies
    √ should return currencies (22 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        4.105 s
Ran all test suites.

```

We can see all our test are passing. If you forget the right matchers, you can always check the docs. I'll attach a link to the docs at the end of the article.

## Conclusion

Using Jest as seen in the above examples, we can apply testing to various functions in our applications which gives an expected output based on an input. With the `--watchAll` flag, we are immediately informed when things break. we can also add that the testing script to githooks such that when we try to commit or push, our test are immediately executed. This guide [getting started with githooks](https://soshace.com/getting-started-with-git-hooks-using-ghooks/)  explains how to achieve this. 
This article Introduces automated testing and also how we can use Jest to test our applications.

## RESOURCES

[Introduction to Jest](https://jestjs.io/docs/en/getting-started)

[Introduction to Methods & Matchers in Jest](https://jestjs.io/docs/en/api)

[Getting Started with Jest](https://jestjs.io/docs/en/api)

[Automated Testing By TechTarget](https://searchsoftwarequality.techtarget.com/definition/automated-software-testing)

You can find all the code in this article on this [GitHub repo](https://github.com/kennyOlakunle/Testing-with-Jest)
