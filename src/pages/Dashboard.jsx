import React, { useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { dashboardData } from "../redux/actions/dashboard.js"
import { formatCurrency } from '../utils';

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
              <p className="text-2xl">{allData?.totalCustomers ? allData?.totalCustomers : 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Total Staffs</p>
              <p className="text-2xl">{allData?.totalStaffs ? allData?.totalStaffs : 0}</p>
            </div>
          </div>
        </div>
        
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              {/* <button
                type="button"
                style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {earningData[0].icon}
              </button> */}
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalSavings ? allData?.totalSavings : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Savings</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              {/* <button
                type="button"
                style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {earningData[0].icon}
              </button> */}
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalCurrentMonthSavings ? allData?.totalCurrentMonthSavings : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Current Month Savings</p>
            </div>
            
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalWithdrawals ? allData?.totalWithdrawals : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Withdrawals Balance</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              {/* <button
                type="button"
                style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {earningData[0].icon}
              </button> */}
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalCurrentMonthWithdrawals ? allData?.totalCurrentMonthWithdrawals : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Current Month Withdrawals</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalLoans ? allData?.totalLoans : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Loans Balance</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalCurrentMonthLoans ? allData?.totalCurrentMonthLoans : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Current Month Loans</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalCustomerBalance ? allData?.totalCustomerBalance : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Customer Balance</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalCurrentMonthCustomerBalance ? allData?.totalCurrentMonthCustomerBalance : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Current Month Customer Balance</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalExcess ? allData?.totalExcess : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Excess Balance</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalCurrentMonthExcess ? allData?.totalCurrentMonthExcess : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Current Month Excess</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalInterests ? allData?.totalInterests : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Loan Interest</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalCurrentMonthInterests ? allData?.totalCurrentMonthInterests : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Current Month Loan Interest</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalIncome ? allData?.totalIncome : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Savings Income</p>
            </div>

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {formatCurrency(allData?.totalCurrentMonthIncome ? allData?.totalCurrentMonthIncome : 0)}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Current Month Savings Income</p>
            </div>
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                // style={{ color: earningData[0].iconColor, backgroundColor: earningData[0].iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {/* {earningData[0].icon} */}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                {
                  formatCurrency(allData?.totalIncome + allData?.totalInterests)
                }
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Income</p>
            </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Dashboard;
