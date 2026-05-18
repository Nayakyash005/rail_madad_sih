import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#7B1034] text-white mt-10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-center md:text-left">
            Copyright ©2019 RAILMADAD. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="/" className="hover:underline">
              Home
            </a>

            <a href="/" className="hover:underline">
              FAQs
            </a>

            <a href="/" className="hover:underline">
              Railway Admin Login
            </a>

            <a href="/" className="hover:underline">
              MIS Report Login
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
