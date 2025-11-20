import React from "react";
import "../css/InfoCard.css";

const InfoCard = ({ icon, label, value }) => {
  return (
    <div className="dashboard-stats-card">
      <div className="icon-section">{icon}</div>
      <div className="stats-info">
        <h6>{label}</h6>
        <span>${value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
