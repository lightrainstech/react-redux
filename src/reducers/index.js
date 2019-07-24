import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import app from './app.js'

export default combineReducers({
    app: app,
    form: formReducer
})
