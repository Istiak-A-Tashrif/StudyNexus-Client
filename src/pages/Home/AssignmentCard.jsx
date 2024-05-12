import { CgArrowsExpandLeft } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const AssignmentCard = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-10 p-1 rounded-lg border-2 border-transparent hover:border-[#7469B6] text-black relative group cursor-pointer" onClick={()=> navigate("/details")}>
      <div className="absolute right-10 bottom-[85%]">
        <button className="hidden group-hover:flex border-2 rounded-lg text-white h-8 w-8 items-center justify-center hover:bg-slate-400">
          <CgArrowsExpandLeft />
        </button>
      </div>
      <div className="flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-md bg-[#FFE6E6]">
        <div>
          <img
            src="https://source.unsplash.com/random/100x100/?5"
            alt=""
            className="object-cover w-full mb-4 h-56 rounded-lg"
          />
          <h2 className="mb-1 text-xl font-semibold">
            Nam cu platonem posidonium sanctus debitis te
          </h2>
          <div className="flex justify-between font-medium my-2">
          <p>Level: Expert</p>
          <p>Marks: 60</p>
          </div>
          <p className="text-sm">
            Eu qualisque aliquando mel, id lorem detraxit nec, ad elit minimum
            pri. Illum ipsum detracto ne cum. Mundi nemore te ius, vim ad illud
            atqui apeirian...
          </p>
        </div>

        <div className="flex space-x-4">
          <img
            alt=""
            src="https://source.unsplash.com/100x100/?portrait"
            className="object-cover w-12 h-12 rounded-full shadow"
          />
          <div className="flex flex-col space-y-1">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-sm font-semibold"
            >
              Leroy Jenkins
            </a>
            <span className="text-xs ">4 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
