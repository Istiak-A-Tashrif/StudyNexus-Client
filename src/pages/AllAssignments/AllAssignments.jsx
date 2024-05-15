import React, { useEffect, useState } from "react";
import AssignmentCard from "../Home/AssignmentCard";
import { FaChevronDown, FaSearchengin } from "react-icons/fa";
import { useQuery } from "react-query";
import axios from "axios";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json";
import 'animate.css/animate.min.css';
import { Helmet } from "react-helmet-async";


const AllAssignments = () => {
  const [count,setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState('');
  
  const handleDropdown = () => {
    if (document.getElementById("dropOrUp").hasAttribute("open")) {
      document.getElementById("dropOrUp").removeAttribute("open");
    } else {
      document.getElementById("dropOrUp").setAttribute("open");
    }
  };

  const {
    data: allAssignments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["all", currentPage, filter, search],
  });
  
  const getData = async () => {
    const { data } = await axios(`${import.meta.env.VITE_URL}/allAssignments?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&search=${search}`);
    return data;
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/assignmentsCount?filter=${filter}&search=${search}`)
        .then(res => res.json())
        .then(data => {
            setCount(data.count);
        })
        .catch(error => {
            console.error("Error fetching count:", error);
        });
}, [allAssignments, filter, search]);

  
  const itemsPerPage = 6
  const pages = [...Array(Math.ceil(count/itemsPerPage)).keys()].map(data => data+1);

  const handleNext = () => {
    if (Math.ceil(count/itemsPerPage)>currentPage) {
      setCurrentPage(currentPage+1)
    }
  }
  const handlePrevious = () => {
    if (currentPage>1) {
      setCurrentPage(currentPage-1)
    }
  }
  // search query

  const handleSearch = e => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

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

  return (
    <div className="animate__animated animate__fadeIn">
      <Helmet>
        <title>StudyNexus | All</title>
      </Helmet>
      <div className="flex items-center justify-center my-4">
      <div className="">
      <div className="relative">
      <form onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="py-2 pl-10 pr-4 block w-full rounded-md border bg-[#FFE6E6] text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearchengin className="text-gray-400" />
      </div>
      <button
        type="submit"
        className="absolute inset-y-0 right-0 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-r-md hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none"
      >
        Search
      </button>
      </form>
    </div>
      </div>
        <details id="dropOrUp" className="dropdown">
          <summary className="m-1 btn btn-info w-max">
            Filter <FaChevronDown className="ml-1" />
          </summary>
          <ul
            className="p-2 shadow menu dropdown-content z-[20] bg-base-100 rounded-box w-52"
            onClick={handleDropdown}
          >
            <li
              className="cursor-pointer hover:text-blue-600 mt-1"
              onClick={() => setFilter('beginner')}
            >
              Beginner
            </li>
            <li
              className="cursor-pointer hover:text-blue-600 mt-1"
              onClick={() => setFilter('intermediate')}
            >
              Intermediate
            </li>
            <li
              className="cursor-pointer hover:text-blue-600 mt-1"
              onClick={() => setFilter("expert")}
            >
              Expert
            </li>
            <li
              className="cursor-pointer hover:text-blue-600 mt-1"
              onClick={() => setFilter('')}
            >
              None
            </li>
          </ul>
        </details>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allAssignments.map((data) => (
          <AssignmentCard key={data._id} data={data}></AssignmentCard>
        ))}
      </div>
      <div className="flex justify-center gap-5 my-6">
        <button onClick={handlePrevious} className="btn btn-primary w-20">Previous</button>
        {
        pages.map(data => <button key={data} className={`btn ${currentPage===data ? "btn-info" : ""}`} onClick={ ()=>setCurrentPage(data)}>{data}</button>)
        }
        <button onClick={handleNext} className="btn btn-primary w-20">Next</button>
      </div>
    </div>
  );
};

export default AllAssignments;
