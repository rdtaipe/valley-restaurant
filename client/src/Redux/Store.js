import { configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reducers, initialState } from './Actions'
import { useSelector, useDispatch } from 'react-redux'
import { Provider } from 'react-redux'

const Slice = createSlice({
  name: 'state',
  initialState: { ...initialState },
  reducers: { ...reducers }
})

const Store = configureStore({
  reducer: Slice.reducer,
  middleware: getDefaultMiddleware({
    //middleware config
    serializableCheck: false
  })
})

const actions = Slice.actions

export function SetterProvider({ children, reducers, initialState }) {
  const dispatch = useDispatch()
  dispatch(actions.setActions(actions))
  return (<Provider store={Store} >
    {children}
  </Provider>)
}
