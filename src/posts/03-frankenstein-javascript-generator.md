# Frankenstein JavaScript Generator

So I was working on a Copy Paste Detector and found that it would be useful for testing purposes to have a tool that could generate javascript.

With a bit of research, I found that there is a tool called [escodegen](https://github.com/estools/escodegen), that can take a JavaScript AST and print it as regular JavaScript string. So all I needed to do was have something that could generate some AST and the printing part would be sorted.

The first pass at the generator was pretty basic. The implementation of this was basically a giant switch statement where for each node type there was a definition of how to generate it, which may be written in terms of other generated node types. Example pseudo code:

```javascript
function generate(nodeType) {
  switch (nodeType) {
    case "Identifier":
      return {type: "Identifier", name: "foo"}
    case "FunctionDeclaration":
      return {
        type: "FunctionDeclaration",
        id: generate("Identifier"),
        params: [],
        body: []
      };
    ...
  }
}
```

This approach was super tedious to implement, and resulted in many cases where node types would need to be grouped together. For above example generates a function declaration with no body statements, to fix this you need to have some idea of what the valid node types for that section of AST.

Instead of rethinking, I pushed forward, extending the switch to have some groups of things like Statements which would be randomly sampled from things considered to be Statements:

```javascript
function generate(nodeType) {
  switch (nodeType) {
    case "Identifier":
      return {type: "Identifier", name: "foo"}
    case "FunctionDeclaration":
      return {
        type: "FunctionDeclaration",
        id: generate("Identifier"),
        params: [],
        body: [
          generate("Statement")
        ]
      };
    case "Statement":
      const type = sample(["ExpressionStatement", "FunctionDeclaration"]);
      return generate(type);
    ...
  }
}
```

At the end, there was a **working** solution (if you ignore the stack-overflow errors). But we can do better...

I had heard a bunch of people talk about Markov Chains and how they can be used to generate sequences of English text (similar to [SwiftKey](https://swiftkey.com/en)), and that was about all I knew. But it seemed something Markov-y could help me.

There was an example on the [Wikipedia](https://en.wikipedia.org/wiki/Markov_chain) entry which described a creatures eating habits as the following rules:
* It eats exactly once a day.
* If it ate cheese today, tomorrow it will eat lettuce or grapes with equal probability.
* If it ate grapes today, tomorrow it will eat grapes with probability 1/10, cheese with probability 4/10 and lettuce with probability 5/10.
* If it ate lettuce today, tomorrow it will eat grapes with probability 4/10 or cheese with probability 6/10. It will not eat lettuce again tomorrow.

Looks like if we replace food, with JavaScript AST node properties we are in business. So the first sample model looked something like:

* a FunctionDeclaration `id` is always an Identifier
* a FunctionDeclaration `params` is always an list of Identifier's
* a FunctionDeclaration `body` is 3/1 split between an ExpressionStatement and another FunctionDeclaration
* an ExpressionStatement always has an Identifier expression 
* an Identifier always has a name of "foo"

And in data form:

```json
{
  "FunctionDeclaration.id": {
    "Identifier": 1
  },
  "FunctionDeclaration.params[]": {
    "Identifier": 1
  },
  "FunctionDeclaration.body[]": {
    "ExpressionStatement": 3,
    "FunctionDeclaration": 1
  },
  "ExpressionStatement.expression": {
    "Identifier": 1
  },
  "Identifier.name": {
    "foo": 1
  }
}
```

**It is important to note that this model is not entirely complete, in that some elements are only valid at certain positions within a node array e.g. a ReturnStatement can only occur at the end of a FunctionDeclaration.body.**

When generating FunctionDeclarations, this model creates things like:

```javascript
function foo(foo) {
 foo
}
```
OR
```javascript
function foo(foo) {
  function foo(foo) {
    function foo(foo) {
      foo
    }
  }
}
```

The generate function was refactored to take the desired node type and the model being used to generate from. The new javascript generator was considerably smaller in size, because the logic of what nodes are allowed where was not embedded in the generator, but in the model. But these sample models are so boring, so the next step was to build an analyser to extract these models from existing code.

With the model roughly sketched out, the analyser would simply have to traverse some javascript code and count instances of node types at different properties with the exclusion of Literals and Identifiers which would need to collect the values.

If you are interested in looking at the code that makes these things possible, feel free to have a look at [generate.js](https://github.com/akiellor/generate.js).

If this post was interesting to you, you may want to have a look at the projects in the [estools](https://github.com/estools) GitHub organization, particularly [esfuzz](https://github.com/estools/esfuzz) which solves the javascript generation problem in a different way for a different purpose.
