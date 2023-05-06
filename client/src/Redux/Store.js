import { configureStore, createAction, combineReducers, createSelector, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Provider, useSelector } from 'react-redux'
import React, { createContext, Component } from 'react';

const setter = (state, action) => {
  const { keys, value, only } = action.payload;

  const recursive = (obj, keys, value) => {
    if (!obj || !keys) return obj;

    const [currentKey, ...remainingKeys] = keys.split(".");
    const type = Object.prototype.toString.call(obj[currentKey]);

    if (type === "[object Array]") {
      const index = obj[currentKey].findIndex(item => item.id.toString() === remainingKeys[0]);
      if (index !== -1) {
        if (remainingKeys.length === 1) {
          const [newKeys, newValue] = [Object.keys(value)[0], Object.values(value)[0]];
          obj = {
            ...obj,
            [currentKey]: only ? obj[currentKey].map((item, i) => {
              if (i === index) {
                return {
                  ...item,
                  [newKeys]: newValue
                };
              }
              return {
                ...item,
                [newKeys]: false
              };
            }) : [
              ...obj[currentKey].slice(0, index),
              {
                ...obj[currentKey][index],
                ...value
              },
              ...obj[currentKey].slice(index + 1)
            ]
          };
        } else {
          obj = {
            ...obj,
            [currentKey]: [
              ...obj[currentKey].slice(0, index),
              recursive(obj[currentKey][index], remainingKeys.slice(1).join("."), value),
              ...obj[currentKey].slice(index + 1)
            ]
          };
        }
      }
    } else if (type === "[object Object]") {
      if (remainingKeys.length === 1) {
        obj = {
          ...obj,
          [currentKey]: {
            ...obj[currentKey],
            [remainingKeys[0]]: value
          }
        };
      } else {
        obj = {
          ...obj,
          [currentKey]: remainingKeys.length ? recursive(obj[currentKey], remainingKeys.join("."), value) : value
        };
      }
    }

    return obj;
  };

  if (keys.includes(".")) {
    const newState = recursive({ ...state }, keys, value);
    return {
      ...state,
      ...newState,
    };
  } else {
    return {
      ...state,
      [keys]: value
    };
  }
}
const defaultState = { actions: {} }

function SetterProvider({ children, actions = {}, state = {} }) {

  const Slice = createSlice({
    name: 'state',
    initialState: { ...defaultState, ...state },
    reducers: { setter, ...actions }
  })

  const Store = configureStore({
    reducer: Slice.reducer,
    middleware: getDefaultMiddleware({
      //middleware config
      serializableCheck: false
    })
  })

  const action = Slice.actions
  Store.dispatch(action.setter({ keys: 'actions', value: action }))

  return (

    <Provider store={Store} >
      {children}
    </Provider>

  );

};
export default SetterProvider

