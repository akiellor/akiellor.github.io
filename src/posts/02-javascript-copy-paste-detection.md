# JavaScript copy paste detection

A common problem in software development is keeping your software DRY (Don't Repeat Yourself). Tools have been around for a long time to detect where the code could be more DRY, these tools are lovingly called 'Copy Paste Detectors'.

They typically come in two flavours, line based and Abstract Syntax Tree (AST) based.

## Line CPD

A line based copy paste detector is a language agnostic detector which essentially uses 'string searching algorithms' to find duplicates.

The [PMD](http://pmd.github.io/) copy paste detector for example uses the [Rabin–Karp algorithm](https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm) for finding duplicates. This in many cases works reasonably well, but is essentially just looking at the code as a sequence of characters rather than looking into the inherent structure of the language.

## Abstract Syntax Tree CPD

A AST based CPD will instead parse the source code into a language specific AST (which a compiler would typically do as part of the compilation process) and finds duplications within the syntax tree.

For example, the javascript source code:

```
var i = 1;
```

The [esprima](http://esprima.org) parser emits the following ASThas the following output:

```
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "i"
          },
          "init": {
            "type": "Literal",
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "script"
}
```

The AST copy paste detector will then walk from the leaves to the root, hashing the nodes of the tree.

The following animation demonstrates the depth first traversal, hashing all attributes of each node with a **shasum**.

<pre class="asciimate">
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "i"
          },
          "init": {
            "type": "Literal",
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "script"
}
-----
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": <em>f646e41884435fd6c4fa02043d82dfb67169bdf3</em>



          "init": <em>ee8a454ab4410b2a902755210874f2ad4dee54fb</em>




        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "script"
}
-----
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        <em>2b08c4d01e659390ef042ad52adbf0c2a02502e0</em>











      ],
      "kind": "var"
    }
  ],
  "sourceType": "script"
}
-----
{
  "type": "Program",
  "body": [
    <em>804767351e5c475668d0bfaa913d4b7876ae0ecd</em>

















  ],
  "sourceType": "script"
}
-----
<em>d14802401406b46450b15d0a00a578060242a27a</em>























</pre>

These tools will record both the hash of the AST node and the source location where that hash was encountered and create a report of incidents where duplicate hashes occur.

This approach is more accurate in detecting duplications of code that does not have identical source, but is semantically the same. For example:

```javascript
var a = 1;
```

```javascript
var a     =       1;
```
