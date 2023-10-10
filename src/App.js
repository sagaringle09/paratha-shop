import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./react-redux-store/store/configureStore";
import "./App.css";
import Home from "./pages/Home/Home.js";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/cart" element={<Cart />} exact />
            <Route path="*" element={<Navigate to="/" />} exact />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
