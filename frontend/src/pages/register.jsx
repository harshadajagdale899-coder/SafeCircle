import logoImg from "./Images/logo-img.png";
import tagImg from "./Images/tag-img.png";
import { User, Info, AtSign, Lock, Shield } from "lucide-react";
import { Button } from "./components/buttons.jsx";
import { registerUser } from "../services/authService.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import { useState } from "react";
import { Footer } from "./login.jsx";
import { useNavigate } from "react-router-dom";

export function WebsiteBrand() {
  return (
    <div id="branding-container">
      <img src={logoImg} alt="" />
      <div id="branding" className="naming-container">
        <div id="brand-name">SafeCircle</div>
        <div id="brand-des">YOUR SAFETY, YOUR CIRCLE</div>
      </div>
    </div>
  );
}

export function NavbarUser() {
  return (
    <div className="navbar">
      <WebsiteBrand />
      <div className="signIn-page">Sign In </div>
    </div>
  );
}

export function Tag({ text }) {
  return (
    <div className="tag">
      <img src={tagImg} alt="" />
      <div>{text}</div>
    </div>
  );
}

function Card({ title, para }) {
  return (
    <div className="card-container">
      <div className="title">{title}</div>
      <div className="para">{para}</div>
    </div>
  );
}

export function HeroSection() {
  return (
    <>
      <div className="hero-section-container">
        <div className="hero-container">
          <Tag text="Empowered personal Freedom" />
          <div id="message-container">
            <div className="hero-heading">Walk freely.</div>
            <div
              className="hero-heading"
              style={{ color: "#A4A1FF", marginTop: "-10px" }}
            >
              Never walk alone.
            </div>
            <div id="hero-des">
              SafeCircle connects you with trusted friends and family designed
              with absolute privacy.
            </div>
          </div>
          <div id="hero-card-container">
            <Card
              title="1. 🚨Instant SOS Tigger"
              para="Get help when you need it most. Trigger an SOS alert with your live location and instantly notify your trusted contacts."
            />
            <Card
              title="2. 🛡️Trusted Contacts"
              para="Your people, always within reach. Add family, friends, or guardians who can receive your emergency alerts and location."
            />
            <Card
              title="3. 📍 SOS History"
              para="Stay informed about your safety. Keep track of your previous SOS alerts, including their location, time, and status."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function RegisterFormContainer({ header, title, form: Form }) {
  return (
    <div className="register-form-container">
      <div className="new-member">{header}</div>
      <div className="title-name">{title}</div>
      <div className="title-decription">
        Because feeling safe should never be complicated. Keep your trusted
        people close, wherever life takes you.
      </div>
      <Form />
    </div>
  );
}

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !email || !password || !conPassword) {
      alert("Fill All mandatory fields");
      return;
    }
    if (password.length < 8) {
      alert("Password must atleast have 8 characters.");
      return;
    }
    if (password !== conPassword) {
      alert("Password does not match");
      return;
    }
    const obj = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const res = await registerUser(obj);
      console.log(res);
      alert("New User Registered Sucessfully. Proceed to Login....");
      navigate("/login");
    } catch (err) {
      console.log(err.message);
      alert("Registration Failed!!");
    }
  }

  return (
    <>
      <form id="registeration-form" onSubmit={handleSubmit}>
        <InputField
          field="Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          fieldHeading="Full Name"
          inputType="text"
          placeholder="Enter your fullname"
          inputValidityText="Give your full name"
          icon={User}
        />
        <InputField
          field="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          fieldHeading="Email Address"
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
          fieldHeading="Password"
          inputType="password"
          placeholder="Create a password"
          inputValidityText="Min 8 characters"
          icon={Lock}
        />
        <InputField
          field="ConfirmPassword"
          value={conPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
          fieldHeading="Confirm Password"
          inputType="password"
          placeholder="Confirm your password"
          inputValidityText="Passwords must match"
          icon={Lock}
        />
        <Button text="Create SafeCircle Account" icon={Shield} type="submit" />
        <div className="sign-in-option">
          Already have an active sanctuary?
          <a style={{ color: "#231691", fontWeight: "700" }}>
            Sign in to your account
          </a>
        </div>
      </form>
    </>
  );
}

export function InputField({
  field,
  value,
  onChange,
  fieldHeading,
  inputType,
  placeholder,
  inputValidityText,
  icon: Icon,
}) {
  return (
    <div className="col-md-9 field">
      <label htmlFor={`input${field}`} className="form-label">
        {fieldHeading} <span style={{ color: "red" }}>*</span>
      </label>
      <div className="input-container">
        <Icon size={18} />
        <input
          value={value}
          onChange={onChange}
          type={inputType}
          className="form-control"
          id={`input${field}`}
          placeholder={placeholder}
        />
      </div>
      <div className="input-validity-container">
        <Info size={12} />
        <div className="input-validity">{inputValidityText}</div>
      </div>
    </div>
  );
}

export function Registration() {
  return (
    <>
      <NavbarUser />
      <div className="page-components">
        <HeroSection />
        <RegisterFormContainer
          header="NEW MEMBER REGISTRATION"
          title="Create your SafeCircle Account"
          form={RegistrationForm}
        />
      </div>
      <Footer />
    </>
  );
}
