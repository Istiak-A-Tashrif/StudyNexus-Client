import axios from "axios";
import { TiDeleteOutline } from "react-icons/ti";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json";
import Swal from "sweetalert2";

const AddedAssignments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient()
  const {
    data: myAssignment = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["added"],
  });

  const getData = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_URL}/added?email=${user?.email}`
    );
    return data;
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(`${import.meta.env.VITE_URL}/delete/${id}`);
      return data;
    },
    onSuccess: (data) => {
      if (data.deletedCount>0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        queryClient.invalidateQueries({ queryKey:['added']})
      }
    }
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
  
    if (result.isConfirmed) {
      await mutateAsync(id);
    }
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

  if (myAssignment.length === 0) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-500px)] text-2xl my-6">No assignments found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Level</th>
            <th>Post Date</th>
            <th>Total Submission</th>
          </tr>
        </thead>
        <tbody>
          {myAssignment.map((data) => (
            <tr key={data._id} className="hover">
              <td>
                <button className="text-xl flex hover:scale-150" onClick={() => handleDelete(data._id)}>
                  <TiDeleteOutline />
                </button>
              </td>
              <td className="hover:text-blue-700 cursor-pointer"onClick={()=>navigate(`/details/${data._id}`)}>{data?.title}</td>
              <td className="capitalize">{data?.level}</td>
              <td>{data?.postDate}</td>
              <td>
                <button
                  className="font-bold text-blue-700 underline"
                  onClick={() => navigate(`/check/${data?._id}`)}
                >
                  Check: 1
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddedAssignments;
