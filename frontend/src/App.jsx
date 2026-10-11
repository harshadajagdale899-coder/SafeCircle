// import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Registration } from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
