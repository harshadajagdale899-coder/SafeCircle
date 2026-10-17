import { ArrowRight } from "lucide-react";
import "./buttons.css";

export function Button({ text, icon: Icon, type }) {
  return (
    <button type={type} className="app-btn">
      {Icon && <Icon size={18} />}
      <div className="btn-txt">{text}</div>
      <ArrowRight />
    </button>
  );
}

export function SOS() {
  return (
    <div className="outer-transition">
      <div className="outer-round">
        <button className="inner-round">
          <h3>SOS</h3>
          <h4>Click Me!</h4>
        </button>
      </div>
    </div>
  );
}
