import React, { useEffect, useState } from "react";
import  "./backend/firebase";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Matching from "./components/Matching";
import Analyst from "./components/Analyst";
import Discuss from "./components/Discuss";
import Signin from "./components/Signin";
import Sim from "./components/Sim";
import RiskAnalysis from "./components/riskAnalysis";
import SuccessRatePrediction from "./components/successRate";

// function ProtectedRoute({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (u) => {
//       setUser(u);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [auth]);

//   if (loading) {
//     return <p style={{ textAlign: "center", color: "white" }}>Checking session...</p>;
//   }

//   if (!user) {
//     navigate("/Signin");
//     return null;
//   }

//   return children;
// }

function App() {
  return (
    // <BrowserRouter>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    //     <Route path="/Matching" element={<ProtectedRoute><Matching /></ProtectedRoute>} />
    //     <Route path="/Analyst" element={<ProtectedRoute><Analyst /></ProtectedRoute>} />
    //     <Route path="/Discuss" element={<ProtectedRoute><Discuss /></ProtectedRoute>} />
    //     <Route path="/Signin" element={<Signin />} />
    //     <Route path="/SimulationDeal" element={<ProtectedRoute><DealSimulationPage /></ProtectedRoute>} />
    //   </Routes>
    // </BrowserRouter>

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Matching" element={<Matching />} />
        <Route path="/Analyst" element={<Analyst />} />
        <Route path="/Discuss" element={<Discuss />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Sim" element={<Sim />} />
        <Route path="/RiskAnalysis" element={<RiskAnalysis />} />
        <Route path="/SuccessRate" element={<SuccessRatePrediction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
