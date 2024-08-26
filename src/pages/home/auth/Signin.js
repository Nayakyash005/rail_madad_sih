import React from "react";
import { Link } from "react-router-dom";

export const BG_URL =
  "https://railmadad.indianrailways.gov.in/madad/final/images/body-bg.jpg";

export default function Signin() {
  return (
    <main
      style={{ background: `url(${BG_URL})` }}
      className="min-h-screen p-4 w-full bg-cover bg-fixed bg-center bg-no-repeat flex items-center justify-center"
    >
      <div className="flex w-full max-w-md flex-col rounded-2xl border bg-white text-black p-10 shadow-2xl">
        <a
          href="/"
          aria-label="Go to home"
          className="mx-auto mb-8 block max-w-max"
        >
          <h1 className="text-3xl font-bold underline decoration-zinc-800">
            Rail Madad
          </h1>
        </a>

        <h2 className="mb-8 w-full text-center text-2xl font-semibold text-primary-500">
          Log in
        </h2>

        <form
          action="api/auth/login?redirect=/"
          method="POST"
          className="mb-4 flex flex-col gap-5"
        >
          <label>
            <h6 className="mb-1 text-sm text-gray-600">Mobile number</h6>
            <div className="relative w-full rounded bg-white">
              <input
                type="text"
                placeholder="Enter mobile number"
                autofocus
                required
                className="w-full p-3 rounded border border-zinc-200 focus:border-black focus:outline-none"
              />
            </div>
          </label>
          <button className="bg-zinc-800 hover:bg-black p-2 font-semibold rounded text-white">Get OTP</button>
        </form>

        <Link className="mx-auto p-2 mb-4 hover:underline" to="/auth/signup">Signup?</Link>

        <p className="text-center text-sm text-zinc-600">By clicking Login you are acception our <br /><Link className="hover:underline" to="/terms"><b>terms & conditions</b></Link>.</p>
      </div>
    </main>
  );
}
