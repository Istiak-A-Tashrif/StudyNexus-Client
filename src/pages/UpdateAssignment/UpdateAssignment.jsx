import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json";
import Swal from "sweetalert2";

const UpdateAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_URL}/details/${id}`);
    return data;
  };

  const { data: defaultData = {}, isLoading, isError, error } = useQuery({
    queryFn: getData,
    queryKey: ["details", id],
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "beginner",
    marks: "",
    deadline: "",
    requirementDoc: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (defaultData.deadline) {
      const initialDate = parse(defaultData.deadline, "dd/MM/yyyy", new Date());
      setFormData({
        title: defaultData.title || "",
        description: defaultData.description || "",
        level: defaultData.level || "beginner",
        marks: defaultData.marks || "",
        deadline: initialDate,
        requirementDoc: defaultData.requirementDoc || "",
        thumbnail: defaultData.thumbnail || "",
      });
    }
  }, [defaultData]);

  const { mutateAsync } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_URL}/update/${id}`,
        formData
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount>0) {
        Swal.fire({
          title: "Success",
          text: "The assignment has been updated",
          icon: "success",
        });
      }
      navigate(`/details/${id}`)
    },
  });

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
      deadline: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      deadline: format(formData.deadline, "dd/MM/yyyy"),
    };
    await mutateAsync(formattedData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
        <Lottie animationData={loading} loop={true} className="h-44"></Lottie>
      </div>
    );
  }

  if (isError || error) {
    console.error(error);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto my-12 p-6 space-y-6 bg-[#FFE6E6] rounded-lg shadow-md text-gray-900"
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
          selected={formData.deadline}
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
