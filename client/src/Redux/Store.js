import { configureStore,createSlice,getDefaultMiddleware } from '@reduxjs/toolkit'
import {reducers, initialState} from './Actions'

 const Slice = createSlice({
    name: 'state',
    initialState:{...initialState},
    reducers:{...reducers}
  })
  
export const Store = configureStore({
    reducer: Slice.reducer,
    middleware: getDefaultMiddleware({
        //middleware config
        serializableCheck: false
      })
})

export const actions= Slice.actions

