import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Authenticate/Register";
import Login from "./Authenticate/Login";
import Success from "./Authenticate/Success";
import Test from "./Main/Test";
import { FormDataContext } from "./Context/FormDataContext";
import Home from "./Main/Home";

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phone: '',
    agreed: false,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ Define this state

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/success" element={<Success />} />
          <Route path="/Home" element={<Home />} />
          <Route
            path="/Test"
            element={<Test isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} // ✅ Pass it as props
          />
        
        </Routes>
      </Router>
    </FormDataContext.Provider>
  );
}

export default App;
