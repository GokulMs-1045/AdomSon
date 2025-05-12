import React, { useState } from "react";
import "./inbox.css";

const Inbox = () => {
  // Mock data matching your structure
  const mockEvents = [
    {
      _id: { $oid: "681ae9cf3aa0051a9ad49d2f" },
      eventId: "EVT-20250505-XYZ123",
      eventInfo: {
        userId: "507f1f77bcf86cd799439011",
        eventOrganizingInstitution: "Sree Sastha Institute",
        department: "Computer Science",
        title: "Tech Symposium 2025",
        eventNature: "Symposium",
        eventScope: "National",
        fundingSource: "Management Funding",
        venue: "Main Auditorium",
        intendedAudience: "Students and Faculty",
        eventStartDate: "2025-05-10",
        eventEndDate: "2025-05-12",
        totalDays: "3",
        eventStartTime: "09:00",
        eventEndTime: "17:00",
        leadCoOrdinator: "Dr. John Doe",
        facultyCoOrdinator: "Prof. Jane Smith",
        name_Of_The_Speaker: "Mr. Alex Brown",
        designation: "Senior Engineer",
        affiliated_Organization: "Tech Corp",
        contactNumber: "1234567890",
        estimated_Student_Participation: "200",
        estimated_Faculty_Participation: "50",
        total_Expected_Attendence: "250",
        guest_Accomodation: "Yes",
        guest_Transportation: "Yes",
        guest_Food: "Yes",
      },
      infraAndTech: {
        equipment: "Projector",
        quantity: 2,
      },
      hodApprovalStatus: "Pending",
      principalApprovalStatus: "Approved",
      suggestions: "",
    },
    {
      _id: { $oid: "681ae9cf3aa0051a9ad49d30" },
      eventId: "EVT-20250506-ABC456",
      eventInfo: {
        userId: "507f1f77bcf86cd799439012",
        eventOrganizingInstitution: "Sree Sastha Institute",
        department: "Data Science",
        title: "AI Workshop 2025",
        eventNature: "Workshop",
        eventScope: "International",
        fundingSource: "Department Funding",
        venue: "Seminar Hall",
        intendedAudience: "Research Scholars",
        eventStartDate: "2025-06-15",
        eventEndDate: "2025-06-16",
        totalDays: "2",
        eventStartTime: "10:00",
        eventEndTime: "16:00",
        leadCoOrdinator: "Dr. Sarah Lee",
        facultyCoOrdinator: "Prof. Michael Chen",
        name_Of_The_Speaker: "Dr. Robert Taylor",
        designation: "AI Researcher",
        affiliated_Organization: "DeepMind",
        contactNumber: "9876543210",
        estimated_Student_Participation: "150",
        estimated_Faculty_Participation: "30",
        total_Expected_Attendence: "180",
        guest_Accomodation: "No",
        guest_Transportation: "Yes",
        guest_Food: "Yes",
      },
      infraAndTech: {
        equipment: "Laptops",
        quantity: 50,
      },
      hodApprovalStatus: "Pending",
      principalApprovalStatus: "Pending",
      suggestions: "Consider reducing duration to 1 day",
    },
  ];

  const [events, setEvents] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSuggestionChange = (eventId, newSuggestion) => {
    setEvents(
      events.map((event) =>
        event.eventId === eventId
          ? { ...event, suggestions: newSuggestion }
          : event
      )
    );
  };

  const handleApprove = (eventId) => {
    setEvents(
      events.map((e) =>
        e.eventId === eventId ? { ...e, hodApprovalStatus: "Approved" } : e
      )
    );
    alert("Event approved successfully!");
  };

  const handleSuggest = (eventId) => {
    const event = events.find((e) => e.eventId === eventId);
    if (event.suggestions) {
      alert("Suggestions submitted: " + event.suggestions);
    } else {
      alert("Please add suggestions before submitting");
    }
  };

  const handleView = (eventId) => {
    const event = events.find((e) => e.eventId === eventId);
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

 return (
  <div className="page-container1">
    <header className="page-header">
      <h1>HOD Inbox</h1>
    </header>

    <main className="content-container1">
      <div className="event-cards-container1">
        {events.map((event) => (
          <div key={event.eventId} className="event-card1">
            <div className="event-header1">
              <h3>{event.eventId}</h3>
              <span className={`status-badge ${event.hodApprovalStatus.toLowerCase()}`}>
                {event.hodApprovalStatus}
              </span>
            </div>

            <div className="event-details1">
              <p><strong>{event.eventInfo.title}</strong></p>
              <p>{event.eventInfo.department}</p>
              <p>
                {new Date(event.eventInfo.eventStartDate).toLocaleDateString()} - {' '}
                {new Date(event.eventInfo.eventEndDate).toLocaleDateString()} | {' '}
                {event.eventInfo.eventStartTime} - {event.eventInfo.eventEndTime}
              </p>
              <p>Venue: {event.eventInfo.venue}</p>
            </div>

            <div className="event-status1">
              <textarea
                value={event.suggestions}
                onChange={(e) => handleSuggestionChange(event.eventId, e.target.value)}
                placeholder="Add suggestions..."
                rows="3"
                className="suggestions-textarea"
              />
            </div>

            <div className="event-buttons1">
              <button
                className="approve-button"
                onClick={() => handleApprove(event.eventId)}
                disabled={event.hodApprovalStatus === "Approved"}
              >
                ✓ Approve
              </button>
              <button
                className="suggest-button"
                onClick={() => handleSuggest(event.eventId)}
              >
                ✎ Suggest
              </button>
              <button
                className="view-button"
                onClick={() => handleView(event.eventId)}
              >
                👁 View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              ×
            </button>

            <div className="form-row1">
              <div className="title-row">
                <div className="form-field">
                  <div className="centered-title">
                    {selectedEvent?.eventInfo?.title}
                    <div className="dotted-line"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-header">
              <h2>Event Outline & Summary Sheet</h2>
            </div>
            
            <div className="model-id-c">
              <div className="event-form">
                {/* E_ID */}
                <div className="form-row1">
                  <div className="form-field">
                    <label>E_ID:</label>
                    <div className="form-value">
                      {selectedEvent.eventId || "N/A"}
                    </div>
                  </div>
                </div>

                {/* General Information Section */}
                <div className="form-section">
                  <h3>General Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Organizing Institution:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.eventOrganizingInstitution}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Department:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.department}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Event Title:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.title}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Event Nature:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.eventNature}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Event Scope:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.eventScope}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Funding Source:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.fundingSource}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Schedule Section */}
                <div className="form-section">
                  <h3>Event Schedule</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Start Date:</label>
                      <div className="form-value">
                        {new Date(selectedEvent.eventInfo.eventStartDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>End Date:</label>
                      <div className="form-value">
                        {new Date(selectedEvent.eventInfo.eventEndDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Total Days:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.totalDays}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Start Time:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.eventStartTime}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>End Time:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.eventEndTime}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Venue:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.venue}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Intended Audience:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.intendedAudience}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coordinators Section */}
                <div className="form-section">
                  <h3>Coordinators</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Lead Coordinator:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.leadCoOrdinator}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Faculty Coordinator:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.facultyCoOrdinator}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Speaker Details Section */}
                <div className="form-section">
                  <h3>Speaker Details</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Name:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.name_Of_The_Speaker}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Designation:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.designation}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Organization:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.affiliated_Organization}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Contact Number:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.contactNumber}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Participation Details */}
                <div className="form-section">
                  <h3>Participation Details</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Estimated Students:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.estimated_Student_Participation}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Estimated Faculty:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.estimated_Faculty_Participation}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Total Expected:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.total_Expected_Attendence}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guest Arrangements */}
                <div className="form-section">
                  <h3>Guest Arrangements</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Accommodation:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.guest_Accomodation}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Transportation:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.guest_Transportation}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Food:</label>
                      <div className="form-value">
                        {selectedEvent.eventInfo.guest_Food}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Infrastructure Requirements */}
                <div className="form-section">
                  <h3>Infrastructure Requirements</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Equipment:</label>
                      <div className="form-value">
                        {selectedEvent.infraAndTech.equipment}
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Quantity:</label>
                      <div className="form-value">
                        {selectedEvent.infraAndTech.quantity}
                      </div>
                    </div>
                  </div>
                </div>

                {/* HOD Suggestions */}
                <div className="form-section">
                  <h3>HOD Suggestions</h3>
                  <div className="form-field full-width">
                    <div className="form-value suggestions-box">
                      {selectedEvent.suggestions || "No suggestions provided yet"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  </div>
);
}
export default Inbox;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./inbox.css";

