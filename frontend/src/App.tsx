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
      <Router>
        <Navbar />
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Description/:id' element={<ProductViewer />} />
          <Route
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
