# Recursive Definitions

```javascript
Outline( "nestedNumberArray*", [ "number|nestedNumberArray*", "..." ] )

fits( [ 0, [ 1 ], [ 2, 3, [ 4 ] ] ], "nestedNumberArray*" ); //true
```

## The Identity Outline

Direct recursion is defined as the identity outline, and is equivalent to "any".
```javascript
M.Outline( "self*", "self*" ); 
//equivalent: M.Outline( "self*", "any" );

fits( 777, "self*" ); //true
fits( null, "self*" ); //true
fits( {}, "self*" ); //true
```

The identity outline gives rise to recursive object templates, e.g. for linked lists.
```javascript
M.Outline( "ob*", {
    "alike": "ob*"
} ); 

let a = { alike: null };
a.alike = a;

fits( a, "ob*" ); //true
```

However, the identity outline creates obfuscated "any" definitions:

```javascript
//Here, a cursory glance implies a*, b*, and c* are numbers
M.Outline( "a*", "number|b*" );
M.Outline( "b*", "number|c*" );
M.Outline( "c*", "number|a*" );
//However, a* === b* === c* ==> a*
//therefore, a*, b*, and c* are all identity outlines

fits( false, "a*" ); //true
```

When using recursive definitions, carefully examine LimnJS's code explorer for unexpected identity outlines.

![Obfuscated identity outline in code explorer.](img/identity-any.png)