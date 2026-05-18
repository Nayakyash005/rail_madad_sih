import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import ImageUpload from "../../components/ComplaintImage/ImageUpload";
import { toast } from "react-toastify";
import axios from "axios";
import Body from "../../components/Body";
import Footer from "../../components/Footer";

function ComplaintForm({ setShowChatbot }) {
  const [image, setimage] = useState(null);
  const [description, setDescription] = useState("");
  const [pnr, setPnr] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [complaintData, setComplaintData] = useState(null);
  const [humanLoading, setHumanLoading] = useState(false);
  const [llm_tried, setLlmTried] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let body = {
        description,
        pnr,
        image,
      };
      console.log("body is ", body);
      body = { ...body, llm_tried: false };
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/complaints/done`,
        body,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      console.log("responce is ", res);
      const responseData = res.data?.data ?? {};
      setComplaintData(responseData);
      setConfirmationOpen(true);
    } catch (error) {
      toast.error(`Error occur`);
      console.log("error is ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleFile = (e) => {
    setimage(e);
  };

  const handleAgree = async () => {
    // if (!complaintData?.complaintId) return;
    setConfirmationOpen(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/complaints/human-response`,
        {
          agree: true,
          complaintData,
        },
        {
          withCredentials: true,
        },
      );
      setLlmTried(false);
      toast.success("Complaint submitted succesfully");
      console.log("Complaint ID:", res);
      setShowChatbot(res.data.data.complaintId);
    } catch (error) {
      console.error("Error in conenecting to server", error);
    }
  };

  const handleNotAgree = async () => {
    // if (!complaintData?.complaintId) return;
    setHumanLoading(true);
    try {
      const body = {
        description,
        pnr,
        image,
      };
      setConfirmationOpen(false);
      if (!llm_tried) {
        console.log("requiesting llm for the classification of complaint");
        toast.info("Requesting LLM response, please wait...");
        await checkLLm(body);
      } else {
        console.log("Calling human response API with complaint ID:");
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/complaints/human-response`,
          {
            agree: false,
            complaintData,
          },
          {
            withCredentials: true,
          },
        );

        toast.warn("Please check details again");
        setLlmTried(false);
      }
    } catch (error) {
      console.error("Human response error:", error);
      toast.error("Unable to request human review.");
    } finally {
      setHumanLoading(false);
    }
  };

  const checkLLm = async (body) => {
    try {
      setLlmTried(true);
      body = { ...body, llm_tried: true };
      const llm_response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/complaints/done`,
        body,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      const responseData = llm_response.data?.data ?? {};
      setComplaintData(responseData);
      setConfirmationOpen(true);
    } catch (error) {
      console.error("llm response error:", error);
      toast.error("Unable to request llm response.");
    }
  };
  return (
    <>
      <form className="p-4 sm:p-6 md:p-8 mt-4 border border-gray-200 rounded-2xl shadow-sm bg-white text-black flex flex-col gap-5 w-full max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl text-[#7B1034] font-semibold">
          Grievance Detail
        </h1>

        <label htmlFor="pnr-input">
          <h3 className="text-sm font-medium text-gray-700 mb-2">PNR number</h3>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#7B1034]/20 focus:border-[#7B1034] transition appearance-none"
            id="pnr-input"
            name="pnr"
            type="number"
            onChange={(e) => setPnr(e.target.value)}
          />
        </label>

        <ImageUpload onChange={handleFile} value={image || null} />

        <label htmlFor="description">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Description
          </h3>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-3 min-h-[140px] outline-none focus:ring-2 focus:ring-[#7B1034]/20 focus:border-[#7B1034] transition resize-none"
            name="description"
            id="description"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full sm:w-fit sm:self-end bg-[#7B1034] hover:bg-[#5f0c28] text-white px-8 py-3 rounded-lg text-base"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      {confirmationOpen && complaintData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/10">
            <h2 className="text-xl font-semibold text-slate-900">
              Confirm detected complaint
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Please verify the complaint and category before proceeding.
            </p>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                  Complaint ID
                </p>
                <p className="mt-1 font-medium text-slate-900">
                  {complaintData.complaintId}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                  Category
                </p>
                <p className="mt-1 font-medium text-slate-900">
                  {complaintData.category || "Not available"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                  Subcategory
                </p>
                <p className="mt-1 font-medium text-slate-900">
                  {complaintData.subcategory || "Not available"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 sm:w-auto"
                onClick={handleNotAgree}
                disabled={humanLoading}
              >
                {humanLoading ? "Requesting..." : "Not agree"}
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
                onClick={handleAgree}
                disabled={loading || humanLoading}
              >
                Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  const navigate = useNavigate();

  function showChatbot(complaintId) {
    console.log("Navigating to chatbot with complaint ID:", complaintId);
    navigate("/my-complaints/" + complaintId);
  }

  return (
    <>
      <main className="w-full flex flex-col">
        <div className="w-full min-h-screen flex-grow mx-auto max-w-5xl px-3 sm:px-4 md:px-8">
          <ComplaintForm setShowChatbot={showChatbot} />
        </div>
      </main>
      <Footer />
    </>
  );
}
