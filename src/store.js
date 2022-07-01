import axios from 'axios';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import * as api from './config';

import { themeReducer } from './store/features/theme/theme-slice';
import { countriesReducer } from './store/countries/countriesReducer';
import { controlsReducer } from './store/controls/controlsReducer';
import { detailsReducer } from './store/details/detailsReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  countries: countriesReducer,
  controls: controlsReducer,
  details: detailsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'countries'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
