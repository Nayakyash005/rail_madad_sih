import React from "react";
import { Button } from "../../components/ui/Button";
import ImageUpload from "../../components/ComplaintImage/ImageUpload";

function ComplaintForm() {
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
        />
      </label>

      <ImageUpload onChange={console.log} />

      <label htmlFor="description">
        <h3 className="text-sm text-gray-600 mb-1">Description</h3>
        <textarea
          className="w-full border px-3 py-2"
          name="description"
          id="description"
          rows={4}
        ></textarea>
      </label>

      <Button>Submit</Button>
    </form>
  );
}

export default ComplaintForm;
