import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { LoadingBarLinearComponent } from './components/common/loadingBar.tsx'
import './index.css'
import { store } from './redux/store.ts'
import { router } from './routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} preventDuplicate={true} autoHideDuration={2000}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}>
      <Provider store={store}>
        <div className="loading-bar-container">
          <LoadingBarLinearComponent />
        </div>
        <RouterProvider router={router} />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>,
)
