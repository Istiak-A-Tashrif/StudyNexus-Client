import React, { useState } from "react";
import AssignmentSubmissionForm from "./AssignmentSubmissionForm";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Lottie from "lottie-react";
Lottie
import loading from "../../assets/loading.json"

const AssignmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const {data: assignmentData = {}, isLoading, isError, error} = useQuery({
    queryFn:()=> getData(),
    queryKey: ["details", id]
  })

  const getData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_URL}/details/${id}`);
      return data;
  }
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if(isLoading){
    return <div className="flex items-center justify-center  min-h-[calc(100vh-300px)]">
      <Lottie animationData={loading} loop={true} className="h-44"></Lottie>
    </div>
  }

  if (isError || error) {
    console.error(error);
  }
  return (
    <div className="container mx-auto text-gray-900 mt-10">
      <div className="max-w-lg mx-auto p-6 bg-[#FFE6E6] rounded-lg shadow-md">
        {/* Assignment Thumbnail */}
        <img
          src={assignmentData?.thumbnail}
          alt="Assignment Thumbnail"
          className="w-full rounded-lg mb-6"
        />

        {/* Assignment Title */}
        <h2 className="text-2xl font-bold text-[#7469B6] mb-4">
          {assignmentData?.title}
        </h2>

        {/* Assignment Description */}
        <p className="text-gray-600 mb-4">{assignmentData?.description}</p>

        {/* Creator Name */}
        <div className="mb-2">
          <strong className="text-[#AD88C6]">Author:</strong>{" "}
          {assignmentData?.name}
        </div>

        {/* Creator Email */}
        <div className="mb-4">
          <strong className="text-[#AD88C6]">Email:</strong>{" "}
          {assignmentData?.email}
        </div>

        {/* Level */}
        <div className="mb-4">
          <strong className="text-[#AD88C6] ">Level:</strong>{" "}
          <span className="capitalize">{assignmentData?.level}</span>
        </div>

        {/* Requirement Document Link */}
        <div className="mb-4">
          <strong className="text-[#AD88C6]">Requirement Document:</strong>{" "}
          <a
            href={assignmentData?.requirementDoc}
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
          {assignmentData?.deadline}
        </div>

        {/* View Assignment Button */}
        <div className="flex flex-col md:flex-row gap-4">
        <button className="btn border-none bg-[#AD88C6] hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full" onClick={ () => navigate(`/update/${assignmentData?._id}`)}>
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
