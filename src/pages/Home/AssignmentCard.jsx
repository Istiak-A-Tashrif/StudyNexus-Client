import { CgArrowsExpandLeft } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const AssignmentCard = ({ data }) => {
  console.log(data);
  const navigate = useNavigate();
  return (
    <div className="mt-10 p-1 rounded-lg border-2 border-transparent hover:border-[#7469B6] text-black relative group cursor-pointer" onClick={()=> navigate("/details")}>
      <div className="absolute right-10 bottom-[85%]">
        <button className="hidden group-hover:flex border-2 rounded-lg text-white h-8 w-8 items-center justify-center hover:bg-slate-400">
          <CgArrowsExpandLeft />
        </button>
      </div>
      <div className="flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-md bg-[#FFE6E6] h-full">
        <div>
          <img
            src={data?.thumbnail}
            alt=""
            className="object-cover w-full mb-4 h-56 rounded-lg"
          />
          <h2 className="mb-1 text-xl font-semibold">
            {data?.title}
          </h2>
          <div className="flex justify-between font-medium my-2">
          <p className="capitalize">Level: {data?.level}</p>
          <p>Marks: {data?.marks}</p>
          </div>
          <p className="text-sm">
           {data?.description}
          </p>
        </div>

        <div className="flex space-x-4">
          <img
            alt=""
            src={data?.thumbnail}
            className="object-cover w-12 h-12 rounded-full shadow"
          />
          <div className="flex flex-col space-y-1">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-[14px] font-semibold"
            >
              {data?.name}
            </a>
            <span className="text-xs font-medium">Deadline: {data?.deadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
