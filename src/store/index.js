import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root.reducer';
import {
	persistStore,
	persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(
	persistConfig,
	rootReducer
);

const store = applyMiddleware(thunk)(createStore)(
	persistedReducer
);

const persistor = persistStore(store);

export { store, persistor };
