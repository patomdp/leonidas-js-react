# Functions y Arrow Functions

```js
// funcion normal con nombre
function myFunction() {
    return 'respuesta funcion'
};

// funcion sin nombre (anonima)
function() {
    return 'respuesta funcion'
};

// arrow function (anonima)
() => {
    return 'Este es un arrow function'
};
```

## Sugar syntax en Arrow Functions

- Retorno en una linea

```js
const myFunction() {
    return 'esta es una funcion muy bonita'
};
// Por
const myFunction = () => 'esta es una funcion muy bonita'
```

- Un solo parámetro

```js
const myFunction = (param) => `esta es una funcion muy ${param}`
// Por
const myFunction = param => `esta es una funcion muy ${param}`
```

- Sin parámetros

```js
const myFunction = () => `esta es una funcion muy bonita`
// Por esto es una convencion cuando no hay parametros
const myFunction = _ => `esta es una funcion muy bonita`
```

## Hoisting

Habilidades de "elevamiento" que tenemos dentro de las variables y funciones dentro de JS.
Va a tomar esas funciones y las va a poner al inicio del programa. Por eso funciona.

- Functions hacen hoisting

```js
// En este ejemplo yo estoy invocando a la funcion name() antes de declararla
// Funciones HACEN hoisting
name()
function name() {
    return 'leo'
} // Todo OK

// Const, Let, var, NO hace hoisting
// en realidad var si hace hoisting, se lee y se pone al inicio de la interpretacion pero como valor undefined. Por eso dira que name is not a function, por que lo hoistea como undefined
name()
const name = () => {
    return 'leonidas'
} // va a dar Uncaught ReferenceError: Cannot access 'name' before initialization at <anonymous>

```

## This

- Las funciones tienen su propio this

```js
function myFunction(name) {
    this.name = `${name} :)`
};
var user = new myFunction('leo')
console.log(user.name)



// Las arrow function NO tienen this
const myFunction = (name) => {
    this.name = `${name} :)`// no va a tomar un contexto propio, va a tomar un contexto superior
};

```

- Indentacion de funciones

```js
function time() {
    this.seg = 0
    setInterval( function () {
        this.seg++
        console.log(this.seg)
    }, 1000);
};
new time()
// time {seg: 0}
// NaN
// por que this.seg me va a devolver indefinido y le voy a querer sumar ++
```

- Indentacion de funciones [fix]

```js
function time() {
    const self = this
    self.seg = 0
    setInterval(function () {
        self.seg++
        console.log(self.seg)
    }, 1000);
};
new time();
// time {seg: 0}
// 1
// 2
// 3
// 4
```

- Arrow Function deja pasar al this superior

```js
function time() {
    this.seg = 0;
    setInterval(() => {
        this.seg++
        console.log(this.seg);
    }, 1000);
};
```

- Otro Ejemplo
- En el Browser "this" es "window"

```js
const $user = document.querySelector('#user')
$user.addEventListener('click', () => {
    console.log(this.id)
});
// undefined
```

- This es el selector ESTA ES LA OPCION MEJOR, llama a su propio this por que lo tiene encapsulado

```js
const $user = document.querySelector('#user')
$user.addEventListener('click', function() {
    console.log(this.id)
});
// user
```

- Posible solucion

```js
const $user = document.querySelector('#user')
$user.addEventListener('click', () => {
    console.log($user.id)
});
// user
```

> Hay espacio para functions y arrow functions
