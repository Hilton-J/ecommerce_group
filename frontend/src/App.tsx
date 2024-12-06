import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProductViewer from "./Components/ProductViewer";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import { store } from "./store";
import { Provider } from "react-redux";
import PrivateRoute from "./Components/PrivateRoute";
import ListProducts from "./Components/ListProduct";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            
            //PRivate Routes
            <Route path='' element={<PrivateRoute />}>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<MainPage />} />
                <Route path='/description' element={<ProductViewer />} />
                <Route path='/products' element={<ListProducts />} />
              </Route>
            </Route>
            {/* <Route
            path='*'
            element={
              <>
                <MainPage />
              </>
            }
          /> */}
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
