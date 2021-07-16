import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";

import reducers from './reducers';
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export function configureStore(initialState) {
  let enhancedCompose = compose;

  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    enhancedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }


    const store = createStore(
        reducers,
        initialState,
        enhancedCompose(applyMiddleware(...middlewares))
    );

    sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

export default configureStore();
