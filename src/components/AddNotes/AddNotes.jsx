import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Hooks/useAuth";

const AddNotes = ({ title, onClose }) => {
  const [notes, setNotes] = useState("");
  const { user } = useAuth();
  const userEmail = user?.email;

  const { mutateAsync } = useMutation({
    mutationFn: async (noteData) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/addNotes`,
        noteData
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.acknowledged) {
        toast("Note Added", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    },
  });

  const handleSave = async () => {
    const noteData = {
      title,
      userEmail,
      notes,
    };
    await mutateAsync(noteData); // Wrap notes in an object
    setNotes(""); // Clear the notes input
    onClose(); // Close the modal
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
        <div className="relative bg-white p-8 rounded-lg z-20">
          <button
            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-black"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-lg font-bold mb-4">Add Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
            cols="50"
            placeholder="Enter your notes here..."
            className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg mb-4"
          ></textarea>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNotes;
