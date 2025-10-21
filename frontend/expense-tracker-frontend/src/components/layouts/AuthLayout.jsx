import React from "react";
import hero_image from "../../assets/images/b2.webp";
import trending_up_down from "../../assets/images/trending-up (3).svg";
import "../../css/AuthLayout.css";

export const AuthLayout = ({ children }) => {
  return (
    <div className="auth-main-section">
      <div className="auth-left-section">
        <h2 className="auth-left-section-header">Expense Tracker</h2>
        <div className="first-box-section"></div>
        <div className="second-box-section"></div>
        

        <div className="statsInfoCard">
          <StatsInfoCard
            icon={<img src={trending_up_down} alt="" />}
            label="Track your income and expenses"
            value="650,000"
          />
        </div>

        {/* adding professional marquee tags */}
        <div className="marquee">
          <div className="marquee-content">
            💰 Track today, save tomorrow! 💸 Control your expenses, shape your
            future. 📊 Spend smarter. Live better.
          </div>
        </div>

        <div className="hero-section">
          <img src={hero_image} alt="" className="hero-image" />
        </div>
      </div>
      <div className="auth-right-section">{children}</div>
    </div>
  );
};

const StatsInfoCard = ({ icon, label, value }) => {
  return (
    <div className="stats-card">
      <div className="icon">{icon}</div>
      <div className="stats-card-info">
        <h6>{label}</h6>
        <span>${value}</span>
      </div>
    </div>
  );
};
