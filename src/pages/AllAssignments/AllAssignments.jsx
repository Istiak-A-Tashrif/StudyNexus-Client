import React from 'react';
import AssignmentCard from '../Home/AssignmentCard';
import { FaChevronDown } from "react-icons/fa";

const AllAssignments = () => {
    const handleDropdown = () => {
        if (document.getElementById("dropOrUp").hasAttribute("open")) {
          document.getElementById("dropOrUp").removeAttribute("open");
        } else {
          document.getElementById("dropOrUp").setAttribute("open");
        }
      };
    
    return (
        <div className="">
            <div className="flex justify-center">
        <details id="dropOrUp" className="dropdown my-4 mt-6">
          <summary className="m-1 btn btn-info w-max">
            Sort By <FaChevronDown className="ml-1" />
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
            <AssignmentCard></AssignmentCard>
            <AssignmentCard></AssignmentCard>
            <AssignmentCard></AssignmentCard>
            <AssignmentCard></AssignmentCard>
            <AssignmentCard></AssignmentCard>
            <AssignmentCard></AssignmentCard>
        </div>
        </div>
    );
};

export default AllAssignments;