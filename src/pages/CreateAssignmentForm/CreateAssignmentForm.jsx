import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import useAuth from "../../Hooks/useAuth";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import 'animate.css/animate.min.css';
import { Helmet } from "react-helmet-async";

const CreateAssignmentForm = () => {
  const { user } = useAuth();
  const navigate =useNavigate();
  const initialFormState = {
    title: "",
    description: "",
    level: "beginner",
    marks: "",
    name: `${user?.displayName}`,
    email: `${user?.email}`,
    deadline: format(new Date(), "dd/MM/yyyy"),
    requirementDoc: "",
    thumbnail: "",
    postDate: format(new Date(), "dd/MM/yyyy"),
  };

  const [formData, setFormData] = useState(initialFormState);
  const [descriptionError, setDescriptionError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      deadline: format(date, "dd/MM/yyyy"),
    }));
  };

  const { mutateAsync } = useMutation({
    mutationFn: async ( formData ) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/createAssignment`,
        formData
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.acknowledged) {
        Swal.fire({
          title: "Success",
          text: "The assignment has been added",
          icon: "success",
        });
      }
      navigate("/added");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate description length
    const descriptionLength = formData.description.trim().length;
    if (descriptionLength < 100) {
      setDescriptionError("Description must be at least 100 characters.");
      return;
    } 
    if(descriptionLength > 200 ) {
      setDescriptionError("Description must not exceed 200 characters.");
      return
    } else {
      setDescriptionError("");
    }

    setFormData((prevData) => ({
      ...prevData,
      name: user?.displayName,
      email: user?.email,
    }));

    await mutateAsync(formData);

    // Clear the form
    setFormData(initialFormState);
  };

  return (
    <div className="">
      <Helmet>
        <title>StudyNexus | Create</title>
      </Helmet>
      <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto my-12 p-6 space-y-6 bg-[#FFE6E6] rounded-lg shadow-md text-gray-900 animate__animated animate__fadeIn"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Create Assignment</h2>

      {/* Title Field */}
      <div className="form-control">
        <label htmlFor="title" className="label">
          <span className="label-text text-gray-900">Title</span>
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

      {/* Description Field */}
      <div className="form-control">
        <label htmlFor="description" className="label">
          <span className="label-text text-gray-900">Description</span>
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full bg-white"
          required
        />
        {descriptionError && (
          <p className="text-red-500 text-sm mt-2">{descriptionError}</p>
        )}
      </div>

      {/* Level Field */}
      <div className="form-control">
        <label htmlFor="level" className="label">
          <span className="label-text text-gray-900">Level</span>
        </label>
        <select
          name="level"
          id="level"
          value={formData.level}
          onChange={handleChange}
          className="select select-bordered w-full bg-white"
          required
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      {/* Marks Field */}
      <div className="form-control">
        <label htmlFor="marks" className="label">
          <span className="label-text text-gray-900">Marks</span>
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

      {/* Deadline Field */}
      <div className="form-control">
        <label htmlFor="deadline" className="label">
          <span className="label-text text-gray-900">Deadline</span>
        </label>
        <DatePicker
          className="input input-bordered w-full bg-white"
          selected={new Date(formData.deadline.split("/").reverse().join("-"))}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          required
        />
      </div>

      {/* Requirement Doc Link Field */}
      <div className="form-control">
        <label htmlFor="requirementDoc" className="label">
          <span className="label-text text-gray-900">
            Requirement Document Link
          </span>
        </label>
        <input
          type="url"
          name="requirementDoc"
          id="requirementDoc"
          value={formData.requirementDoc}
          onChange={handleChange}
          className="input input-bordered w-full bg-white"
          required
        />
      </div>

      {/* Thumbnail Image URL Field */}
      <div className="form-control">
        <label htmlFor="thumbnail" className="label">
          <span className="label-text text-gray-900">Thumbnail Image URL</span>
        </label>
        <input
          type="url"
          name="thumbnail"
          id="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          className="input input-bordered w-full bg-white"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="form-control mt-6">
        <button
          type="submit"
          className="btn bg-[#AD88C6] hover:bg-[#7469B6] w-full text-gray-50"
        >
          Create Assignment
        </button>
      </div>
    </form>
    </div>
  );
};

export default CreateAssignmentForm;
