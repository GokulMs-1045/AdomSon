import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import EventNav from "../../EventNav";
import "./Others.css";

const checklistItems = [
  { key: "eventAgenda", label: "Event Agenda" },
  { key: "guest_Information_And_Confirmation", label: "Guest Invitations & Confirmation" },
  { key: "participation_Notification_And_Communication", label: "Participation Notification & Communication" },
  { key: "newspaper_Engagement", label: "Newspaper Engagement (Event Column)" },
  { key: "flexBanner_Design_And_Installation", label: "Flex Banner Design & Installation" },
  { key: "website_And_SocialMedia_PreEventUpdates", label: "Website & Social Media Pre-Event Updates" },
  { key: "Signage_And_DirectionalBoards_Placement", label: "Signage & Directional Boards Placement" },
  { key: "HallSetup_And_TechnicalRequirements", label: "Hall Setup & Technical Requirements" },
  { key: "FloaralArrangements_Mementos_Shawl_ReturnGifts", label: "Floral Arrangements, Mementos, Shawl, Return Gifts" },
  { key: "Reception_Desk_And_Welcome_Setup", label: "Reception Desk & Welcome Setup" },
  { key: "Tree_Plantation_Ceremony", label: "Tree Plantation Ceremony" },
  { key: "Guest_Reception_At_Campus", label: "Guest Reception At Campus" },
  { key: "Lift_Coordinator_Assigned", label: "Lift Coordinator Assigned" },
  { key: "Guest_BookSigning_And_2Min_VideoByte", label: "Guest Book Signing & 2-Min Video Byte" },
  { key: "Photography_And_Videography_Coverage", label: "Photography & Videography Coverage" },
  { key: "EventReport_Preparation_And_Submission", label: "Event Report Preparation & Submission" },
  { key: "Website_And_SocialMedia_PostEventUpdates", label: "Website and Social Media Post-Event Updates" },
  { key: "Certificate_For_Guest_Participants_Or_Feedback_From_The_Participants", label: "Certificate for Guest & Participants / Feedback From The Participants" },
];

const Others = () => {
  const itemsPerPage = 9;
  const totalPages = Math.ceil(checklistItems.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const [formData, setFormData] = useState(
    checklistItems.reduce((acc, item) => {
      acc[item.key] = { required: "", inCharge: "", date: "" };
      return acc;
    }, {})
  );

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const visibleItems = checklistItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleChange = (key, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    return checklistItems.every((item) => {
      const { required, inCharge, date } = formData[item.key];
      return required && inCharge.trim() && date;
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setMessage("Please fill all fields!");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/submit-checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Submitted successfully!");
        setMessageType("success");
        console.log(await response.json());
      } else {
        setMessage("Submission failed!");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error!");
      setMessageType("error");
    }
  };

  return (
    <>
      

      <div className="nav">
        <Navbar />
        <EventNav />
      </div>

      {message && <div className={`message-box ${messageType}`}>{message}</div>}

      <div className="others-container">
        <div className="table-section">
          <h2 className="ot-title">EVENT CHECKLIST</h2>
          <table className="checklist-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>ACTIVITY</th>
                <th>REQUIRED</th>
                <th>IN-CHARGE</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {visibleItems.map((item, index) => (
                <tr key={item.key}>
                  <td>{currentPage * itemsPerPage + index + 1}</td>
                  <td>{item.label}</td>
                  <td>
                    <select
                      value={formData[item.key].required}
                      onChange={(e) =>
                        handleChange(item.key, "required", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="yes">YES</option>
                      <option value="no">NO</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="In-charge"
                      value={formData[item.key].inCharge}
                      onChange={(e) =>
                        handleChange(item.key, "inCharge", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData[item.key].date}
                      onChange={(e) =>
                        handleChange(item.key, "date", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="btn-row">
            {currentPage === 0 && (
              <button className="next-btn" onClick={() => setCurrentPage(1)}>
                Next {">>"}
              </button>
            )}
            {currentPage === 1 && (
              <>
                <button className="prev-btn" onClick={() => setCurrentPage(0)}>
                  {"<<"} Prev
                </button>
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Others;
