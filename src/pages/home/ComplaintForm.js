import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import ImageUpload from "../../components/ComplaintImage/ImageUpload";
import axios from "axios";
import { toast } from "react-toastify";

function ComplaintForm({ setShowChatbot }) {
  const [image, setimage] = useState(null);
  const [description, setDescription] = useState("");
  const [pnr, setPnr] = useState(" ");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        description,
        pnr,
        image,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/complaints/done`,
        body,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("responce is ", res);
      toast.success("Complaint submitted succesfully");
      setShowChatbot(res.data.complaintId);
    } catch (error) {
      toast.error("Error accur");
      console.log("error is ", error);
    }
  };
  const handleFile = (e) => {
    setimage(e);
  };

  return (
    <form className="p-4 mt-4 md:p-8 border rounded shadow bg-white text-black flex flex-col gap-4 w-full max-w-2xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold">Grievance Detail</h1>

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

      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
}

export default ComplaintForm;
