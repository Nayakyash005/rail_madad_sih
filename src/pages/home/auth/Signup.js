import React, { useState } from "react";
import { BG_URL } from "./Signin";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import OtpForm from "./OTPform";
import { toast } from "react-toastify";

export default function Signup() {
  const [data, setData] = useState();
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  async function saveData(data) {
    console.log(data);

    setData(data);
    setShowOtp(true);

    return null;
  }

  async function Handle_otp_submit(otp) {
    console.log({data, otp});
    // TODO: request backend to veriefy otp, create user, login user.
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/signup`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...data, otp}),
      credentials: "include",
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err);
      return {success: false, message: "something went wrong"};
    });

    console.log(response);

    if(response.success) {
      navigate("/", {replace: true});
    } else {
      toast.error(response.message);
    }
  }

  return (
    <main
      style={{ background: `url(${BG_URL})` }}
      className="min-h-screen w-full p-4 bg-cover bg-fixed bg-center bg-no-repeat flex items-center justify-center"
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
          Signup
        </h2>

        {showOtp ? <OtpForm phone={data.phone} onChangePhoneClick={() => setShowOtp(false)} onSubmit={Handle_otp_submit} /> : <SignUpForm defaultData={data} onSubmit={saveData} />}

        <Link className="mx-auto p-2 mb-4 hover:underline" to="/auth/signin">
          Log in?
        </Link>

        <p className="text-center text-sm text-zinc-600">
          By clicking Login you are acception our <br />
          <Link className="hover:underline" to="/terms">
            <b>terms & conditions</b>
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

/**
 * @param {{
 * defaultData: {
*   firstName: string,
*   lastName: string,
*   phone: string,
* }
 * onSubmit({
 *   firstName: string,
 *   lastName: string,
 *   phone: string,
 * }) => Promise<void>}}param0 
 * @returns 
 */
function SignUpForm({
  defaultData = {
    firstName: "",
    lastName: "",
    phone: "",
  },
  onSubmit,
}) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);

  function HandleChange(e) {
    setData(p => ({...p, [e.target.name]: e.target.value}));
  }

  async function HandleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const error = await onSubmit(data);
    if(error) {
      seterror(error);
    }

    setLoading(false);
  }

  return (
    <form
      className="mb-4 flex flex-col gap-4"
      onSubmit={HandleSubmit}
    >
      <label>
        <h6 className="mb-1 text-sm text-gray-600">First name</h6>
        <div className="relative w-full rounded bg-white">
          <input
            className="w-full p-3 rounded border border-zinc-200 focus:border-black focus:outline-none"
            placeholder="Enter first name"
            name="firstName"
            value={data.firstName}
            type="text"
            onChange={HandleChange}
            required
            />
        </div>
      </label>

      <label>
        <h6 className="mb-1 text-sm text-gray-600">Last name</h6>
        <div className="relative w-full rounded bg-white">
          <input
            className="w-full p-3 rounded border border-zinc-200 focus:border-black focus:outline-none"
            placeholder="Enter last name"
            name="lastName"
            value={data.lastName}
            type="text"
            onChange={HandleChange}
            required
          />
        </div>
      </label>

      <label>
        <h6 className="mb-1 text-sm text-gray-600">Mobile number</h6>
        <div className="relative w-full rounded bg-white">
          <input
            className="w-full p-3 rounded border border-zinc-200 focus:border-black focus:outline-none"
            placeholder="Enter mobile number"
            name="phone"
            value={data.phone}
            type="text"
            onChange={HandleChange}
            required
          />
        </div>
      </label>
      
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <Button disabled={loading} className="mt-2 font-semibold">Submit</Button>
    </form>
  );
}
