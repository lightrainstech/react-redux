import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import thunk from 'redux-thunk'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import rootReducer from './reducers'
import AppRoute from './AppRoute'

const persistConfig = {
    key: 'root',
    storage
}
const client = axios.create({
    baseURL: 'http://localhost:8080/',
    responseType: 'json'
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
    persistedReducer,
    applyMiddleware(thunk, axiosMiddleware(client))
)
const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRoute />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
