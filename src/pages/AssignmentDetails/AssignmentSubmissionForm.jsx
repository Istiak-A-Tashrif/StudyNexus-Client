import React, { useState } from "react";

const AssignmentSubmissionForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    githubRepo: "",
    demoUrl: "",
    note: "", // Add note field to the formData state
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
      title: "",
      githubRepo: "",
      demoUrl: "",
      note: "", // Clear note field too
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
          <h2 className="text-lg font-semibold mb-4">Submit Assignment</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="title" className="label">
                Assignment Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full bg-white"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="githubRepo" className="label">
                GitHub Repo Link
              </label>
              <input
                type="url"
                name="githubRepo"
                id="githubRepo"
                value={formData.githubRepo}
                onChange={handleChange}
                className="input input-bordered w-full bg-white"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="demoUrl" className="label">
                Demo URL
              </label>
              <input
                type="url"
                name="demoUrl"
                id="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                className="input input-bordered w-full bg-white"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="note" className="label">
                Note
              </label>
              <textarea
                name="note"
                id="note"
                value={formData.note}
                onChange={handleChange}
                className="input input-bordered w-full bg-white h-24"
                placeholder="Add a quick note..."
              ></textarea>
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

export default AssignmentSubmissionForm;
