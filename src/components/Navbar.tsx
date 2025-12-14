import React, { useEffect, useState } from "react";
import logo from "../assets/nav-logo.png";
import "../backend/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navigation = () => {
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, [auth]);

  const navigateLanding = () => nav("/");
  const navigateHome = () => nav("/Home");
  const navigateMatch = () => nav("/Matching");
  const navigateAnalyst = () => nav("/Analyst");
  const navigateDiscuss = () => nav("/Discuss");
  const navigateSignin = () => nav("/Signin");

  const handleLogout = async () => {
    await signOut(auth);
    nav("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#040E18] backdrop-blur-lg border-b border-border border-[#252732]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img onClick={navigateLanding} src={logo} alt="FundyFlow" />
            <span className="text-xl font-bold text-foreground">FundyFlow</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a onClick={navigateHome} href="#home" className="text-white hover:text-blue-500 transition-colors">
              Home
            </a>
            <a onClick={navigateMatch} href="#matching" className="text-white hover:text-blue-500 transition-colors">
              Matching
            </a>
            <a onClick={navigateAnalyst} href="#analyst" className="text-white hover:text-blue-500 transition-colors">
              Analyst
            </a>
            <a onClick={navigateDiscuss} href="#discuss" className="text-white hover:text-blue-500 transition-colors">
              Discuss
            </a>
          </div>

          <div className="flex items-center space-x-7">
            {user ? (
              <button onClick={handleLogout} className="font-semibold bg-blue-700/20 w-20 h-8 rounded-lg border border-blue-500/10 hover:text-blue-500">Sign out</button>
            ) : (
              <>
                <button onClick={navigateSignin} className="font-semibold hover:text-blue-500">Sign in</button>
                <button className="w-25 h-10 font-semibold rounded-lg bg-blue-500 hover:bg-blue-500/10">Register</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;