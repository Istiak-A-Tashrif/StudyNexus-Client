import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const AssignmentSubmissionForm = ({ isOpen, onClose, assignmentData }) => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: assignmentData?.title,
    githubRepo: "",
    demoUrl: "",
    note: "",
    obtainedMarks: 0,
    fullMarks: parseInt(assignmentData?.marks),
    userName: user?.displayName,
    id: assignmentData?._id,
    level: assignmentData?.level,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { mutateAsync } = useMutation({
    mutationFn: async ( formData ) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/submit`,
        formData
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.acknowledged) {
        Swal.fire({
          title: "Success",
          text: "The assignment has been submitted",
          icon: "success",
        });
      }
      navigate("/submitted")
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    
    await mutateAsync(formData);

    // Clear the form
    setFormData((prevData) => ({
      ...prevData,
      githubRepo: "",
      demoUrl: "",
      note: "", 
    }));
    
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
      <div className="relative max-h-[90vh] bg-[#FFE6E6] w-full max-w-md mx-auto rounded-lg shadow-lg overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Submit Assignment</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="title" className="label">
                Assignment Title
              </label>
              <p className="input bg-white flex items-center">
                {formData.title}
              </p>
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
