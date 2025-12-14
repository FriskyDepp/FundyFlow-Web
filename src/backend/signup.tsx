import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const [category, setCategory] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [description, setDescription] = useState("");
  const [err, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError(null);

    if (!email || !username || !password) {
      setError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    if (password.length < 6) {
      setError("รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร");
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

    if (role === 0) {
      if (!companyName || !industry || !stage || !fundingGoal || !description) {
        setError("กรุณากรอกข้อมูลบริษัทให้ครบถ้วน");
        return;
      }
    }

    if (loading) return;
    setLoading(true);

    try {
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("ชื่อผู้ใช้นี้ถูกใช้แล้ว");
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
      setLoading(false);
      navigate("/home");
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Sign Up</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <input 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      /><br />

      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={() => setRole(1)} disabled={loading}>Investor</button>
      <button onClick={() => setRole(0)} disabled={loading}>Startup / SME</button>
      <br /><br />

      {role === 1 && (
        <>
          <label>Interested in Business Category:</label><br />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="sustainability">Sustainability</option>
            <option value="other">Other</option>
          </select><br />
        </>
      )}

      {role === 0 && (
        <>
          <label>Company Name:</label><br />
          <input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          /><br />

          <label>Industry Type:</label><br />
          <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
            <option value="">Select a category</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="sustainability">Sustainability</option>
            <option value="other">Other</option>
          </select><br />

          <label>Business Stage:</label><br />
          <select value={stage} onChange={(e) => setStage(e.target.value)}>
            <option value="">Select stage</option>
            <option value="idea">Idea</option>
            <option value="prototype">Prototype / MVP</option>
            <option value="early">Early Stage</option>
            <option value="growth">Growth</option>
            <option value="expansion">Expansion</option>
          </select><br />

          <label>Target Funding (THB):</label><br />
          <input
            type="number"
            placeholder="e.g. 50000"
            value={fundingGoal}
            onChange={(e) => setFundingGoal(e.target.value)}
          /><br />

          <label>Business Description:</label><br />
          <textarea
            rows="4"
            cols="40"
            placeholder="Describe your business briefly..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /><br /><br />
        </>
      )}

      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Processing..." : "Sign Up"}
      </button>

      {err && <p style={{ color: "red" }}>{err}</p>}
    </div>
  );
}

export default SignUp;