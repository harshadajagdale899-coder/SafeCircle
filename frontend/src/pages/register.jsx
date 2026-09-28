import logoImg from "./Images/logo-img.png";
import tagImg from "./Images/tag-img.png";

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

function SignIn() {
  return <div className="signIn-page">Sign In </div>;
}

export function Navbar() {
  return (
    <div className="navbar">
      <WebsiteBrand />
      <SignIn />
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

export function HeroSection() {
  return (
    <>
      <div className="hero-section-container">
        <div className="hero-container">
          <Tag text="Empowered personal Freedom" />
          <div id="message-container">
            <div className="hero-heading">Walk freely.</div>
            <div className="hero-heading" style={{ color: "#A4A1FF" }}>
              Never walk alone.
            </div>
            <div id="hero-des">
              SafeCircle connects you with trusted friends and family designed
              with absolute privacy.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
