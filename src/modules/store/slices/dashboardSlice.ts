import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MarketPrice {
  symbol: string
  price: string
  timestamp: string
}

interface Signal {
  symbol: string
  signal: 'LONG' | 'SHORT' | 'WAIT'
  confidence: number
  reason: string
  created_at: string
}

interface DashboardState {
  prices: Record<string, MarketPrice>
  signals: Record<string, Signal>
  isConnected: boolean
  lastUpdate: string | null
}

const initialState: DashboardState = {
  prices: {},
  signals: {},
  isConnected: false,
  lastUpdate: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<MarketPrice>) => {
      state.prices[action.payload.symbol] = action.payload
      state.lastUpdate = new Date().toISOString()
    },
    setSignal: (state, action: PayloadAction<Signal>) => {
      state.signals[action.payload.symbol] = action.payload
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    },
  },
})

export const { setPrice, setSignal, setConnected } = dashboardSlice.actions
export default dashboardSlice.reducer
