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
