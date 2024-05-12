import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const AddedAssignments = () => {
  const navigate= useNavigate();
  
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Post Date</th>
            <th>Total Submission</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover">
            <td>
              <button className="text-xl flex hover:scale-150">
              <TiDeleteOutline />
              </button>
            </td>
            <td>Sample Assisgnment</td>
            <td>Beginner</td>
            <td>24-04-2024</td>
            <td><button className="font-bold text-blue-700 underline" onClick={()=> navigate("/check")}>Check: 1</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddedAssignments;
