import logoImg from "./Images/logo-img.png";
import tagImg from "./Images/tag-img.png";
import { User, Info, AtSign, Lock, Shield, ArrowRight } from "lucide-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";

function WebsiteBrand() {
  return (
    <div id="branding-container">
      <img src={logoImg} alt="" />
      <div id="branding" className="naming-container">
        <div id="brand-name">SafeCircle</div>
        <div id="brand-des">TRUSTED NETWORK</div>
      </div>
    </div>
  );
}

export function Navbar() {
  return (
    <div className="navbar">
      <WebsiteBrand />
      <div className="signIn-page">Sign In </div>
    </div>
  );
}

function Tag({ text }) {
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
      <div id="registration-Page">
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
        <div className="register-form-container">
          <div className="new-member">NEW MEMBER REGISTRATION</div>
          <div className="title-name">Create your SafeCircle Account</div>
          <div className="title-decription">
            Because feeling safe should never be complicated. Keep your trusted
            people close, wherever life takes you.
          </div>
          <RegistrationForm />
          <div className="register-btn">
            <Shield />
            <div className="btn-txt">Create SafeCircle Account</div>
            <ArrowRight />
          </div>
          <div className="sign-in-option">
            Already have an active sanctuary?
            <a style={{ color: "#231691", fontWeight: "700" }}>
              Sign in to your account
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function RegistrationForm() {
  return (
    <>
      <div id="registeration-form">
        <InputField
          field="Name"
          fieldHeading="Full Name"
          inputType="text"
          placeholder="Enter your fullname"
          inputValidityText="Give your full name"
          icon={User}
        />
        <InputField
          field="Email"
          fieldHeading="Email Address"
          inputType="email"
          placeholder="Enter your email address"
          inputValidityText="We will never share or sell your email address."
          icon={AtSign}
        />
        <InputField
          field="Password"
          fieldHeading="Password"
          inputType="password"
          placeholder="Create a password"
          inputValidityText="Min 8 characters"
          icon={Lock}
        />
        <InputField
          field="ConfirmPassword"
          fieldHeading="Confirm Password"
          inputType="password"
          placeholder="Confirm your password"
          inputValidityText="Passwords must match"
          icon={Lock}
        />
      </div>
    </>
  );
}

function InputField({
  field,
  fieldHeading,
  inputType,
  placeholder,
  inputValidityText,
  icon: Icon,
}) {
  return (
    <div className="col-md-9 field">
      <label for={`input${field}`} className="form-label">
        {fieldHeading} <span style={{ color: "red" }}>*</span>
      </label>
      <div className="input-container">
        <Icon size={18} />
        <input
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
