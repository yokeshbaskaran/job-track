import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_URL, useJobs } from "../context/JobContext";
import { reversedDate } from "../utlis/helpers";

const Viewpage = () => {
  const [company, setCompany] = useState(null);

  const { id } = useParams();
  const companyId = id;

  const { dataChanged } = useJobs();

  const navigate = useNavigate();

  useEffect(() => {
    getSingleCompany(companyId);
  }, [companyId, dataChanged]);

  const getSingleCompany = async (id) => {
    const response = await fetch(API_URL + `/company/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      //console.log("data", data);
      setCompany(data);
    }
  };

  return (
    <section className="pb-5 px-2">
      <h2 className="text-3xl text-center font-medium">View Job Details</h2>

      <section className="max-w-[500px] mx-auto my-8 py-2 px-4 border border-slate-400 rounded-md shadow-md">
        {company ? (
          <>
            <div className="py-2 flex gap-5">
              <label className="font-semibold">Applied Date:</label>
              <p>{reversedDate(company.appliedDate)}</p>
            </div>

            <div className="py-2 flex gap-5">
              <label className="font-semibold">Company Name:</label>
              <p>{company.companyName}</p>
            </div>

            <div className="py-2 flex gap-5">
              <label className="font-semibold">Company Link:</label>
              <Link
                href={company.companyLink}
                target="_blank"
                className="text-blue-500 underline"
              >
                {company.companyLink ? company.companyLink : "NA"}
              </Link>
            </div>

            <div className="py-2 flex gap-5 capitalize">
              <label className="font-semibold">Company Size:</label>
              <p>{company.companySize}</p>
            </div>

            <div className="py-2 flex gap-5">
              <label className="font-semibold">Glassdoor Link:</label>
              {company.glassdoorLink ? (
                <Link
                  href={company.glassdoorLink}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  {company.glassdoorLink}
                </Link>
              ) : (
                "NA"
              )}
            </div>

            <div className="py-2 flex gap-5">
              <label className="font-semibold">Location:</label>
              <p>{company.location}</p>
            </div>

            <div className="py-2 flex gap-5">
              <label className="font-semibold">Status:</label>
              <p
                className={`py-1 px-3 text-white rounded-full ${
                  company.status === "applied"
                    ? "bg-green-600"
                    : company.status === "applied"
                    ? "bg-yellow-600"
                    : "bg-red-600"
                }`}
              >
                {company.status}
              </p>
            </div>

            <div className="py-2 flex gap-5">
              <label className="font-semibold">Platform:</label>

              {company.glassdoorLink ? <p>{company.platform}</p> : "NA"}
            </div>

            <div className="py-2 flex gap-5">
              <label className="font-semibold">Notes:</label>
              {company.glassdoorLink ? <p>{company.notes}</p> : "NA"}
            </div>

            <button className="button" onClick={() => navigate(-1)}>
              back to page
            </button>
          </>
        ) : (
          <p className="my-8 text-center">Loading data...</p>
        )}
      </section>
    </section>
  );
};
export default Viewpage;
