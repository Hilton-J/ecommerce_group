import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProductViewer from "./Components/ProductViewer";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<MainLayout />}>
              <Route index element={<MainPage />} />
              <Route path='/Description' element={<ProductViewer />} />
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
