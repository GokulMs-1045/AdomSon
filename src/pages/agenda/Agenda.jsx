import React, { useEffect, useState } from "react";
import "../agenda/agenda.css";

const Agenda = () => {
  const [objectives, setObjectives] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [brochure, setBrochure] = useState(null);
  const [sessionCount, setSessionCount] = useState("");
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    date: "",
    time: { from: "", to: "" },
    topic: "",
    speaker: "",
  });
  const [savedSessions, setSavedSessions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (sessionCount && !isNaN(sessionCount) && sessionCount > 0) {
      const count = Math.min(10, Math.max(1, Number(sessionCount)));
      const updatedSessions = Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        date: sessions[index]?.date || "",
        time: sessions[index]?.time || { from: "", to: "" },
        topic: sessions[index]?.topic || "",
        speaker: sessions[index]?.speaker || "",
      }));
      setSessions(updatedSessions);
      setSessionCount(count); // Ensure the state reflects the clamped value
    }
  }, [sessionCount]);

  const handleBrochureUpload = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.size <= 2 * 1024 * 1024 &&
      file.type === "application/pdf"
    ) {
      setBrochure(file);
    } else {
      alert("Please upload a PDF file under 2MB.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newSession.date &&
      newSession.time.from &&
      newSession.time.to &&
      newSession.topic &&
      newSession.speaker
    ) {
      const updatedSessions = [...sessions];
      const emptyIndex = updatedSessions.findIndex(
        (s) => !s.date && !s.time.from && !s.time.to && !s.topic && !s.speaker
      );
      if (emptyIndex !== -1) {
        updatedSessions[emptyIndex] = { ...newSession, id: emptyIndex + 1 };
        setSessions(updatedSessions);
        setSavedSessions([
          ...savedSessions,
          { ...newSession, id: savedSessions.length + 1 },
        ]);
        setNewSession({
          date: "",
          time: { from: "", to: "" },
          topic: "",
          speaker: "",
        });
      } else {
        alert("No empty session slots available.");
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleDelete = (id) => {
    const updatedSessions = sessions.map((session) =>
      session.id === id
        ? {
            ...session,
            date: "",
            time: { from: "", to: "" },
            topic: "",
            speaker: "",
          }
        : session
    );
    setSessions(updatedSessions);
  };

  const handleEdit = (id) => {
    const sessionToEdit = sessions.find((session) => session.id === id);
    setNewSession({
      ...sessionToEdit,
      time: {
        from: sessionToEdit.time.from || "",
        to: sessionToEdit.time.to || "",
      },
    });
    setEditingId(id);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (
      newSession.date &&
      newSession.time.from &&
      newSession.time.to &&
      newSession.topic &&
      newSession.speaker
    ) {
      const updatedSessions = sessions.map((session) =>
        session.id === editingId ? { ...newSession, id: editingId } : session
      );
      setSessions(updatedSessions);
      setSavedSessions(
        savedSessions.map((session) =>
          session.id === editingId ? { ...newSession, id: editingId } : session
        )
      );
      setNewSession({
        date: "",
        time: { from: "", to: "" },
        topic: "",
        speaker: "",
      });
      setEditingId(null);
    } else {
      alert("Please fill all fields.");
    }
  };

  const formatTimeWithPeriod = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const period = +hours >= 12 ? "PM" : "AM";
    const adjustedHours = +hours % 12 || 12;
    return `${adjustedHours}:${minutes} ${period}`;
  };

  return (
    <div className="agenda-container">
      <h2 className="section-title">Agenda (Section)</h2>

        <label>Objectives of the Event (in 200 words):</label>
      <div className="form-group">
        <textarea
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          maxLength={200}
          placeholder="Enter objectives..."
          className="textarea"
        />
      </div>

        <label>Outcomes of the Event (in 200 words):</label>
      <div className="form-group">
        <textarea
          value={outcomes}
          onChange={(e) => setOutcomes(e.target.value)}
          maxLength={200}
          placeholder="Enter outcomes..."
          className="textarea"
        />
      </div>

        <label>
          Proposed Event - Brochure / Poster (Only in PDF under 2MB):
        </label>
      <div className="form-group inline-label">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleBrochureUpload}
        />
        {brochure && <button className="view-btn">View</button>}
      </div>

      <div className="session-details">
        <h3>Technical Session Details:</h3>
        <div className="session-count">
          <label>No. of Sessions:</label>
          <input
            type="number"
            value={sessionCount}
            onChange={(e) => setSessionCount(e.target.value)}
            min="1"
            max="10"
            className="session-input"
            placeholder="Enter number"
          />
        </div>
        <p>Date: From Event Info. - Section</p>
        <form onSubmit={editingId ? handleSaveEdit : handleSubmit}>
          <div className="input-group">
            <input
              type="date"
              value={newSession.date}
              onChange={(e) =>
                setNewSession({ ...newSession, date: e.target.value })
              }
              placeholder="Date"
            />
            <div className="time-inputs">
              <input
                type="time"
                value={newSession.time.from}
                onChange={(e) =>
                  setNewSession({
                    ...newSession,
                    time: { ...newSession.time, from: e.target.value },
                  })
                }
                step="3600"
                placeholder="From"
              />
              <span>to</span>
              <input
                type="time"
                value={newSession.time.to}
                onChange={(e) =>
                  setNewSession({
                    ...newSession,
                    time: { ...newSession.time, to: e.target.value },
                  })
                }
                step="3600"
                placeholder="To"
              />
            </div>
            <input
              value={newSession.topic}
              onChange={(e) =>
                setNewSession({ ...newSession, topic: e.target.value })
              }
              placeholder="Topic"
            />
            <input
              value={newSession.speaker}
              onChange={(e) =>
                setNewSession({ ...newSession, speaker: e.target.value })
              }
              placeholder="Speaker"
            />
            <button type="submit" className="view-btn eighth-btn">
              {editingId ? "Save Edit" : "Save"}
            </button>
          </div>
        </form>
        <table className="session-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Session Title / Topic</th>
              <th>Name of the Speaker</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id}>
                <td style={{ width: "5%" }}>{session.id}</td>
                <td>{session.date}</td>
                <td>
                  {session.time.from && session.time.to
                    ? `${formatTimeWithPeriod(
                        session.time.from
                      )} to ${formatTimeWithPeriod(session.time.to)}`
                    : ""}
                </td>

                <td>{session.topic}</td>
                <td>{session.speaker}</td>
                <td>
                  {session.date ||
                  session.time.from ||
                  session.time.to ||
                  session.topic ||
                  session.speaker ? (
                    <>
                      <button
                        className="view-btn edit-btn"
                        onClick={() => handleEdit(session.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="view-btn delete-btn"
                        onClick={() => handleDelete(session.id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agenda;
