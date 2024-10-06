import React from 'react'
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

export const BG_URL = "https://railmadad.indianrailways.gov.in/madad/final/images/body-bg.jpg";

export default function Layout() {
  return (
    <div>
      <img
        className="fixed object-cover top-0 left-0 h-screen w-screen -z-10"
        src={BG_URL}
        alt=""
      />
      <Navbar />
      <Outlet />
    </div>
  );
}
