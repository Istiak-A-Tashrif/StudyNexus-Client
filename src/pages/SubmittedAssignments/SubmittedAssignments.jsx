import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Lottie from "lottie-react";
import congrats from "../../assets/congrats.json";

const SubmittedAssignments = () => {
  return (
    <div className="-mt-4">
      <div className="text-center">
        <Lottie animationData={congrats} loop={true} className="h-48" />
        <h1 className="text-2xl font-semibold">Congratulations !!!</h1>
        <p className="w-1/2 mx-auto mt-3 mb-6">
          Please wait for the
          pending results. You will receive an update within a week.
        </p>
      </div>
      <Tabs>
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
                <tr className="hover cursor-pointer">
                  <td>Sample Assisgnment</td>
                  <td>Beginner</td>
                  <td>60</td>
                  <td className="capitalize">aweosome</td>
                </tr>
                
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
                <tr className="hover cursor-pointer">
                  <td>Sample Assisgnment</td>
                  <td>Beginner</td>
                  <td>Pending</td>
                  <td className="capitalize">pending</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default SubmittedAssignments;
