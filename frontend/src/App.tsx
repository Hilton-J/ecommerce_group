import Navbar from "./Components/Navbar";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProductViewer from "./Components/ProductViewer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Description' element={<ProductViewer />} />
          <Route
            path='*'
            element={
              <>
                <MainPage />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
