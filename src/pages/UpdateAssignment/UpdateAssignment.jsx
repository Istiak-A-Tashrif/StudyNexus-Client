import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const UpdateAssignment = () => {
    const initialFormState = {
      title: "",
      description: "",
      difficulty: "beginner",
      marks: "",
      deadline: format(new Date(), "dd/MM/yyyy"),
      name: "",
      email: "",
      requirementDoc: "",
      thumbnail: "",
    };
  
    const [formData, setFormData] = useState(initialFormState);
  
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Data:", formData);
      // Handle form submission (e.g., send data to server)
  
      // Clear the form
      setFormData(initialFormState);
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto my-12 p-6 space-y-6 bg-white rounded-lg shadow-md text-gray-900"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Assignment</h2>
  
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
        </div>
  
        {/* Difficulty Level Field */}
        <div className="form-control">
          <label htmlFor="difficulty" className="label">
            <span className="label-text text-gray-900">Difficulty Level</span>
          </label>
          <select
            name="difficulty"
            id="difficulty"
            value={formData.difficulty}
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
            <span className="label-text text-gray-900">Requirement Document Link</span>
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
          <button type="submit" className="btn bg-[#AD88C6] hover:bg-[#7469B6] w-full text-gray-50">
            Update
          </button>
        </div>
      </form>
    );
  };

export default UpdateAssignment;