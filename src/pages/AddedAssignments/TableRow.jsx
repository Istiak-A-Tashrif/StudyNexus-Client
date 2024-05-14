import { TiDeleteOutline } from "react-icons/ti";
import { useQuery } from "react-query";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TableRow = ({data, handleDelete}) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [count, setCount] = useState(null)
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_URL}/checkCount/${data?._id}?email=${user?.email}`)
        .then(res=>res.json())
        .then(data=>setCount(data))
    },[])
    return (
        <tr className="hover">
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
                  Check: {count?.count}
                </button>
              </td>
            </tr>
    );
};

export default TableRow;