import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { toast } from "react-toastify";
import OtpForm from "./OTPform";
import { SessionContext } from "../../../context/Session";

export const BG_URL =
  "https://railmadad.indianrailways.gov.in/madad/final/images/body-bg.jpg";

export async function requestOTP(phone) {
  // try {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_SERVER_URL}/api/auth/send-otp`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ phone }),
  //     }
  //   ).then((res) => res.json());
    
  //   return !!response.success;
  // } catch (error) {
  //   toast.error("something went wrong");
  //   console.log(error);
  //   return false;
  // }

  return true;
}

export default function Signin() {
  const [phone, setPhone] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const {revalidateSession} = useContext(SessionContext);

  const redirect = useNavigate();

  function closeOtpScreen() {
    setIsOtpSent(false);
  }

  function handlePhoneSubmit(phone) {
    setPhone(phone);
    setIsOtpSent(true);
  }

  async function handle_OTP_submit(otp) {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/signin`,{
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({phone, otp}),
        credentials: "include",
      }).then(res => res.json());

      if(response.success) {
        await revalidateSession();
        redirect("/", {replace: true});
        return null;
      } else {
        return response?.message || "An unexpected error occcured";
      }

    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
      return null;
    }
  }

  return (
    <main
      style={{ background: `url(${BG_URL})` }}
      className="min-h-screen p-4 w-full bg-cover bg-fixed bg-center bg-no-repeat flex items-center justify-center"
    >
      <div className="flex w-full max-w-md flex-col rounded-2xl border bg-white text-black p-4 sm:p-10 shadow-2xl">
        <a
          href="/"
          aria-label="Go to home"
          className="mx-auto mb-8 block max-w-max"
        >
          <h1 className="text-3xl text-rail-dark font-bold underline decoration-rail-dark">
            Rail Madad
          </h1>
        </a>

        <h2 className="mb-8 w-full text-center text-2xl font-semibold text-primary-500">
          Log in
        </h2>

        {isOtpSent ? (
          <OtpForm phone={phone} onChangePhoneClick={closeOtpScreen} onSubmit={handle_OTP_submit} />
        ) : (
          <LoginForm data={phone} setData={handlePhoneSubmit} />
        )}

        <Link className="mx-auto p-2 mb-4 hover:underline" to="/auth/signup">
          Signup?
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

function LoginForm({ data, setData }) {
  const [phone, setPhone] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  function handlePhoneChange(e) {
    if (e.currentTarget.value === "") {
      setPhone("");
      return;
    }

    const phone = Number.parseInt(e.currentTarget.value);

    if (isNaN(phone)) return;

    setPhone(phone.toString());
  }

  async function getOTP(e) {
    e.preventDefault();
    setIsLoading(true);

    const success = await requestOTP(phone);

    if(success) {
      toast.success("OTP sent");
      setData(phone);
    } else {
      toast.error("something went wrong");
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={getOTP} method="POST" className="mb-4 flex flex-col gap-5">
      <label>
        <h6 className="mb-1 text-sm text-gray-600">Mobile number</h6>
        <div className="relative w-full rounded bg-white">
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Enter mobile number"
            autoFocus
            required
            className="w-full p-3 rounded border border-zinc-200 focus:border-black focus:outline-none"
          />
        </div>
      </label>

      <Button disabled={isLoading} className="mt-2 font-semibold">
        {isLoading ? "Requesting OTP" : "Get OTP"}
      </Button>
    </form>
  );
}
