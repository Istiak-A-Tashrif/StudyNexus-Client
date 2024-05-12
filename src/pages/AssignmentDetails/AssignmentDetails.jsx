import React, { useState } from "react";
import AssignmentSubmissionForm from "./AssignmentSubmissionForm";
import img1 from "../../assets/media.jpg";
import { useNavigate } from "react-router-dom";

const AssignmentDetails = () => {
  const navigate = useNavigate();
  const assignmentData = {
    title: "Sample Assignment",
    description:
      "This is a sample assignment description. Replace this with the actual assignment description.",
    difficulty: "beginner",
    requirementDoc: "https://example.com/requirement.pdf",
    deadline: "2024-06-30",
    thumbnail: img1,
    creator: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto text-gray-900 mt-10">
      <div className="max-w-lg mx-auto p-6 bg-[#FFE6E6] rounded-lg shadow-md">
        {/* Assignment Thumbnail */}
        <img
          src={assignmentData.thumbnail}
          alt="Assignment Thumbnail"
          className="w-full rounded-lg mb-6"
        />

        {/* Assignment Title */}
        <h2 className="text-2xl font-bold text-[#7469B6] mb-4">
          {assignmentData.title}
        </h2>

        {/* Assignment Description */}
        <p className="text-gray-600 mb-4">{assignmentData.description}</p>

        {/* Creator Name */}
        <div className="mb-2">
          <strong className="text-[#AD88C6]">Author:</strong>{" "}
          {assignmentData.creator.name}
        </div>

        {/* Creator Email */}
        <div className="mb-4">
          <strong className="text-[#AD88C6]">Email:</strong>{" "}
          {assignmentData.creator.email}
        </div>

        {/* Difficulty Level */}
        <div className="mb-4">
          <strong className="text-[#AD88C6]">Difficulty Level:</strong>{" "}
          {assignmentData.difficulty}
        </div>

        {/* Requirement Document Link */}
        <div className="mb-4">
          <strong className="text-[#AD88C6]">Requirement Document:</strong>{" "}
          <a
            href={assignmentData.requirementDoc}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold hover:text-blue-700"
          >
            View Document
          </a>
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <strong className="text-[#AD88C6]">Deadline:</strong>{" "}
          {assignmentData.deadline}
        </div>

        {/* View Assignment Button */}
        <div className="flex gap-4">
        <button className="btn border-none bg-[#AD88C6] hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full" onClick={ () => navigate("/update")}>
          Update Assignment
        </button>
        <button className="btn border-none bg-[#7469B6] hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full" onClick={handleOpenModal}>
          Take Assignment
        </button>
        </div>
      </div>
      <AssignmentSubmissionForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default AssignmentDetails;
