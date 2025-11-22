import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../../cards/InfoCard";
import { addThousandSeparator } from "../../utils/helper";
import "../../css/Home.css";
import RecentTransactions from "../../components/DashboardTransactions/RecentTransactions";
import FinanceOverView from "../../components/DashboardTransactions/FinanceOverView";

function Home() {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    return () => {};
  }, []);

  return (
    <DashBoardLayout activeMenu={"Dashboard"}>
      <div className="dashboard-section">
        <div className="homepage-stats">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            className="balance-card"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            className="income-card"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandSeparator(dashboardData?.totalExpenses || 0)}
            // color="red"
            className="expense-card"
          />
        </div>
        <div className="homepage-transactions">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <div className="finacial-overview">
            <FinanceOverView
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />
            
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
}

export default Home;
