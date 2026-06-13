import { configureStore } from '@reduxjs/toolkit'

import dashboardReducer from './slices/dashboardSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      dashboard: dashboardReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
