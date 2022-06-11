import React, { useEffect } from 'react';

import { earningData} from '../data/dummy';
import { useDispatch, useSelector } from "react-redux";
import { dashboardData } from "../redux/actions/dashboard.js"

const Dashboard = () => {
  const dispatch = useDispatch()

  const data = useSelector((state) => state.dashboard)

  const { loading, error, allData } = data

  useEffect(() => {
    dispatch(dashboardData())
  }, [dispatch])

  return (
    <div className="mt-24">
    {loading ? 'loading...' : (
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Total Customers</p>
              <p className="text-2xl">{allData?.totalCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Total Staffs</p>
              <p className="text-2xl">{allData?.totalStaffs}</p>
            </div>
          </div>
        </div>
        
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {earningData[0].icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">#{allData?.totalSavings[0]?.total_savings}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{earningData[0].title}</p>
            </div>
            
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {earningData[0].icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">#{allData?.totalWithdrawals[0]?.total_withdrawals}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Withdrawals</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {earningData[0].icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">#{allData?.totalLoans[0]?.total_loans}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Loans</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {earningData[0].icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">#{allData?.totalCustomerBalance}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Customer Balance</p>
            </div>

        </div>
      </div>
      )}
    </div>
  );
};

export default Dashboard;
