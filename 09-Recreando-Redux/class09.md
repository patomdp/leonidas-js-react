# Redux

Es una de las librerias mas populares dentro del ecosistema de React y nos sirve para almacenar nuestro estado global de la aplicación.
Dentro del propio React también existe el Contexto. O de una manera mas local, tambien existe el estado de un componente. Ademas tambien existen librerias externas como XState.

>Vamos a crear una versión minimalista de Redux enfocándonos en uso encadenado de funciones donde se verán la implementación de conceptos como  “la creación de un Store”, “acciones”, “despachadores de acciones”, “reducers” y “suscripciones a cambios” y usaremos nuestra mini librería para crear un simple contador aunque podrás utilizarla para almacenar y actualizar cualquier tipo de dato.

## Dentro de React Redux se ve asi

```js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

// Creamos el store - Le pasas un parámetro y te devuelve una BDD local "reducer"
let store = createStore(todoApp)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
```

![Esquema de React](/09-Recreando-Redux/img/chrome_9VgIfKCUW2.png)

Es un esquema de solamente una dirección

...Store : Nuestra BDD
(contains)
State : Como está nuestra app
(defines)
UI : Puede cambiar algo de ese estado, ej si clickeo en un modal que abre algo, el estado de expandido cambió
(triggers)
Actions : La acción puede ser "abre el modal" o ponlo en "true", haz esto.
(sent to)
Reducer : Los actions llaman a un reducer, que es una funcion que evalua esa logica de lo que queremos hacer. Todo lo que se ejecuta que al final va a modificar mi estado. El reducer modifica mi Store
(updates)
Store
(contains)
...
![Esquema de Store](/09-Recreando-Redux/img/chrome_yC9XQGC0LO.png)

```js

let store = createStore(todoApp)
// Adentro vamos a tener funciones: getState, subscribe, dispatch, 

// reducer, initialState
```

```js
let store = createStore(todoApp, initialState)
```

- getState: me trae mi estado y todo lo que quiero saber de la aplicación
- subscribe: va a ser una función a la cual yo le voy a mandar una función que se va a ejecutar todas las veces que hay algún cambio dentro de mi estado. Por ejemplo si cambio de DarkMode a LightMode.
- dispatch: es la función por la cual invocamos cambios en el estado. Al dispatch yo le voy a mandar "acciones"
- ceateStore: recibe dos parámetros para poder devolverme ese estado, recibe un **reducer** (que es una función en la cual se van a evaluar las diferentes tipos de sacciones) y tambien un initialState (estado inicial) con el cual mockeamos un poco nuestra app.