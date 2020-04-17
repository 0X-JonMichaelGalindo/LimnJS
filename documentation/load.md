# limn.js

`"limn.js"` is the main library for LimnJS.

Use this library to import, develop, and build your site, webapp, or JavaScript library.

# Index
1. [Load and Configure LimnJS](#load-and-configure-limnjs)
    1. [Source-Directory Flag](#source-directory-flag)
    1. [Global-Name Flag](#global-name-flag)
    1. [Build-Version Flag](#build-version-flag)
    1. [Use-Archaic-JS Flag](#use-archaic-js-flag)
    1. [No-Promise-Polyfill Flag](#no-promise-polyfill-flag)
2. [The Global Limn Object](#the-global-limn-object)
    1. [Limn](#limn)
    2. [Limn.Outline](#limn.outline)
    3. [Limn.Explore](#limn.explore)
3. [Advanced](#advanced)
    1. [Build-Global Flag](#build-global-flag)
        1. [3 Requirements](#3-requirements)
            1. [Requirement 1: Global Name](#requirement-1-global-name)
            2. [Requirement 2: Load Event](#requirement-2-load-event)
            3. [Requirement 3: Master Module](#reqirement-3-master-module)
        1. [Master Module Example](#master-module-example)
    1. [No-Build-Event Flag](#no-build-event-flag)

# Load and Configure LimnJS
In your index.html file, load LimnJS.  
```html
<script src="limn.beta.0.1.js"></script>
```

Configure LimnJS to load your project using flags.  
6 configuration flags are available:

- [source-directory](#source-directory-flag) - set the source directory
- [global-name](#global-name-flag) - rename the global limn object
- [build-version](#build-version-flag) - specify a build version
- [use-archaic-js](#use-archaic-js-flag) - build code compatible with IE 9.
- [no-promise-polyfill](#no-promise-polyfill-flag) - build without the promise polyfill
- [build-global](#build-global-flag) - replace or remove the global limn object

## Source-Directory Flag

Indicate your source's directory name if your source is in a sub-directory beside index.html.  

```html
<script src="limn.beta.0.1.js"
    source-directory="path/to/my/sourcefiles"></script>
```  

Without source-directory set, LimnJS loads modules from index.html's directory.

When naming modules, use forward slashes to indicate code in sub-directories.  
For example, with a source directory and 3 module names:
```html
<script src="limn.beta.0.1.js" source-directory="source"></script>
<script>
    MyApp( "styling/borders/BorderGenerators.forest-green", { ... } )
    MyApp( "styling/panels/Layout.fit-to-page", { ... } )
    MyApp( "ui/keyboard-events/Keys.bind", { ... } )
</script>
```

LimnJS will traverse directories to load those 3 modules:

```
index.html
source
├── styling
│   ├── borders
│   │   └── BorderGenerators.forest-green.js
│   └── panels
│       └── Layout.fit-to-page.js
└── ui
    └── keyboard-events
        └── Keys.bind.js

```

When importing a module by name, use its full path.  
In `"source/Main.start.js"`:
```javascript
MyApp( "Main.start", {
    imports: {
        "greenBorderGen": "styling/borders/BorderGenerators.forest-green",
        "fitPanelToPage": "styling/panels/Layout.fit-to-page",
        "bindKeyEvents": "ui/keyboard-events/Keys.bind",
        ...
    }
    ...
})
```

When defining a module, use its full path.  
In `"ui/keyboard-events/Keys.bind.js"`:
```javascript
MyApp( "ui/keyboard-events/Keys.bind", {
    imports: ...,
    parameters: ...,
    returns: ...,
    factory: ...
} )
```

Warning!:  

Backwards directory traversal is not allowed.  
Fails: ```"../../upper-directory-code```  
All source paths begin in index.html's directory.

## Global-Name Flag

By default, loading `"limn.js"` puts the function `Limn()` on the global scope.  

(See how to use the [global limn object](#the-global-limn-object).)  
(You can replace or remove the global limn object. See the [build-global flag](#build-global-flag).)

The `global-name="..."` attribute renames the global limn function.

Before renaming:
```html
<script src="limn.beta.0.1.js"></script>
<script>
    Limn( "moduleToLoad" );
</script>
```

After renaming:
```html
<script src="limn.beta.0.1.js"
    global-name="MyProjectName"></script>
<script>
    MyProjectName( "moduleToLoad" );
</script>
```  

Setting `global-name` also affects the global object used when defining modules.  
(See how to define modules in the [modules documentation](#modules.md).)

Without global-name set, in `"source/main.start.js"`:
```javascript
//without global-name set
Limn( "source/main.start", {
    imports: ...,
    factory: ...
} );
```
With `global-name="MyProjectName"` set, in `"source/main.start.js"`:
```javascript
//with global-name="MyProjectName" set
MyProjectName( "source/main.start", {
    imports: ...,
    factory: ...
} );
```

## Use-Archaic-JS Flag

By default, LimnJS's build code contains [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), and [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const). (Links are to [MDN](https://developer.mozilla.org/en-US/).)


(See the [build documentation](build.md) for information on building stand-alone libraries with LimnJS.)

By excluding arrow functions, let, and const, then including a Promise polyfill, LimnJS can produce code that is compatible with IE 9.

(This flag only affects LimnJS's build code. Your own source code must also support older browsers.)  
(You can optionally exclude the Promise polyfill. See the [no-promise-polyfill flag](#no-promise-polyfill-flag).)

Setting:

```html
<script src="limn.beta.0.1.js"
    use-archaic-js="true"></script>
```  
Changes the build file as shown in this example:  
Without `use-archaic-js`:
```javascript
( ( pre ) => {
	window.Limn = async ( name ) => {
		const limn = Limnaries[ name ];
		return ( typeof pre === "function" ) ?
			( limn || pre( name ) ) : limn;
	}
} )( window.Limn );
```

With `use-archaic-js`:
```javascript
( function( pre ) {
    window.Limn = function( name ) {
        return new Promise(
            function( returnLimn ) {
                var limn = Limnaries[ name ];
                returnLimn( 
                    ( typeof pre === "function" ) ?
                    ( limn || pre( name ) ) : limn 
                );
            }
        );
    }
} )( window.Limn );
```

## No-Promise-Polyfill Flag

The `no-promise-polyfill` flag prevents LimnJS from including the promise polyfill when building your source code into a stand-alone file.

(See the [build documentation](build.md) for information on building stand-alone libraries with LimnJS.)  
(This flag has no effect if the `use-archaic-js` flag is not set, because modern browsers support Promises natively. See the [use-archaic-js flag](#use-archaic-js-flag).)

```html
<script src="limn.beta.0.1.js"
    use-archaic-js="true"
    no-promise-polyfill="true"></script>
```  

LimnJS's core features require Promises. You can read about Promises on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).  

In order to support older browsers, LimnJS can remove most modern JavaScript features from its code, but it cannot remove Promises.

So, LimnJS includes a piece of code that recreates Promise behavior on the global scope in older browsers.

Specifically, [Anonyco's SPromiseMeSpeedJS](https://github.com/anonyco/SPromiseMeSpeedJS).

If you are building a site that supports older browsers, you may already be using your own Promise polyfill.  
In that case, please exclude LimnJS's Promise polyfill using this flag.

However, LimnJS must have Promises.  
If you exclude the promise polyfill, you must provide your own.  
If you do not, your LimnJS code will not run in older browsers, despite being built with the `use-archaic-js` flag.

# The Global Limn Object

By default, loading `"limn.js"` puts the function `Limn()` on the global scope.  

```html
<script src="limn.beta.0.1.js"></script>
<script>
    Limn( "..." );
</script>
```

(You can rename the global Limn object. See the [global-name flag](#the-global-limn-object).)  
(You can replace or remove the global Limn object. See the [build-global flag](#build-global-flag).)

## Limn

In external code, the global `Limn()` object is a function for loading modules by name.
- **accepts**: a string - the name of a module to load
- **returns**: a promise
- promise **resolves to**: the module's method

(If you are unfamiliar with promises, read about them on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).)

```html
<script src="limn.beta.0.1.js"></script>
<script>
    Limn( 
        "console.logger" //loads "console.logger.js"
    ).then( 
        function( loadedModuleMethod ) {
            loadedModuleMethod( "Log this text to the console!" );
        } 
    )
</script>
```

## Limn.Outline

From within loaded modules, Limn.Outline is function for defining outlines.  

See the [outlines documentation](outlines.md) for how to use outlines. 

In ```"source/geometry/point.scale.js"```:
```javascript
Limn.Outline( 
    "Types.Point*", 
    { "x":"number", "y":"number", "z":"number" }
)

Limn( "source/geometry/point.scale.js" )
```

Outlines must always be defined before the module definition.

Outlines defined in any module are available in all modules.

## Limn.Explore

Open the LimnJS code explorer either from the browser console or from your index.html.

```html
<script src="limn.beta.0.1.js"></script>
<script>
    Limn( "MyApp" );
    Limn.Explore();
</script>
```

Learn about the code explorer in-depth at the [explorer documentation](explorer.md).

# Advanced

Most of the time, you will not need these features, so I moved them to this "advanced" section.  

They can look a bit overwhelming.

## Build-Global Flag

By default, loading `"limn.js"` puts the function `Limn()` on the global scope.  
```html
<script src="limn.beta.0.1.js"></script>
<script>
    Limn( "..." );
</script>
```

(You can rename this global object. See the [global-name flag](#global-name-flag)).

LimnJS allows you to replace or remove the global limn object.

### 3 Requirements

There are 3 requirements for replace the global limn object.  
If you do not meet these requirements, your LimnJS project will not load.

---
#### Requirement 1: Global Name

You must use the `global-name` flag to specify the name of your master module.

```html
<script src="limn.beta.0.1.js"
    global-name="MyApp"
    build-global="true"
></script>
```  
---
#### Requirement 2: Load Event

You must react to a global event in order to detect when LimnJS has finished loading your source.

(You can prevent this event from firing. See the [no-build-event flag](#no-build-event-flag).)


```html
<script>
    window.addEventListener( 
        "MyApp",
        function( myAppGlobalObject ) {
            myAppGlobalObject === window.MyApp; //true
            
            //use your custom interface
            myAppGlobalObject.myStartThing( "..." );
        }
    )
</script>
<script src="limn.beta.0.1.js"
    global-name="MyApp"
    build-global="true"
></script>
```  
---
#### Requirement 3: Master Module

With the `global-name` flag set, LimnJS will automatically load and execute a `master module`.  
See the [master module example](#master-module-example) below.

Your master module's name and javascript filename must match your `global-name` flag value.  
For `global-name="MyApp"`, you must create `"MyApp.js"` and define the "MyApp" module in it.

All modules besides your master module *must* be imported using the `imports:{...}` attribute, either the `imports:{...}` attribute on your master module's definition, or the `imports:{...}` attribute on one of your other imported module definitions.  

Loading a master module prevents loading modules with the global limn object.  
Normally, with the global limn object:
```html
<script src="limn.beta.0.1.js"></script>
<script>
    Limn( "main/my-module-to-load" );
</script>
```
The above code will fail after setting the `build-global` flag, because the global limn function will no longer be available.

---

### Master Module Example

In this example, the master module will automatically be named `"MyApp"`:
```html
<script src="limn.beta.0.1.js"
    source-directory="source"
    global-name="MyApp"
    build-global="true"
></script>
```  

Because `global-name` is set to `"MyApp"`, we *must* create `"MyApp.js"`.  
In `"source/MyApp.js"`:
```javascript
//we must exactly match our global-name
MyApp( "MyApp", {
    imports: {
        /* Import modules here. */
        /* Each of these modules can also import modules. */
        "m1": "main/module1",
        "m2": "sub/module2",
        "saveLimn": "misc/saveGlobalLimnObject",
        ...
    }
    parameters: [ "globalLimn:any" ],
    returns: "any",
    factory: () => {
        function createNewGlobalObject( imports, globalLimn ) {
            //you might save the global limn for use later
            imports.saveLimn( globalLimnObject );

            var myGlobal = {
                stuff: ...,
                more: ...,
            }

            /* To use the Explorer, you must expose it.
            (Since we will no longer have access to the
            global limn object.) */
            myGlobal.Explore = globalLimn.Explore;

            /* Replace the Global Object:
                Whatever your master module returns
                will overwrite the global limn object.
            */
            return myGlobal;
        }

        /*Our factory returns our global builder.
            Our global builder will run after all
            our modules finish importing.
        */
        return createNewGlobalObject;
    }
} );
```
In the example code above, the global limn object will become:
```javascript
myGlobal = {
    stuff: ...,
    more: ...,
    Explore: Limn.Explore
}
```
By meeting these 3 requirements, the `build-global` flag allows you complete freedom in designing the API or interface for your LimnJS library.

---

Note:

If your master module method returns `undefined`, the global object will simply be removed.

For example, you might want to make a library that simply records a log to a server when your app is loaded.  
In that case, you would not need to create anything on the global scope.  
Your master module method could simply return `undefined`.

## No-Build-Event Flag

(This flag is not implemented yet. Specifying it will do nothing.)

```html
<script src="limn.beta.0.1.js"
    global-name="MyApp"
    build-global="true"
    no-build-event="true"
></script>
```

The global load event will still fire during development (when you are using `"limn.js"` to load your source).  
However, the event will not fire when your stand-alone build file is loaded directly.