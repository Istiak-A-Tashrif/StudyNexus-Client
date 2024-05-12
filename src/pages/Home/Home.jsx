import React from "react";
import Banner from "./Banner";
import Faq from "./Faq";
import AssignmentCard from "./AssignmentCard";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-5">
          <AssignmentCard></AssignmentCard>
          <AssignmentCard></AssignmentCard>
          <AssignmentCard></AssignmentCard>
          <AssignmentCard></AssignmentCard>
          <AssignmentCard></AssignmentCard>
          <AssignmentCard></AssignmentCard>
        </div>
        <div className="flex justify-center mt-8">
          <Link to={'/allAssignments'}>
            <button className="btn bg-[#AD88C6] text-gray-50">Show All</button>
          </Link>
        </div>
      </div>
      <Faq></Faq>
    </div>
  );
};

export default Home;
