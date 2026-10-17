import { WebsiteBrand } from "../register";
import "../components/navbar.css";
import { House, UserGroup, ShieldCheck, User, ChevronDown } from "lucide-react";

function Menu({ label, icon: Icon }) {
  return (
    <div className="menu-container">
      <div className="menu-icon">
        <Icon size={19} />
      </div>
      <div className="menu">{label}</div>
    </div>
  );
}

export function Navbar() {
  return (
    <div className="navbar-container">
      <WebsiteBrand />
      <div className="nav-menu">
        <Menu label="Dashboard" icon={House} />
        <Menu label="Trusted Contacts" icon={UserGroup} />
        <Menu label="Safety Tips" icon={ShieldCheck} />
        <Menu label="My Profile" icon={User} />
      </div>
      <div className="user-profile-container">
        <div className="user-profile">HJ</div>
        <div className="profile-icon">
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}
