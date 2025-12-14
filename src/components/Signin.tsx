import { useState } from 'react'
import Logo from '../assets/Logo.png'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../backend/firebase";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState(null);
  const [category, setCategory] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user.uid);
      navigate("/Home");
    } catch (err) {
      console.error("Login failed:", err.message);
      setError("Email or password is invalid.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !username || !password) {
      setError("Please fill out the form.");
      return;
    }
    if (password.length < 6) {
      setError("Password need to be at least 6 chareacters.");
      return;
    }
    if (role === null) {
      setError("Please select your role.");
      return;
    }
    if (role === 1 && !category) {
      setError("Please select your business category of interest.");
      return;
    }
    if (role === 0 && (!companyName || !industry || !stage || !fundingGoal || !description)) {
      setError("Please fill out the form.");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const auth = getAuth();
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("This username has been taken.");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        role,
        ...(role === 1
          ? { category }
          : {
              companyName,
              industry,
              stage,
              fundingGoal: Number(fundingGoal),
              description,
            }),
        createdAt: new Date().toISOString(),
      });

      console.log("User created successfully:", user.uid);
      navigate("/home");
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#040E18] flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className='flex items-center justify-center mb-3'>
            <img src={Logo} alt='FundyFlowLogo' className='w-19 h-15' />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-blue-500">FundyFlow</h1>
          <p className="text-muted-foreground">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
        </div>

        <div className="bg-blue-950/10 border border-[#252732] rounded-lg p-8">
          <form className="space-y-6" onSubmit={isLogin ? handleLogin : handleSignup}>
            <div className="space-y-2">
              <p>Email</p>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className='border-[#252732] bg-black/10 border w-95 h-12 rounded-xl pl-3'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <p>Password</p>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className='border-[#252732] bg-black/10 border w-95 h-12 rounded-xl pl-3'
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {/* toggle password icon here */}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button type="submit" className="w-full h-10 bg-blue-500 rounded-xl font-bold hover:bg-blue-500/50">
              {loading ? "Loading..." : isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-500 hover:text-blue-500/50"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin;
