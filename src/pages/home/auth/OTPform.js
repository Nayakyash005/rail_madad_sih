import React,{ useState } from "react";
import { requestOTP } from "./Signin";
import { toast } from "react-toastify";
import { Button } from "../../../components/ui/Button";

/**
 * verify otp in `onSubmit` function and retuen error message to display if any.
 * @param {{onSubmit(otp:string) => Promise<string | null>, phone:string, onChangePhoneClick() => void}} param0 
 * @returns 
 */
export default function OtpForm({ phone, onChangePhoneClick, onSubmit }) {
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
  
      const error = await onSubmit(otp);
  
      if(error) setError(error);
  
      setIsLoading(false);
    }
  
    async function getOTP() {
      const success = await requestOTP(phone);
  
      if(success) {
        toast.success("OTP sent");
        allowResendOtp();
      } else {
        toast.error("something went wrong");
      }
    }
  
    return (
      <form
        onSubmit={verifyOTP}
        method="POST"
        className="mb-4 space-y-5"
      >
        <label>
          <h6 className="text-center mb-4 text-sm text-gray-600">
            Enter OTP sent to <br />
            <b>{phone}</b> or{" "}
            <a
              className="hover:underline font-bold p-0 m-0"
              onClick={onChangePhoneClick}
            >
              change?
            </a>
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
  
        {error && <p className="text-red-600 text-sm">{error}</p>}
  
        <Button disabled={isLoading} className="mt-2 w-full font-semibold">
          {isLoading ? "Veriefying OTP" : "Veriefy"}
        </Button>
  
        {error && (
          <button
            className="disabled:opacity-50 disabled:cursor-not-allowed block mx-auto"
            disabled={waitTime > 0}
            type="button"
            onClick={getOTP}
          >
            <b>Resend OTP? </b>
            {waitTime > 0 ? <span>in {waitTime}s</span> : ""}
          </button>
        )}
      </form>
    );
  }
  
