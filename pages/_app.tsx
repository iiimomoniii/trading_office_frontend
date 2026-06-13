import '@/styles/globals.css'

import { StyleProvider } from '@ant-design/cssinjs'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import AntdProvider from '@/libs/antd'
import { makeStore } from '@/modules/store'

const store = makeStore()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <StyleProvider hashPriority="high">
        <AntdProvider>
          <Component {...pageProps} />
        </AntdProvider>
      </StyleProvider>
    </Provider>
  )
}