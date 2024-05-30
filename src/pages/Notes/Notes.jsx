import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json";
import 'animate.css/animate.min.css';

const Notes = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: notes = [], isLoading, isError, error } = useQuery(
    "notes",
    async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_URL}/notes?email=${user?.email}`
      );
      return data;
    }
  );

  
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

  if (notes.length<=0) {
    return <div className="flex justify-center items-center min-h-[45vh]">No notes to show</div>
  }
  return (
    <div className="overflow-x-auto">
      <table className="table my-6">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, idx) => (
            <tr key={note._id} className="hover">
              <th>{idx + 1}</th>
              <td>{note.title}</td>
              <td>{note.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notes;
