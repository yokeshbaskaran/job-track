import { Link } from "react-router-dom";
import { useJobs } from "../context/JobContext";
import CompanyTable from "./CompanyTable";

const Homepage = () => {
  const { companyDetails, search, setSearch } = useJobs();
  const companyCount = companyDetails ? companyDetails?.length : 0;

  return (
    <div>
      <h2 className="text-2xl text-center font-semibold">Company Details</h2>

      <div className="my-5 flex justify-between items-center">
        <h2>
          Company count:
          <span className="pl-1 text-xl text-blue-500">{companyCount}</span>
        </h2>

        <button className="button">
          <Link to="/add">Add Company</Link>
        </button>
      </div>

      <div className="my-5 px-5 flex items-center gap-2">
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          className="user-input"
          placeholder="Search here:::disabled"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled
        />
      </div>

      <section>
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-center">
              <th>#</th>
              <th>Company name</th>
              <th className="max-md:hidden">Company Link</th>
              <th className="max-md:hidden">Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <CompanyTable />
        </table>
      </section>
    </div>
  );
};

export default Homepage;
