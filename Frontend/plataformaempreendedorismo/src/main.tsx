import { Box } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import ptBR from "date-fns/locale/pt-BR"
import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from "redux-persist/integration/react"
import { LoadingBarLinearComponent } from './components/common/loadingBar.tsx'
import './index.css'
import { persistor, store } from './redux/store.ts'
import { router } from './routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} preventDuplicate={true} autoHideDuration={2400}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="loading-bar-container">
            <LoadingBarLinearComponent />
          </div>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            {/* <CssBaseline /> */}
            {/* <Container maxWidth="xl"> */}
            <Box sx={{ my: 0 }}>
              <RouterProvider router={router} />
              {/* <Footer /> */}
            </Box>
            {/* </Container> */}
          </LocalizationProvider>
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>,
)
