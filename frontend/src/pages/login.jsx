import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import "./login.css";

import {
  Navbar,
  InputField,
  HeroSection,
  RegisterFormContainer,
} from "./register";
import { AtSign, Lock, Shield } from "lucide-react";
import { Button } from "./buttons";

function LoginForm() {
  return (
    <>
      <div id="login-form">
        <InputField
          field="Email"
          fieldHeading="Registered Email Address"
          inputType="email"
          placeholder="Enter your email address"
          inputValidityText="We will never share or sell your email address."
          icon={AtSign}
        />
        <InputField
          field="Password"
          fieldHeading="Account Password"
          inputType="password"
          placeholder="Create a password"
          inputValidityText="Give correct password"
          icon={Lock}
        />
        <div class="form-field">
          <input type="checkbox" id="fieldCheck" class="check" />
          <label for="fieldCheck">
            <div id="sign-in-message">
              Your safety comes first. We’ll automatically end your session
              after 45 minutes of inactivity to help protect your account
            </div>
          </label>
        </div>
        <Button text="Sign In To SafeCircle" icon={Shield} type="submit" />
        <div className="sign-in-option">
          New to SafeCircle?
          <a style={{ color: "#231691", fontWeight: "700" }}>
            Create your account
          </a>
        </div>
      </div>
    </>
  );
}

export function Login() {
  return (
    <>
      <Navbar />
      <div className="page-components">
        <HeroSection />
        <RegisterFormContainer
          header="MEMBER LOGIN"
          title="Welcome to your SafeCircle Account"
          form={LoginForm}
        />
      </div>
    </>
  );
}
