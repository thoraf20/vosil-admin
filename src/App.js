import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Savings, Withdrawal, Loans, Employees, Customers, Dashboard, CustomerDetails } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import { LoginForm } from './authentication';

import IndividualSavings from './pages/savings/individualSavingDetails';
import Settings from './pages/Settings';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
    
      <BrowserRouter>

      <Routes>
      <Route path="/login" element={(<LoginForm />)} />
      </Routes>

        <div className="flex relative dark:bg-main-dark-bg">
          <>
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-60 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

            </>
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
          
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
         
            <div>
              {themeSettings && (<ThemeSettings />)}

             <Routes> 

                {/* dashboard  */}
                <Route path="/" element={(<Dashboard />)} />
                <Route path="/overview" element={(<Dashboard />)} />

                {/* pages  */}
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/:id" element={<CustomerDetails />} />

                <Route path="/savings" element={<Savings />} />
                <Route path="/savings/:acc" element={<IndividualSavings />} />
                
                <Route path="/withdrawals" element={<Withdrawal />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/loans/name" element={''} />

                <Route path="/staffs" element={<Employees />} />
                <Route path="/settings" element={<Settings />} />

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
