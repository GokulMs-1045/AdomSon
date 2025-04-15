import React from 'react';
import './InfraTechSetup.css';

export default function InfraTechSetup() {
  const handleSave = () => {
    // Placeholder for future save logic
    alert("Form saved successfully!");
  };

  return (
    <div className="infra-container">
      <h2 className="section-title1">Infra & Technical Setup</h2>

      <div>
        <h3 className="section-header">Audio-Visual Setup</h3>
        <div className="form-row">
          <div className="floating-label">
            <select required>
              <option value="" disabled selected></option>
              <option>Handheld</option>
              <option>Collar</option>
              <option>Both</option>
              <option>Not Required</option>
            </select>
            <label>Microphone Type</label>
          </div>
          <div className="floating-label">
            <select required>
              <option value="" disabled selected></option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <label>Speakers</label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="section-header">Facility & Comfort</h3>
        <div className="form-row">
          <div className="floating-label">
            <select required>
              <option value="" disabled selected></option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <label>Air Conditioning</label>
          </div>
          <div className="floating-label1">
            <input type="text" required />
            <label>Number of AC Units</label>
          </div>
        </div>
        <div className="form-group">
          <div className="floating-label">
            <input type="text" required />
            <label>Additional Ventilation</label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="section-header">Presentation & Writing Materials</h3>
        <div className="form-row">
          <div className="floating-label">
            <select required>
              <option value="" disabled selected></option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <label>Projector & Screen</label>
          </div>
          <div className="floating-label">
            <select required>
              <option value="" disabled selected></option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <label>Whiteboard</label>
          </div>
        </div>
        <div className="form-group">
          <div className="floating-label">
            <input type="text" required />
            <label>Additional Writing Materials</label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="section-header">Recording & Documentation</h3>
        <div className="form-row">
          <div className="floating-label">
            <select required>
              <option value="" disabled selected></option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <label>Photography</label>
          </div>
          <div className="floating-label">
            <select required>
              <option value="" disabled selected></option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <label>Videography</label>
          </div>
        </div>
        <div className="form-row">
          <div className="floating-label">
            <select required>
              <option value="" disabled selected></option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <label>Professional Lighting Setup</label>
          </div>
          <div className="floating-label">
            <select required>
              <option value="" disabled selected></option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <label>Live Streaming</label>
          </div>
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>Save</button>
    </div>
  );
}
