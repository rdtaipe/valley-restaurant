import { configureStore, createReducer, createAction, combineReducers, createSelector, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Provider, useSelector } from 'react-redux'
import React, { createContext, Component, useEffect, useState } from 'react';


const defaultReducer = {
  setter: (state, action) => {
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
      } else if (type === "[object String]") {

        obj = {
          ...obj,
          [currentKey]: value
        }

      }
      return obj;
    };

    if (keys && keys.includes(".")) {
      const newState = recursive({ ...state }, keys, value);
      return {
        ...state,
        ...newState,
      };
    } else if (keys && !keys.includes(".")) {
      return {
        ...state,
        [keys]: value
      };
    } else if (!keys) {
      return {
        ...state,
        state: value
      };
    }
  },

  getter: (state, action) => {
    const { keys } = action.payload;
    const recursive = (obj, keys) => {

      if (!obj || !keys) return obj;

      const [currentKey, ...remainingKeys] = keys.split(".");
      const type = Object.prototype.toString.call(obj[currentKey]);

      if (type === "[object Array]") {

        const index = obj[currentKey].findIndex(item => item.id.toString() === remainingKeys[0]);
        if (index !== -1) {
          if (remainingKeys.length === 1) {

            return obj[currentKey][index];
          } else {

            return recursive(obj[currentKey][index], remainingKeys.slice(1).join("."));
          }
        }
      } else if (type === "[object Object]") {
        if (remainingKeys.length === 1) {
          return obj[currentKey][remainingKeys[0]];
        } else {
          return recursive(obj[currentKey], remainingKeys.join("."));
        }
      } else if (type === "[object String]") {
        return obj[currentKey]
      }

      return obj;
    };
    if (keys && keys.includes(".")) {
      return recursive({ ...state }, keys);
    } else if (keys && !keys.includes(".")) {
      return state[keys];
    } else if (!keys) {
      return state
    }
  },
}


export default function SetterProvider({ children, actions = {}, state = {} }) {


  const Slice = createSlice({
    name: 'state',
    initialState: { ...state },
    reducers: { ...defaultReducer, ...actions }
  })

  const Store = configureStore({
    reducer: Slice.reducer,
    middleware: getDefaultMiddleware({
      //middleware config
      serializableCheck: false
    })
  })
  const Actions = Slice.actions

  const useSetter = (path) => {
    const [setterState, setterSetState] = useState(null)
    const getState = () => {
      const state = Store.getState()
      var newState = defaultReducer.getter(state, { payload: { keys: path } })
      setterSetState(newState)

    }

    const changeState = (v) => {
      Store.dispatch(Actions.setter({ keys: path, value: v }))
      getState()
    }

    return [setterState, changeState]
  }

  const setActions = (act) => {
    const name = Object.keys(act)[0]
    const action = act[name]
    const state = Store.getState()
    const newAction = createAction(`state/${name}`, (data) => {
      return {payload:{state, data}}
    })
    console.log(newAction(action))

    Store.dispatch(Actions.setter({ keys: 'actions', value: { ...state.actions, newAction } }))
  }

  Store.dispatch(Actions.setter({ keys: 'actions', value: { ...Actions, useSetter, setActions } }))

  return (

    <Provider store={Store} >
      {children}
    </Provider>

  );

};


