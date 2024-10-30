import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const JobContext = createContext();

export function useJobs() {
  return useContext(JobContext);
}

export const API_URL = "http://localhost:3001/api";

export const JobContextProvider = ({ children }) => {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCompanyList();
  }, [dataChanged]);

  const getCompanyList = async () => {
    const response = await fetch(API_URL + "/company", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      setCompanyDetails(data);
    } else {
      console.log("Fetch Error!");
    }
  };

  const contextValues = {
    dataChanged,
    setDataChanged,
    companyDetails,
    search,
    setSearch,
  };

  return (
    <>
      <JobContext.Provider value={contextValues}>
        {children}
      </JobContext.Provider>
    </>
  );
};
