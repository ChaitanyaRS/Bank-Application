import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import TransferMoney from './pages/TransferMoney.jsx'
import AddMoney from './pages/AddMoney.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'
import UserDetails from './pages/UserDetails.jsx'
import ProtectedRoute from './security/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: "/",
      element: <Home />
    }, {
      path: "/register",
      element: <Register />
    }, {
      path: "/login",
      element: <Login />
    }, {
      path: "/user-details",
      element: <UserDetails />
    }, {
      path: "/add-money",
      element: <AddMoney />
    }, {
      path: "/transfer-money",
      element: <TransferMoney />
    }
      // }, {
      //   path: "/user-details",
      //   element: <ProtectedRoute element={<UserDetails/>} />
      // }
    ]
  }
])



createRoot(document.getElementById('root')).render(

  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </StrictMode>,
)
