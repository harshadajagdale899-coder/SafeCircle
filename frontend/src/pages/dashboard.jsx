import { Navbar } from "./components/navbar.jsx";
import { Footer } from "./login.jsx";
import "./dashboard.css";
import welcomeImg from "./Images/welcoome-img.png";
import {
  Siren,
  Pointer,
  ShieldUser,
  MapPin,
  Lightbulb,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService.js";
import { useNavigate } from "react-router-dom";

function WelcomeCard({ name }) {
  return (
    <div className="welcome-card-container">
      <div className="welcome">
        <div className="welcome-heading">Welcome , {name}!</div>
        <div className="welcome-message">
          Your safety matters. Stay connected with the people you trust through
          discrete encrypted check-ins and mutual guardian awareness.
        </div>
      </div>
      <div className="welcome-img">
        <img src={welcomeImg} alt="" />
      </div>
    </div>
  );
}

function SOSTigger() {
  return (
    <div className="sos-tigger-container">
      <div className="need-help-container">
        <div className="need-help-title">Need help right now?</div>
        <div className="need-help-desc">
          Activating SOS instantly shares your live coordinates and alerts all
          your trusted contacts via SMS and push notification without waking
          your phone lock screen.
        </div>
      </div>
      <div className="sos-container">
        <div className="sos-button">
          <div className="sos-icon">
            <Siren size={22} />
          </div>
          Emergency SOS
        </div>
        <div className="sos-message-container">
          <Pointer size={13} />
          <div className="sos-message">Press to Tigger</div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, desc, btnText }) {
  return (
    <div className="dashboard-card-container">
      <div className="dashboard-card-icon">
        <Icon size={25} />
      </div>
      <div className="dashboard-card-title">{title}</div>
      <div className="dashboard-card-desc">{desc}</div>
      <button className="dashboard-card-btn">{btnText}</button>
    </div>
  );
}

export function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function FetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const userData = await getCurrentUser(token);
        setUser(userData);
      } catch (err) {
        console.log(err.message);
        if (err.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError("Unable to load your profile. Please try again...");
      } finally {
        setLoading(false);
      }
    }

    FetchUser();
  }, [navigate]);
  if (loading) {
    return <p>Loading Dashboard</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <Navbar />
      <WelcomeCard name={user?.name} />
      <SOSTigger />
      <div id="dashboard-cards">
        <Card
          icon={ShieldUser}
          title="Trusted Contacts"
          desc="Manage your personal safety network by adding the people you trust the most. Keep their contact details organized and easily accessible whenever you need assistance or support."
          btnText="View Contacts"
        />
        <Card
          icon={MapPin}
          title="Safety Check-in"
          desc="Let your loved ones know you’re safe while travelling, commuting, or returning home. Share your journey and keep your trusted contacts informed about your safety along the way."
          btnText="View Check-ins"
        />
        <Card
          icon={Lightbulb}
          title="Safety Tips"
          desc="Explore practical safety advice, emergency precautions, and helpful self-protection strategies. Learn how to recognize potential risks, stay alert in unfamiliar surroundings, and make safer decisions every day."
          btnText="View Safety Tips"
        />
        <Card
          icon={User}
          title="My Profile"
          desc="Keep your personal information and account details up to date in one convenient place. Review and manage your profile to ensure your SafeCircle account reflects your current information."
          btnText="View Profile"
        />
      </div>
      <Footer />
    </>
  );
}
