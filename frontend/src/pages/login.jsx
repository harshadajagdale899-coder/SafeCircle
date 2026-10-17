import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import "./login.css";

import {
  NavbarUser,
  InputField,
  HeroSection,
  RegisterFormContainer,
} from "./register";
import { AtSign, Lock, Shield } from "lucide-react";
import { Button } from "./components/buttons.jsx";
import { useState } from "react";
import { loginUser, getCurrentUser } from "../services/authService.js";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLoginSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      alert("Enter a valid email..");
      return;
    }

    if (password.length < 8) {
      alert("Password must be Atleast of 8 characters");
      return;
    }

    const obj = {
      email: email,
      password: password,
    };

    try {
      const res = await loginUser(obj);
      localStorage.setItem("token", res.token);
      await getCurrentUser(localStorage.getItem("token"));
      alert("Login Successful!!!!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err.message);
      alert("Login Failed!");
    }
  }

  return (
    <>
      <form id="login-form" onSubmit={handleLoginSubmit}>
        <InputField
          field="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          fieldHeading="Registered Email Address"
          inputType="email"
          placeholder="Enter your email address"
          inputValidityText="We will never share or sell your email address."
          icon={AtSign}
        />
        <InputField
          field="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          fieldHeading="Account Password"
          inputType="password"
          placeholder="Create a password"
          inputValidityText="Give correct password"
          icon={Lock}
        />
        <Button text="Sign In To SafeCircle" icon={Shield} type="submit" />
        <div className="sign-in-option">
          New to SafeCircle?
          <a style={{ color: "#231691", fontWeight: "700" }}>
            Create your account
          </a>
        </div>
      </form>
    </>
  );
}

export function Login() {
  return (
    <>
      <NavbarUser />
      <div className="page-components">
        <HeroSection />
        <RegisterFormContainer
          header="MEMBER LOGIN"
          title="Welcome to your SafeCircle Account"
          form={LoginForm}
        />
      </div>
      <Footer />;
    </>
  );
}

export function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">SafeCircle</div>
      <div className="footer-description">
        ©2026 SafeCircle. End-to-end encrypted personal safety network. All
        rights reserved.
      </div>
    </div>
  );
}
