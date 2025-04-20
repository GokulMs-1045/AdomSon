import React, { useState } from 'react';
import '../main/main.css';

const EventForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numDays, setNumDays] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleDateChange = (start, end) => {
    if (start && end) {
      const diffTime = new Date(end) - new Date(start);
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setNumDays(days > 0 ? days : '');
    }
  };

  return (
    <form className="event-form">
      <h2 className="section-title">Event Details & Scheduling</h2>

      {/* Row 1 */}
      <div className="form-row">
        <div className="form-group">
          <select id="institution" required defaultValue="">
            <option value="" disabled hidden></option>
            <option value="SSEI">SSEI</option>
            <option value="Engg & Tech">Engg & Tech</option>
            <option value="Phamacy">Phamacy</option>
            <option value="AHS">AHS</option>
            <option value="Aakam">Aakam</option>
            <option value="Nursing">Nursing</option>
            <option value="HI">HI</option>
            <option value="Others">Others</option>

          </select>
          <label htmlFor="institution">Event Organizing Institution</label>
        </div>

        <div className="form-group">
          <select id="organizingDept" required defaultValue="">
            <option value="" disabled hidden></option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="AI&DS">AI&DS</option>
            <option value="Cyber">Cyber</option>
            <option value="Mech">Mech</option>
            <option value="Agri">Agri</option>
            <option value="SNH">SNH</option>

          </select>
          <label htmlFor="organizingDept">Organizing Dept.</label>
        </div>

        <div className="form-group">
          <select id="nature" required defaultValue="">
            <option value="" disabled hidden></option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Guest Lecture">Guest Lecture</option>
            <option value="Conference">Conference</option>
            <option value="Symposium">Symposium</option>
            <option value="FDP">FDP</option>
            <option value="Others">Others</option>

          </select>
          <label htmlFor="nature">Nature of the Event</label>
        </div>

        <div className="form-group">
          <select id="venueType" required defaultValue="">
            <option value="" disabled hidden></option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <label htmlFor="venueType">Event Venue Type</label>
        </div>
      </div>

      {/* Row 2 */}
      <div className="form-row">
        <div className="form-group">
          <input id="title" required placeholder=" " />
          <label htmlFor="title">Title of the Event</label>
        </div>

        <div className="form-group">
          <select id="scope" required defaultValue="">
            <option value="" disabled hidden></option>
            <option value="Department">Department</option>
            <option value="Institution">Institution</option>
            <option value="State">State</option>
            <option value="Regional">Regional</option>
            <option value="National">National</option>
            <option value="International">International</option>

          </select>
          <label htmlFor="scope">Scope of the Event</label>
        </div>

        <div className="form-group">
          <select id="funding" required defaultValue="">
            <option value="" disabled hidden></option>
            <option value="Management">Management</option>
            <option value="Funding Agency">Funding Agency</option>
          </select>
          <label htmlFor="funding">Funding Source</label>
        </div>
      </div>

      {/* Row 3 */}
      <div className="form-row">
        <div className="form-group">
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              handleDateChange(e.target.value, endDate);
            }}
            required
            placeholder=" "
          />
          <label htmlFor="startDate">Start Date</label>
        </div>

        <div className="form-group">
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              handleDateChange(startDate, e.target.value);
            }}
            required
            placeholder=" "
          />
          <label htmlFor="endDate">End Date</label>
        </div>

        <div className="form-group">
          <input
            id="numDays"
            value={numDays}
            readOnly
            placeholder=" "
          />
          <label htmlFor="numDays">No. of Days</label>
        </div>
      </div>

      {/* Row 4 */}
        <div className="form-row">
          <div className="form-group">
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="startTime">Start Time</label>
          </div>

          <div className="form-group">
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="endTime">End Time</label>
          </div>
        </div>


      {/* Row 5 */}
      <div className="form-row">
        <div className="form-group">
          <select id="venue" required defaultValue="">
            <option value="" disabled hidden></option>
            <option value="Auditorium">Auditorium</option>
            <option value="Seminar Hall">Seminar Hall</option>
          </select>
          <label htmlFor="venue">Venue</label>
        </div>

        <div className="form-group">
          <select id="audience" required defaultValue="">
            <option value="" disabled hidden></option>
            <option value="Students">Students</option>
            <option value="Faculty">Faculty</option>
            <option value="Both">Both</option>
          </select>
          <label htmlFor="audience">Intended Audience</label>
        </div>

        <div className="form-group">
          <input id="leadCoordinator" required placeholder=" " />
          <label htmlFor="leadCoordinator">Lead Coordinator</label>
        </div>

        <div className="form-group">
          <input id="facultyCoordinators" required placeholder=" " />
          <label htmlFor="facultyCoordinators">Faculty Coordinators</label>
        </div>
      </div>

      <hr />
      <h2 className="section-title">Speaker & Participant Details</h2>
      <h3 className="subsection-title">Speaker Details</h3>

      {/* Speaker Details */}
      <div className="form-row">
        <div className="form-group">
          <input id="speakerName" required placeholder=" " />
          <label htmlFor="speakerName">Name of the Speaker</label>
        </div>
        <div className="form-group">
          <input id="designation" required placeholder=" " />
          <label htmlFor="designation">Designation</label>
        </div>
        <div className="form-group">
          <input id="affiliatedOrg" required placeholder=" " />
          <label htmlFor="affiliatedOrg">Affiliated / Organization</label>
        </div>
        <div className="form-group">
          <input id="contactNumber" required placeholder=" " />
          <label htmlFor="contactNumber">Contact Number</label>
        </div>
        <div className="form-group">
          <input id="email" type="email" required placeholder=" " />
          <label htmlFor="email">Email</label>
        </div>
      </div>

      <hr />
      {/* Participant Details */}
      <h3 className="subsection-title">Participant Details</h3>
      <div className="form-row">
        <div className="form-group">
          <input id="studentParticipation" required placeholder=" " />
          <label htmlFor="studentParticipation">Estimated Student Participation</label>
        </div>
        <div className="form-group">
          <input id="facultyParticipation" required placeholder=" " />
          <label htmlFor="facultyParticipation">Estimated Faculty Participation</label>
        </div>
        <div className="form-group">
          <input id="totalAttendees" required placeholder=" " />
          <label htmlFor="totalAttendees">Total Expected Attendees</label>
        </div>
      </div>
  
      <br />

      {/* Guest & Logistics */}
      <div className="form-row">
        <div className="form-group">
          <select id="guestAccommodation" required defaultValue="">
            <option value="" disabled hidden></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <label htmlFor="guestAccommodation">Guest Accommodation</label>
        </div>
        <div className="form-group">
          <select id="guestTransport" required defaultValue="">
            <option value="" disabled hidden></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <label htmlFor="guestTransport">Guest Transportation</label>
        </div>
        <div className="form-group">
          <select id="dining" required defaultValue="">
            <option value="" disabled hidden></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <label htmlFor="dining">Dining Arrangements</label>
        </div>
      </div>

      <div className="form-row">
        <button type="submit" className="eventinfo-submit-btn">Save</button>
      </div>
    </form>
  );
};

export default EventForm;