// const Inbox = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch events from database
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get("/api/events/inbox");
//         // Ensure we always have an array, even if response.data is null/undefined
//         setEvents(Array.isArray(response?.data) ? response.data : []);
//       } catch (err) {
//         setError("Failed to load events. Please try again later.");
//         console.error("Error fetching events:", err);
//         setEvents([]); // Set to empty array on error
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const handleSuggestionChange = (eventId, newSuggestion) => {
//     setEvents(
//       events.map((event) =>
//         event.eventId === eventId ? { ...event, suggestions: newSuggestion } : event
//       )
//     );
//   };

//   const handleApprove = async (eventId) => {
//     try {
//       await axios.put(`/api/events/${eventId}/approve`);
//       setEvents(
//         events.map((e) =>
//           e.eventId === eventId ? { ...e, hodApprovalStatus: "Approved" } : e
//         )
//       );
//     } catch (err) {
//       alert("Failed to approve event. Please try again.");
//       console.error("Error approving event:", err);
//     }
//   };

//   const handleSuggest = async (eventId) => {
//     try {
//       const event = events.find((e) => e.eventId === eventId);
//       if (!event.suggestions) {
//         alert("Please add suggestions before submitting");
//         return;
//       }
      
//       await axios.put(`/api/events/${eventId}/suggest`, {
//         suggestions: event.suggestions
//       });
//       alert("Suggestions submitted successfully!");
//     } catch (err) {
//       alert("Failed to submit suggestions. Please try again.");
//       console.error("Error submitting suggestions:", err);
//     }
//   };

//   const handleView = async (eventId) => {
//     try {
//       const response = await axios.get(`/api/events/${eventId}`);
//       setSelectedEvent(response.data);
//       setShowModal(true);
//     } catch (err) {
//       alert("Failed to load event details. Please try again.");
//       console.error("Error fetching event details:", err);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedEvent(null);
//   };

//   if (loading) return <div className="loading">Loading events...</div>;
//   if (error) return <div className="error">{error}</div>;
//   if (events.length === 0) return <div className="no-events">No events found in your inbox.</div>;

//   return (
//     <div className="page-container1">
//       <header className="page-header">
//         <h1>HOD Inbox</h1>
//       </header>

//       <main className="content-container1">
//         <div className="event-cards-container1">
//           {events.map((event) => (
//             <div key={event.eventId} className="event-card1">
//               <div className="event-header1">
//                 <h3>{event.eventId}</h3>
//                 <span className={`status-badge ${event.hodApprovalStatus.toLowerCase()}`}>
//                   {event.hodApprovalStatus}
//                 </span>
//               </div>

//               <div className="event-details1">
//                 <p><strong>{event.eventInfo.title}</strong></p>
//                 <p>{event.eventInfo.department}</p>
//                 <p>
//                   {new Date(event.eventInfo.eventStartDate).toLocaleDateString()} - {' '}
//                   {new Date(event.eventInfo.eventEndDate).toLocaleDateString()} | {' '}
//                   {event.eventInfo.eventStartTime} - {event.eventInfo.eventEndTime}
//                 </p>
//                 <p>Venue: {event.eventInfo.venue}</p>
//               </div>

//               <div className="event-status1">
//                 <textarea
//                   value={event.suggestions || ""}
//                   onChange={(e) => handleSuggestionChange(event.eventId, e.target.value)}
//                   placeholder="Add suggestions..."
//                   rows="3"
//                   className="suggestions-textarea"
//                 />
//               </div>

//               <div className="event-buttons1">
//                 <button
//                   className="approve-button"
//                   onClick={() => handleApprove(event.eventId)}
//                   disabled={event.hodApprovalStatus === "Approved"}
//                 >
//                   ✓ Approve
//                 </button>
//                 <button
//                   className="suggest-button"
//                   onClick={() => handleSuggest(event.eventId)}
//                 >
//                   ✎ Suggest
//                 </button>
//                 <button
//                   className="view-button"
//                   onClick={() => handleView(event.eventId)}
//                 >
//                   👁 View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {showModal && selectedEvent && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <button className="close-button" onClick={closeModal}>
//                 ×
//               </button>

//               <div className="form-row1">
//                 <div className="title-row">
//                   <div className="form-field">
//                     <div className="centered-title">
//                       {selectedEvent?.eventInfo?.title}
//                       <div className="dotted-line"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="modal-header">
//                 <h2>Event Outline & Summary Sheet</h2>
//                 <div className="approval-status">
//                   <span>HOD Status: <strong>{selectedEvent.hodApprovalStatus}</strong></span>
//                   <span>Principal Status: <strong>{selectedEvent.principalApprovalStatus}</strong></span>
//                 </div>
//               </div>
              
//               <div className="model-id-c">
//                 <div className="event-form">
//                   {/* E_ID */}
//                   <div className="form-row1">
//                     <div className="form-field">
//                       <label>E_ID:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventId || "N/A"}
//                       </div>
//                     </div>
//                   </div>

//                   {/* General Information Section */}
//                   <div className="form-section">
//                     <h3>General Information</h3>
//                     <div className="form-grid">
//                       <div className="form-field">
//                         <label>Organizing Institution:</label>
//                         <div className="form-value">
//                           {selectedEvent.eventInfo.eventOrganizingInstitution}
//                         </div>
//                       </div>
//                       <div className="form-field">
//                         <label>Department:</label>
//                         <div className="form-value">
//                           {selectedEvent.eventInfo.department}
//                         </div>
//                       </div>
//                       <div className="form-field">
//                         <label>Event Title:</label>
//                         <div className="form-value">
//                           {selectedEvent.eventInfo.title}
//                         </div>
//                       </div>
//                       <div className="form-field">
//                         <label>Event Nature:</label>
//                         <div className="form-value">
//                           {selectedEvent.eventInfo.eventNature}
//                         </div>
//                       </div>
//                       <div className="form-field">
//                         <label>Event Scope:</label>
//                         <div className="form-value">
//                           {selectedEvent.eventInfo.eventScope}
//                         </div>
//                       </div>
//                       <div className="form-field">
//                         <label>Funding Source:</label>
//                         <div className="form-value">
//                           {selectedEvent.eventInfo.fundingSource}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {/* Event Schedule Section */}
//                 <div className="form-section">
//                   <h3>Event Schedule</h3>
//                   <div className="form-grid">
//                     <div className="form-field">
//                       <label>Start Date:</label>
//                       <div className="form-value">
//                         {new Date(selectedEvent.eventInfo.eventStartDate).toLocaleDateString()}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>End Date:</label>
//                       <div className="form-value">
//                         {new Date(selectedEvent.eventInfo.eventEndDate).toLocaleDateString()}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Total Days:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.totalDays}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Start Time:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.eventStartTime}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>End Time:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.eventEndTime}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Venue:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.venue}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Intended Audience:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.intendedAudience}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Coordinators Section */}
//                 <div className="form-section">
//                   <h3>Coordinators</h3>
//                   <div className="form-grid">
//                     <div className="form-field">
//                       <label>Lead Coordinator:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.leadCoOrdinator}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Faculty Coordinator:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.facultyCoOrdinator}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Speaker Details Section */}
//                 <div className="form-section">
//                   <h3>Speaker Details</h3>
//                   <div className="form-grid">
//                     <div className="form-field">
//                       <label>Name:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.name_Of_The_Speaker}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Designation:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.designation}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Organization:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.affiliated_Organization}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Contact Number:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.contactNumber}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Participation Details */}
//                 <div className="form-section">
//                   <h3>Participation Details</h3>
//                   <div className="form-grid">
//                     <div className="form-field">
//                       <label>Estimated Students:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.estimated_Student_Participation}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Estimated Faculty:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.estimated_Faculty_Participation}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Total Expected:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.total_Expected_Attendence}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Guest Arrangements */}
//                 <div className="form-section">
//                   <h3>Guest Arrangements</h3>
//                   <div className="form-grid">
//                     <div className="form-field">
//                       <label>Accommodation:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.guest_Accomodation}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Transportation:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.guest_Transportation}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Food:</label>
//                       <div className="form-value">
//                         {selectedEvent.eventInfo.guest_Food}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Infrastructure Requirements */}
//                 <div className="form-section">
//                   <h3>Infrastructure Requirements</h3>
//                   <div className="form-grid">
//                     <div className="form-field">
//                       <label>Equipment:</label>
//                       <div className="form-value">
//                         {selectedEvent.infraAndTech.equipment}
//                       </div>
//                     </div>
//                     <div className="form-field">
//                       <label>Quantity:</label>
//                       <div className="form-value">
//                         {selectedEvent.infraAndTech.quantity}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* HOD Suggestions */}
//                 <div className="form-section">
//                   <h3>HOD Suggestions</h3>
//                   <div className="form-field full-width">
//                     <div className="form-value suggestions-box">
//                       {selectedEvent.suggestions || "No suggestions provided yet"}
//                     </div>
//                   </div>
//                 </div>

//                   {/* Other sections remain the same as before */}
//                   {/* ... (keep all other sections from your original modal) ... */}
                  
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Inbox;
