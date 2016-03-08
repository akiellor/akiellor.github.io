<meta name="tags" content="til,javascript" />
<meta name="published" content="2016-03-07" />

# Tagged Template Literals

Today I learned about [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals), a neat new feature of ES6.

Ordinary template literals are just like interpolation in many other languages.

```scala
// Scala
val msg = "World"
println(s"Hello $msg")
```

```ruby
# Ruby
msg = "World"
puts "Hello #{world}"
```

```javascript
// JavaScript
const msg = "World";
console.log(`Hello ${msg}`);
```

A tagged template literal is one where you prefix the template literal with a function identifier which will be used to perform the interpolation.

```javascript
function foo(strings, ...values) {
  console.log(strings); // ["Hello ", ""]
  console.log(values); // ["World"}
  return "foo";
}

const msg = "World";
console.log(foo`Hello ${msg}`); // "foo"
```

This feature allows for a bunch of really interesting options for how to get values into strings, the following links have some ideas:

* [Dedenting multiline code](https://github.com/dmnd/dedent)
* [Google Developers - a bunch of ideas at the end](https://developers.google.com/web/updates/2015/01/ES6-Template-Strings?hl=en)
* [Understanding ECMAScript 6](https://leanpub.com/understandinges6/read/#leanpub-auto-tagged-templates)
