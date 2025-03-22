import React, { useEffect, useState } from 'react';
import Components from '../../theme-ui/master-file';
import { GetDashboardData } from '../../services/dashboard';
import { formatCurrency } from '../../components/utils'
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await GetDashboardData();
        console.log(response.data)
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Components.Card className="shadow-lg rounded-xl bg-white p-4">
          <Components.CardContent>
            <p className="text-sm text-gray-500">Total Balance</p>
            <h2 className="text-xl font-bold text-green-600">₹{formatCurrency(dashboardData?.balance)}</h2>
          </Components.CardContent>
        </Components.Card>

        <Components.Card className="shadow-lg rounded-xl bg-white p-4">
          <Components.CardContent>
            <p className="text-sm text-gray-500">Total Income</p>
            <h2 className="text-xl font-bold text-blue-600">₹{formatCurrency(dashboardData?.totalIncome)}</h2>
          </Components.CardContent>
        </Components.Card>

        <Components.Card className="shadow-lg rounded-xl bg-white p-4">
          <Components.CardContent>
            <p className="text-sm text-gray-500">Total Expenses</p>
            <h2 className="text-xl font-bold text-red-600">₹{formatCurrency(dashboardData?.totalExpenses)}</h2>
          </Components.CardContent>
        </Components.Card>

        <Components.Card className="shadow-lg rounded-xl bg-white p-4">
          <Components.CardContent>
            <p className="text-sm text-gray-500">Total Savings</p>
            <h2 className="text-xl font-bold text-purple-600">₹{formatCurrency(dashboardData?.totalSavings)}</h2>
          </Components.CardContent>
        </Components.Card>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Components.Card className="shadow-lg rounded-xl bg-white p-4">
          <h3 className="text-lg font-semibold mb-2">Expense Breakdown</h3>
         
        </Components.Card>

      </div>
    </div>
  );
};

export default Dashboard;
