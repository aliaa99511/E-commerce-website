import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layout from './Pages/Layout/Layout';
import NotFound from './Pages/NotFound/NotFound';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Cart from './Pages/Cart/Cart';
import Categories from './Pages/Categories/Categories';
import Products from './Pages/Products/Products';
import ProductDetails from './Components/Products/ProductDetails';
import GlobalContextProvider from './Context/globalContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { Offline } from "react-detect-offline";
import wifiOffline from './assets/images/icons8-wi-fi-off-50.png';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';

function App() {

  const routers = createBrowserRouter([
    {
      path: '', element: <Layout />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
        },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: '*', element: <NotFound /> },
        {
          path: 'cart', element:
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
        },
        {
          path: 'categories', element:
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
        },
        {
          path: 'products', element:
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
        },
        {
          path: 'details/:detailsId', element:
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
        },
        // { index: true, element: <Home /> },
        // { path: 'cart', element: <Cart /> },
        // { path: 'categories', element: <Categories /> },
        // { path: 'products', element: <Products /> },
        // { path: 'details/:id', element: <ProductDetails /> },
      ]
    }
  ])
  return (
    <Provider store={store}>
      <GlobalContextProvider>
        <div className='offline'>
          <Offline>
            <img src={wifiOffline} width={"18px"} className='mr-10' />
            you are offline</Offline>
        </div>
        <RouterProvider router={routers}></RouterProvider>
      </GlobalContextProvider>
    </Provider>

  );
}

export default App;
