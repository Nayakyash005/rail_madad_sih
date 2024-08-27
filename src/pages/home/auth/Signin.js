import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { toast } from "react-toastify";

export const BG_URL =
  "https://railmadad.indianrailways.gov.in/madad/final/images/body-bg.jpg";

export default function Signin() {
  const [phone, setPhone] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  function hideOtpScreen() {
    setShowOtpScreen(false);
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
          <h1 className="text-3xl font-bold underline decoration-zinc-800">
            Rail Madad
          </h1>
        </a>

        <h2 className="mb-8 w-full text-center text-2xl font-semibold text-primary-500">
          Log in
        </h2>

        {showOtpScreen ? (
          <OtpForm
            data={{phone}}
            goBack={hideOtpScreen}
          />
        ) : (
          <LoginForm phone={phone} setPhone={setPhone} setShowOtpScreen={setShowOtpScreen} />
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

function LoginForm({ phone, setPhone, setShowOtpScreen }) {
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

    try {
      setIsLoading(true);
      // const response = await fetch(
      //   `${process.env.REACT_APP_SERVER_URL}/api/auth/send-otp`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ phone }),
      //   }
      // ).then((res) => res.json());
      // console.log(response);
      // if (response.success) {
      setShowOtpScreen(phone);
      //   toast.success(response.message);
      // } else {
      //   toast.error(response.message);
      // }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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

function OtpForm({ data, goBack }) {
  const [OTP, setOTP] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [waitTime, setWaitTime] = useState(0);

  function allowResendOtp() {
    setWaitTime(30);

    const Foo = () => {
      setWaitTime((p) => {
        const newTime = p - 1;
        if (newTime <= 0 && global.T) clearInterval(global.T);
        console.log(newTime);
        return newTime;
      });
    };

    if(global.T) {
      clearInterval(global.T);
    }
    global.T = setInterval(Foo, 1000);
  }

  function handleInputChange(e, index) {
    switch (e.key) {
      case "ArrowLeft":
        e.currentTarget.previousElementSibling?.focus();
        break;

      case "ArrowRight":
        e.currentTarget.nextElementSibling?.focus();
        break;

      case "Backspace":
        e.currentTarget.previousElementSibling?.focus();
      case "Delete":
        setOTP((prev) => {
          prev[index] = "";
          return [...prev];
        });
        break;

      default:
        if (isNaN(Number.parseInt(e.key))) return;
        if (OTP[index] !== "" && index < 5) index++;

        setOTP((prev) => {
          prev[index] = e.key;
          return [...prev];
        });

        e.currentTarget.nextElementSibling?.focus();
    }
  }

  async function verifyOTP(e) {
    e.preventDefault();
    setIsLoading(true);

    const otp = OTP.join("");
    console.log("otp", otp);

    if (isNaN(+otp)) return;

    try {
      
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/verify-otp`,{
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({...data, otp: OTP}),
      }).then(res => res.json());
      
      if(response.success) {
        toast.success(response.message);
      } else {
        setError(response?.message || "An unexpected error occcured");
        allowResendOtp();
      }

    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={verifyOTP}
      method="POST"
      className="mb-4 flex flex-col gap-5"
    >
      <label>
        <h6 className="text-center mb-4 text-sm text-gray-600">
          Enter OTP sent to <br />
          <b>{data.phone}</b> or{" "}
          <button
            className="hover:underline"
            type="button"
            onClick={goBack}
          >
            <b>change</b>
          </button>
        </h6>
        <div className="grid gap-2 grid-cols-6 items-center justify-center relative w-full rounded bg-white">
          <input
            className="w-full aspect-square text-center max-w-12 p-2 rounded border border-zinc-200 focus:border-black focus:outline-none"
            onKeyDown={(e) => handleInputChange(e, 0)}
            value={OTP[0]}
            required
            autoFocus
            type="text"
          />
          <input
            className="w-full aspect-square text-center max-w-12 p-2 rounded border border-zinc-200 focus:border-black focus:outline-none"
            onKeyDown={(e) => handleInputChange(e, 1)}
            value={OTP[1]}
            required
            type="text"
          />
          <input
            className="w-full aspect-square text-center max-w-12 p-2 rounded border border-zinc-200 focus:border-black focus:outline-none"
            onKeyDown={(e) => handleInputChange(e, 2)}
            value={OTP[2]}
            required
            type="text"
          />
          <input
            className="w-full aspect-square text-center max-w-12 p-2 rounded border border-zinc-200 focus:border-black focus:outline-none"
            onKeyDown={(e) => handleInputChange(e, 3)}
            value={OTP[3]}
            required
            type="text"
          />
          <input
            className="w-full aspect-square text-center max-w-12 p-2 rounded border border-zinc-200 focus:border-black focus:outline-none"
            onKeyDown={(e) => handleInputChange(e, 4)}
            value={OTP[4]}
            required
            type="text"
          />
          <input
            className="w-full aspect-square text-center max-w-12 p-2 rounded border border-zinc-200 focus:border-black focus:outline-none"
            onKeyDown={(e) => handleInputChange(e, 5)}
            value={OTP[5]}
            required
            type="text"
          />
        </div>
      </label>

      {error && <p className="text-red-600">{error}</p>}

      <Button disabled={isLoading} className="mt-2 font-semibold">
        {isLoading ? "Veriefying OTP" : "Veriefy"}
      </Button>

      {error && (
        <button
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={waitTime > 0}
        >
          <b>Resend OTP? </b>
          {waitTime > 0 ? <span>in {waitTime}s</span> : ""}
        </button>
      )}
    </form>
  );
}
