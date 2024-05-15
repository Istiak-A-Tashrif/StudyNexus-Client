import Banner from "./Banner";
import Faq from "./Faq";
import AssignmentCard from "./AssignmentCard";
import { Link, ScrollRestoration } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json"
import 'animate.css/animate.min.css';
import { Helmet } from "react-helmet-async";

const Home = () => {

  const {data: assignments = [], isLoading, isError, error} = useQuery({
    queryFn: () => getData(),
    queryKey: ['home'],
  })

  const getData = async () => {
    const {data} = await axios (`${import.meta.env.VITE_URL}`)
    return data;
  }
  
  if(isLoading){
    return <div className="flex items-center justify-center  min-h-[calc(100vh-300px)]">
      <Lottie animationData={loading} loop={true} className="h-44"></Lottie>
    </div>
  }

  if (isError || error) {
    console.error(error);
  }
  return (
    <div className="animate__animated animate__fadeIn">
      <Helmet>
        <title>StudyNexus | Home</title>
      </Helmet>
      <ScrollRestoration/>
      <Banner></Banner>
      <div className="text-center flex flex-col justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-bold mt-14">Featured Assignments</h1>
        <p className="mt-2 md:text-lg w-2/3 ">
          Explore our latest and most popular assignments. Whether you are a
          beginner or an expert, find the perfect challenge to enhance your
          skills and knowledge.
        </p>
      </div>
      <div className="">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-5">
          {
            assignments.map(data => <AssignmentCard data={data} key={data?._id}></AssignmentCard>)
          }
        </div>
        <div className="flex justify-center mt-8">
          <Link to={"/allAssignments"}>
            <button className="btn bg-[#AD88C6] text-gray-50">Show All</button>
          </Link>
        </div>
      </div>
      <Faq></Faq>
    </div>
  );
};

export default Home;
