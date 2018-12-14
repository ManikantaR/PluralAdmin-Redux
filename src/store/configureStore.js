import {createStore, applyMiddleware} from 'redux';
import root from '../reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState){
    return createStore(        
        root,
        initialState,
        applyMiddleware(thunk, reduxImmutableStateInvariant()) 
        // check redux documentation hot reloading -- react slingshot
    );
}