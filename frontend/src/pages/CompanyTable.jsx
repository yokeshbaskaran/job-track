import { Link } from "react-router-dom";
import { useJobs } from "../context/JobContext";
import { FaEdit } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { reversedDate } from "../utlis/helpers";

const CompanyTable = () => {
  const { companyDetails, dataChanged, setDataChanged } = useJobs();

  return (
    <>
      <tbody>
        {companyDetails &&
          // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

          companyDetails
            // .filter((item) =>
            //   item.companyName.toLowerCase().includes(search.toLowerCase())
            // )
            .map((item, idx) => (
              <tr
                key={`table-${idx}`}
                className="py-3 border-b text-center hover:bg-zinc-100"
              >
                <td>{idx + 1}</td>
                <td className="py-4">
                  <div className="flex items-center justify-center gap-1">
                    <span>{item.companyName}</span>
                    <span
                      className={`inline-block size-1.5 rounded-full ${
                        item.status === "applied"
                          ? "bg-green-700"
                          : item.status === "interviewing"
                          ? "bg-yellow-500"
                          : "bg-red-700"
                      }`}
                    ></span>
                  </div>
                </td>

                <td className="underline text-blue-700 max-md:hidden">
                  <Link target="_blank" to={item.companyLink}>
                    {item.companyName}.com
                  </Link>
                </td>

                <td className="max-md:hidden">
                  {reversedDate(item.appliedDate)}
                </td>

                <td className="flex justify-center items-center gap-3">
                  <Link to={`/edit/${item._id}`}>
                    <button className="edit flex items-center gap-1">
                      <FaEdit />
                      Edit
                    </button>
                  </Link>

                  <Link to={`/view/${item._id}`}>
                    <button className="view flex items-center gap-1">
                      <IoMdEye
                        size={18}
                        onClick={() => setDataChanged(!dataChanged)}
                      />
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))
            .reverse()}
      </tbody>
    </>
  );
};

export default CompanyTable;
