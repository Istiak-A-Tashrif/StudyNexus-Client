import React from 'react';
import AssignmentCard from '../Home/AssignmentCard';
import { FaChevronDown } from "react-icons/fa";
import { useLoaderData } from 'react-router-dom';
import { useQuery } from "react-query";
import axios from "axios";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json"

const AllAssignments = () => {
    const handleDropdown = () => {
        if (document.getElementById("dropOrUp").hasAttribute("open")) {
          document.getElementById("dropOrUp").removeAttribute("open");
        } else {
          document.getElementById("dropOrUp").setAttribute("open");
        }
      };

      const {data: allAssignments = [], isLoading, isError, error} = useQuery({
        queryFn: () => getData(),
        queryKey: ['all'],
      })
    
      const getData = async () => {
        const {data} = await axios (`${import.meta.env.VITE_URL}/allAssignments`)
        return data;
      }
      
      if(isLoading){
        return <div className="flex items-center justify-center">
          <Lottie animationData={loading} loop={true} className="h-44 min-h-[calc(100vh-300px)]"></Lottie>
        </div>
      }
    
      if (isError || error) {
        console.error(error);
      }
      
    return (
        <div className="">
            <div className="flex justify-center">
        <details id="dropOrUp" className="dropdown my-4 mt-6">
          <summary className="m-1 btn btn-info w-max">
            Filter <FaChevronDown className="ml-1" />
          </summary>
          <ul
            className="p-2 shadow menu dropdown-content z-[20] bg-base-100 rounded-box w-52"
            onClick={handleDropdown}
          >
            <li
              className="cursor-default hover:text-blue-600 mt-1"
              onClick={() => handleSortby("Rating")}
            >
              Rating
            </li>
            <li
              className="cursor-default hover:text-blue-600 mt-1"
              onClick={() => handleSortby("Pages")}
            >
              Number of Pages
            </li>
            <li
              className="cursor-default hover:text-blue-600 mt-1"
              onClick={() => handleSortby("Year")}
            >
              Publishing Year
            </li>
          </ul>
        </details>
      </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
              allAssignments.map(data => <AssignmentCard key={data._id} data={data}></AssignmentCard>)
            }
        </div>
        </div>
    );
};

export default AllAssignments;