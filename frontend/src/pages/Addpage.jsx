import { useState } from "react";
import { API_URL, useJobs } from "../context/JobContext";
import { useNavigate } from "react-router-dom";

const Addpage = () => {
  const [appliedDate, setAppliedDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLink, setCompanyLink] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [glassdoorLink, setGlassdoorLink] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("applied");
  const [platform, setPlatform] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();
  const { dataChanged, setDataChanged } = useJobs();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      appliedDate &&
      companyName &&
      companyLink &&
      companySize &&
      location &&
      status
    ) {
      const data = {
        appliedDate,
        companyName,
        companyLink,
        companySize,
        glassdoorLink,
        location,
        status,
        platform,
        notes,
      };

      const response = await fetch(API_URL + "/company", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          navigate("/");
          setDataChanged(!dataChanged);
        }
      } else {
        console.log("Company not added");
      }
    }
  };

  return (
    <>
      <form className="pt-1 pb-8 px-2">
        <h2 className="text-3xl text-center font-semibold">
          Add Company Details
        </h2>

        <div className="border-t my-3"></div>

        <div className="py-2">
          <label>
            Applied Date
            <span className="star">*</span>
          </label>
          <input
            type="date"
            className="input-setup"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
          />
        </div>

        <div className="py-2">
          <label>
            Company name
            <span className="star">*</span>
          </label>

          <input
            type="text"
            className="user-input"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="py-2">
          <label>
            Company Link
            <span className="star">*</span>
          </label>

          <input
            type="text"
            className="user-input"
            value={companyLink}
            onChange={(e) => setCompanyLink(e.target.value)}
          />
        </div>

        <div className="py-2">
          <label>
            Company Size
            <span className="star">*</span>
          </label>

          <select
            className="input-setup capitalize"
            name="company-link"
            onChange={(e) => setCompanySize(e.target.value)}
          >
            <option value="">Select size</option>
            <option value="small (0 - 50)">Small (0 - 50)</option>
            <option value="medium (50 - 200)">medium (50 - 200) </option>
            <option value="big (200+)"> big (200+)</option>
          </select>
        </div>

        <div className="py-2">
          <label>
            Company Location
            <span className="star">*</span>
          </label>

          <input
            list="location"
            className="user-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <datalist id="location">
            <option value="chennai" />
            <option value="bengaluru" />
            <option value="coimbatore" />
            <option value="remote" />
            <option value="other" />
          </datalist>
        </div>

        <div className="py-2">
          <label>Glassdoor Link</label>

          <input
            type="text"
            className="user-input"
            value={glassdoorLink}
            onChange={(e) => setGlassdoorLink(e.target.value)}
          />
        </div>

        <div className="py-2">
          <label>
            Application Status
            <span className="star">*</span>
          </label>

          <select
            className="input-setup capitalize"
            name="company-link"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="applied">applied</option>
            <option value="interviewing">interviewing</option>
            <option value="rejected"> rejected</option>
          </select>
        </div>

        <div className="py-2">
          <label>Applied Platform</label>

          <input
            list="platform-list"
            className="user-input"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />

          <datalist id="platform-list">
            <option value="carrers page" />
            <option value="linkedin" />
            <option value="gmail" />
            <option value="message" />
            <option value="other" />
          </datalist>
        </div>

        <div>
          <label>My Notes</label>

          <textarea
            className="user-input no-scroll"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="flex items-center gap-3">
          <button
            style={{ backgroundColor: "#005fE6" }}
            onClick={handleSubmit}
            className="button"
          >
            Add JD
          </button>

          <button className="button" onClick={() => navigate("/")}>
            cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Addpage;
