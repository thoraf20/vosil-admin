import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';

import { logout } from '../redux/actions/login.js'
const UserProfile = () => {
  const { currentColor } = useStateContext();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    dispatch(logout())
    console.log("clicked")
    navigate("/login", {replace: true});
  }

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-end items-center">
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      
      <div className="mt-3">
        <button
          type="button"
          onClick={handleLogout}
          style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
          className={` text-x p-3 w-full hover:drop-shadow-xl hover:bg-red`}
        >
          Logout
        </button>
      </div>
    </div>

  );
};

export default UserProfile;
