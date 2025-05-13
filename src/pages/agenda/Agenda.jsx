import React, { useState, useEffect } from "react";
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
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize sessions based on session count
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
      setSessionCount(count);
    }
  }, [sessionCount]);

  const handleBrochureUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024 && file.type === "application/pdf") {
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
      if (editingId) {
        // Update existing session
        setSessions(sessions.map(session => 
          session.id === editingId ? { ...newSession, id: editingId } : session
        ));
      } else {
        // Find first empty session slot
        const emptyIndex = sessions.findIndex(
          s => !s.date && !s.time.from && !s.time.to && !s.topic && !s.speaker
        );
        
        if (emptyIndex !== -1) {
          const updatedSessions = [...sessions];
          updatedSessions[emptyIndex] = { ...newSession, id: emptyIndex + 1 };
          setSessions(updatedSessions);
        } else {
          alert("No empty session slots available.");
          return;
        }
      }
      
      // Reset form
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

  const handleDelete = (id) => {
    setSessions(sessions.map(session =>
      session.id === id
        ? {
            ...session,
            date: "",
            time: { from: "", to: "" },
            topic: "",
            speaker: "",
          }
        : session
    ));
  };

  const handleEdit = (id) => {
    const sessionToEdit = sessions.find(session => session.id === id);
    if (sessionToEdit) {
      setNewSession({
        date: sessionToEdit.date,
        time: { ...sessionToEdit.time },
        topic: sessionToEdit.topic,
        speaker: sessionToEdit.speaker,
      });
      setEditingId(id);
    }
  };

  const formatTimeWithPeriod = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const period = +hours >= 12 ? "PM" : "AM";
    const adjustedHours = +hours % 12 || 12;
    return `${adjustedHours}:${minutes} ${period}`;
  };

  
    const handleSaveAll = async () => {
      if (!objectives || !outcomes || sessions.length === 0) {
        alert("Please fill all required fields and add at least one session");
        return;
      }
    
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('objectives', objectives);
        formData.append('outcomes', outcomes);
        
        if (brochure) {
          formData.append('brochure', brochure);
        }
        
        formData.append(
          'sessions', 
          JSON.stringify(
            sessions.filter(s => {
              return s.date && s.time.from && s.time.to && s.topic && s.speaker;
            })
          )
        );
    
        const response = await fetch('https://your-api-endpoint.com/agenda', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        alert('Agenda data saved successfully!');
      } catch (error) {
        console.error('Error saving agenda data:', error);
        alert('Failed to save agenda data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="agenda-container">
      <h2 className="obj-title">Objective of the event</h2>
      <label>Objectives of the Event (in 200 words):</label>
      <div className="form-group">
        <textarea
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          maxLength={200}
          placeholder="Enter objectives..."
          className="textarea"
          required
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
          required
        />
      </div>

      <label>Proposed Event - Brochure / Poster (Only in PDF under 2MB):</label>
      <div className="form-group inline-label choosefile">
        <input
          className="choosefile"
          type="file"
          accept="application/pdf"
          onChange={handleBrochureUpload}
        />
        {brochure && (
          <button
            className="view-btn"
            onClick={() => window.open(URL.createObjectURL(brochure), '_blank')}
          >
            View
          </button>
        )}
      </div>
      <hr />

      <div className="session-details">
        <h3 className="tech-tit">Technical Session Details</h3>
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
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="date"
              value={newSession.date}
              onChange={(e) =>
                setNewSession({ ...newSession, date: e.target.value })
              }
              placeholder="Date"
              required
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
                required
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
                required
              />
            </div>
            <input
              value={newSession.topic}
              onChange={(e) =>
                setNewSession({ ...newSession, topic: e.target.value })
              }
              placeholder="Topic"
              required
            />
            <input
              className="speaker"
              value={newSession.speaker}
              onChange={(e) =>
                setNewSession({ ...newSession, speaker: e.target.value })
              }
              placeholder="Speaker"
              required
            />
            <button type="submit" className="view-btn eighth-btn save">
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
                  {(session.date || session.time.from || session.time.to || session.topic || session.speaker) ? (
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
        <button 
          className="view-btn-save-1" 
          onClick={handleSaveAll}
          disabled={isLoading || !sessions.some(s => 
            s.date && s.time.from && s.time.to && s.topic && s.speaker
          )}
        >
          {isLoading ? "Saving..." : "Save All Sessions"}
        </button>
      </div>
    </div>
  );
};

export default Agenda;
