import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import ImageUpload from "../../components/ComplaintImage/ImageUpload";
import { toast } from "react-toastify";
import axios from "axios";
import Body from "../../components/Body";

function ComplaintForm({ setShowChatbot }) {
  const [image, setimage] = useState(null);
  const [description, setDescription] = useState("");
  const [pnr, setPnr] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [complaintData, setComplaintData] = useState(null);
  const [humanLoading, setHumanLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        description,
        pnr,
        image,
      };
      console.log("body is ", body);
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
      setComplaintData({
        complaintId: responseData.complaintId,
        category: responseData.category,
        subcategory: responseData.subcategory,
      });
      setConfirmationOpen(true);
    } catch (error) {
      toast.error("Error accur");
      console.log("error is ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleFile = (e) => {
    setimage(e);
  };

  const handleAgree = () => {
    if (!complaintData?.complaintId) return;
    setConfirmationOpen(false);
    toast.success("Complaint submitted succesfully");
    setShowChatbot(complaintData.complaintId);
  };

  const handleNotAgree = async () => {
    if (!complaintData?.complaintId) return;
    setHumanLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/complaints/human-response`,
        {
          complaintId: complaintData.complaintId,
          agree: false,
        },
        {
          withCredentials: true,
        },
      );
      toast.warn("Try again.");
      setConfirmationOpen(false);
    } catch (error) {
      console.error("Human response error:", error);
      toast.error("Unable to request human review.");
    } finally {
      setHumanLoading(false);
    }
  };

  return (
    <>
      <form className="p-4 mt-4 md:p-8 border rounded-xl shadow bg-white text-black flex flex-col gap-4 w-full max-w-2xl mx-auto">
        <h1 className="text-xl text-rail-dark sm:text-2xl font-bold">
          Grievance Detail
        </h1>

        <label htmlFor="pnr-input">
          <h3 className="text-sm text-gray-600 mb-1">PNR number</h3>
          <input
            className="w-full border px-3 py-2"
            id="pnr-input"
            name="pnr"
            type="number"
            onChange={(e) => setPnr(e.target.value)}
          />
        </label>

        <ImageUpload onChange={handleFile} value={image || null} />

        <label htmlFor="description">
          <h3 className="text-sm text-gray-600 mb-1">Description</h3>
          <textarea
            className="w-full border px-3 py-2"
            name="description"
            id="description"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <Button onClick={handleSubmit} disabled={loading}>
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
    navigate("/my-complaints/" + complaintId);
  }

  return (
    <main className="w-full flex flex-col overflow-y-scroll">
      <div className="w-full min-h-screen flex-grow mx-auto max-w-4xl sm:px-4 md:px-8">
        <ComplaintForm setShowChatbot={showChatbot} />
      </div>

      <Body />
    </main>
  );
}
