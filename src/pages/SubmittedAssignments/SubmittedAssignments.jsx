import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Lottie from "lottie-react";
import congrats from "../../assets/congrats.json";
import { useQuery } from "react-query";
import axios from "axios";
import loading from "../../assets/loading.json";
import useAuth from "../../Hooks/useAuth";

const SubmittedAssignments = () => {
  const { user } =  useAuth();
  const {
    data: reviewed = [],
    isLoading: reviewLoading,
    isError: isReviewError,
    error: reviewError,
  } = useQuery({
    queryFn: () => getReviewed(),
    queryKey: ["reviewed"],
  });

  console.log(reviewed);
  const getReviewed = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_URL}/submitted/reviewed?email=${user?.email}`
    );
    return data;
  };
  const {
    data: pending = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getPending(),
    queryKey: ["pending"],
  });

  console.log(pending);
  const getPending = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_URL}/submitted/pending?email=${user?.email}`
    );
    return data;
  };

  if (isLoading || reviewLoading) {
    return (
      <div className="flex items-center justify-center  min-h-[calc(100vh-300px)]">
        <Lottie animationData={loading} loop={true} className="h-44"></Lottie>
      </div>
    );
  }

  if (isError || isReviewError) {
    if (isError && isReviewError) {
      return console.error(error, reviewError);
    }
    else if (isError) {
      return console.error(error);
    }
    return console.error(reviewError)
  }
  
  if (reviewed.length === 0 && pending.length === 0) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-500px)] text-2xl my-6">You haven't submiited any assignment.</div>;
  }
  return (
    <div className="-mt-4">
      <div className="text-center">
        <Lottie animationData={congrats} loop={true} className="h-48" />
        <h1 className="text-2xl font-semibold">Congratulations !!!</h1>
        <p className="w-1/2 mx-auto mt-3 mb-6">
          Please wait for the pending results. You will receive an update within
          a week.
        </p>
      </div>
      <Tabs defaultIndex={1}>
        <TabList>
          <Tab>Reviewed</Tab>
          <Tab>Pending</Tab>
        </TabList>

        <TabPanel>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Level</th>
                  <th>Marks</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {reviewed.map((data, idx) => (
                  <tr key={idx} className="hover cursor-pointer">
                    <td>{data?.title}</td>
                    <td className="capitalize">{data?.level}</td>
                    <td>{data?.obtainedMarks}</td>
                    <td className="capitalize">{data?.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Level</th>
                  <th>Marks</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((data, idx) => (
                  <tr key={idx} className="hover cursor-pointer">
                    <td>{data?.title}</td>
                    <td className="capitalize">{data?.level}</td>
                    <td>Pending</td>
                    <td className="capitalize">pending</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default SubmittedAssignments;
