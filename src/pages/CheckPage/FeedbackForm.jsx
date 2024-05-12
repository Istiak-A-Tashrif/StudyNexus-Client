import React, { useState } from "react";

const FeedbackForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    marks: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Handle form submission (e.g., send data to server)

    // Clear the form
    setFormData({
      marks: "",
      feedback: "",
    });

    // Close the modal
    onClose();
  };

  return (
    <div
      className={`${
        isOpen ? "fixed inset-0 z-50 overflow-y-auto" : "hidden"
      } flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      <div className="relative bg-[#FFE6E6] w-full max-w-md mx-auto rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Submit Marks and Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="marks" className="label">
                Marks
              </label>
              <input
                type="number"
                name="marks"
                id="marks"
                value={formData.marks}
                onChange={handleChange}
                className="input input-bordered w-full bg-white"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="feedback" className="label">
                Feedback
              </label>
              <textarea
                name="feedback"
                id="feedback"
                value={formData.feedback}
                onChange={handleChange}
                className="textarea textarea-bordered w-full bg-white"
                required
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="btn bg-[#AD88C6] text-gray-50 border-none mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn bg-[#7469B6] text-gray-50 border-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
