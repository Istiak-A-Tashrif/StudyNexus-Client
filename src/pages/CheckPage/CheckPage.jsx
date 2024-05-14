import React, { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json";

const CheckPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const {
    data: checkData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["check"],
  });

  const getData = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_URL}/check/${id}?email=${user.email}`
    );
    return data;
  };

  console.log(checkData);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center  min-h-[calc(100vh-300px)]">
        <Lottie animationData={loading} loop={true} className="h-44"></Lottie>
      </div>
    );
  }

  if (isError || error) {
    console.error(error);
  }

  if (checkData.length === 0) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-500px)] text-2xl my-6">No assignments to check.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {checkData.map((data, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow-md">
            <iframe
              src={data?.demoUrl}
              frameborder="0"
              className="w-full h-40 rounded-lg mb-4"
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
              onClick={handleOpenModal}
            >
              Give feedback
            </button>
          </div>
        ))}
      </div>
      <FeedbackForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default CheckPage;
