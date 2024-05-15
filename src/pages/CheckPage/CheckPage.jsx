import React, { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import { useQuery } from "react-query";
import axios from "axios";
import { ScrollRestoration, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import 'animate.css/animate.min.css';
import { Helmet } from "react-helmet-async";

const CheckPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFeedbackId, setCurrentFeedbackId] = useState(null);

  const handleOpenModal = (feedbackId) => {
    setCurrentFeedbackId(feedbackId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFeedbackId(null);
  };

  const getData = async () => {
    const { data } = await axiosSecure(`/check/${id}?email=${user.email}`);
    return data;
  };

  const { data: checkData = [], isLoading, isError, error } = useQuery(
    ["check", id, user.email],
    getData
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
        <Lottie animationData={loading} loop={true} className="h-44" />
      </div>
    );
  }

  if (isError || error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  if (checkData.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-500px)] text-2xl my-6">
        No assignments to check.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 animate__animated animate__fadeIn">
      <Helmet>
        <title>StudyNexus | Check</title>
      </Helmet>
      <ScrollRestoration/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {checkData.map((data, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow-md">
            <iframe
              src={data?.demoUrl}
              className="w-full h-40 rounded-lg mb-4"
              title={`Demo ${idx}`}
            ></iframe>
            <div className="mb-2">
              <strong className="text-[#AD88C6]">Name:</strong> {data?.userName}
            </div>
            <div className="mb-2">
              <strong className="text-[#AD88C6]">Notes:</strong> {data?.note}
            </div>
            <div className="mb-2">
              <strong className="text-[#AD88C6]">Live Website:</strong>{" "}
              <a
                href={data?.demoUrl}
                className="font-bold text-[#AD88C6] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo URL
              </a>
            </div>
            <div className="mb-2">
              <strong className="text-[#AD88C6]">Repository:</strong>{" "}
              <a
                href={data?.githubRepo}
                className="font-bold text-[#AD88C6] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </a>
            </div>
            <div className="mb-4">
              <strong className="text-[#AD88C6]">Counts in:</strong>{" "}
              {data?.fullMarks}
            </div>
            <button
              className="font-bold text-blue-700 underline"
              onClick={() => handleOpenModal(data?._id)}
            >
              Give feedback
            </button>
            <FeedbackForm
              isOpen={isModalOpen && currentFeedbackId === data?._id}
              onClose={handleCloseModal}
              id={data?._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckPage;
