import React, { useState, useEffect } from "react";
import "./FilterEvents.css";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const FilterEvents = () => {
  const data = [
    { label: "Event Period : select Dates from – To", children: [] },
    { label: "Select All", children: [] },
    { label: "Clear All", children: [] },
    { label: "Recorder Column", children: [] },
    {
      label: "Organizing Institution",
      children: [
        "SSEI",
        "Engg & Tech",
        "Pharmacy",
        "AHS",
        "Aakam",
        "Nursing",
        "HI",
        "Others",
      ],
    },
    {
      label: "Organizing Department",
      children: ["CSE", "IT", "AI&DS", "Cyber", "Mech", "Agri", "SNH"],
    },
    {
      label: "Nature of the Event",
      children: [
        "Seminar",
        "Workshop",
        "Guest Lecture",
        "Conference",
        "Symposium",
        "FDP",
        "Others",
      ],
    },
    {
      label: "Scope of the Event",
      children: [
        "Department",
        "Institution",
        "State",
        "Regional",
        "National",
        "International",
      ],
    },
    { label: "Funding Source", children: ["Management", "Funding Agency"] },
    { label: "Title of the Event", children: [] },
    { label: "Objectives of the Event", children: [] },
    { label: "Outcomes of the Event", children: [] },
    { label: "Number of Days", children: [] },
    { label: "Lead Coordinator (Faculty ID)", children: [] },
    { label: "Resource Person", children: [] },
    { label: "Event Status", children: [] },
  ];

  const [selected, setSelected] = useState({});
  const [expanded, setExpanded] = useState({});
  const [childSelected, setChildSelected] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);

  const toggleCheckbox = (label) => {
    if (label === "Select All") {
      const allSelected = {};
      const allChildSelected = {};
      const allExpanded = {};
      data.forEach((item) => {
        allSelected[item.label] = true;
        allExpanded[item.label] = true;
        item.children?.forEach((child) => {
          allChildSelected[`${item.label}-${child}`] = true;
        });
      });
      setSelected(allSelected);
      setExpanded(allExpanded);
      setChildSelected(allChildSelected);
    } else if (label === "Clear All") {
      setSelected({});
      setExpanded({});
      setChildSelected({});
      setInputValues({});
      setDateRange({ from: "", to: "" });
    } else {
      setSelected((prev) => {
        const newSelected = {
          ...prev,
          [label]: !prev[label],
          ["Select All"]: false,
        };

        const item = data.find((d) => d.label === label);

        // ✅ Always toggle expanded regardless of children
        setExpanded((prevExpanded) => ({
          ...prevExpanded,
          [label]: !prev[label],
        }));

        // ✅ Handle children selection if present
        if (item?.children?.length > 0) {
          const newChildSelected = { ...childSelected };
          item.children.forEach((child) => {
            const key = `${label}-${child}`;
            newChildSelected[key] = !prev[label];
          });
          setChildSelected(newChildSelected);
        }

        return newSelected;
      });
    }
  };

  const toggleExpand = (label) => {
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const toggleChild = (parentLabel, childLabel) => {
    const key = `${parentLabel}-${childLabel}`;
    setChildSelected((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInputChange = (label, value) => {
    setInputValues((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleDateChange = (type, value) => {
    setDateRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // const exportFilteredData = () => {
  //   const filtered = events
  //     .filter((event) => {
  //       const eventDate = new Date(event.date);
  //       const from = new Date(dateRange.from);
  //       const to = new Date(dateRange.to);

  //       const inDateRange =
  //         (!dateRange.from || eventDate >= from) &&
  //         (!dateRange.to || eventDate <= to);

  //       const facultyMatch = inputValues["Lead Coordinator (Faculty ID)"]
  //         ? event.faculty
  //             .toLowerCase()
  //             .includes(
  //               inputValues["Lead Coordinator (Faculty ID)"].toLowerCase()
  //             )
  //         : true;

  //       const venueMatch = inputValues["Resource Person"]
  //         ? event.venue
  //             .toLowerCase()
  //             .includes(inputValues["Resource Person"].toLowerCase())
  //         : true;

  //       return inDateRange && facultyMatch && venueMatch;
  //     })
  //     .map((event) => {
  //       const selectedFields = {};

  //       // Add only the fields that are selected
  //       if (selected["Lead Coordinator (Faculty ID)"]) {
  //         selectedFields.faculty = event.faculty;
  //       }
  //       if (selected["Resource Person"]) {
  //         selectedFields.venue = event.venue;
  //       }
  //       if (selected[dateField]) {
  //         selectedFields.date = event.date;
  //       }
  //       if (selected["Title of the Event"]) {
  //         selectedFields.eventName = event.eventName;
  //       }

  //       // Add more conditions if needed

  //       return selectedFields;
  //     });

  //   // Send to backend
  //   fetch("/save-filtered-events", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(filtered),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         alert("Filtered events saved successfully!");
  //       } else {
  //         alert("Failed to save filtered events.");
  //       }
  //     })
  //     .catch((err) => console.error("Error:", err));
  // };

  const downloadFilteredPDF = () => {
    // Step 1: Filter the events
    const filtered = events.filter((event) => {
      const eventDate = event.date ? new Date(event.date) : null;
      const from = dateRange.from ? new Date(dateRange.from) : null;
      const to = dateRange.to ? new Date(dateRange.to) : null;

      const inDateRange =
        (!from || (eventDate && eventDate >= from)) &&
        (!to || (eventDate && eventDate <= to));

      const facultyMatch = inputValues["Lead Coordinator (Faculty ID)"]
        ? event.faculty
            .toLowerCase()
            .includes(
              inputValues["Lead Coordinator (Faculty ID)"].toLowerCase()
            )
        : true;

      const venueMatch = inputValues["Resource Person"]
        ? event.venue
            .toLowerCase()
            .includes(inputValues["Resource Person"].toLowerCase())
        : true;

      return inDateRange && facultyMatch && venueMatch;
    });

    // Step 2: Only include checked fields
    const checkedFields = Object.keys(selected).filter((key) => selected[key]);

    const doc = new jsPDF();
    doc.setFontSize(12);

    if (filtered.length === 0) {
      doc.text("No filtered events found.", 10, 10);
    } else {
      let y = 10;
      filtered.forEach((event, index) => {
        checkedFields.forEach((field) => {
          if (field === "Event Period : select Dates from – To") return;

          let value = "";

          if (field === "Organizing Institution") value = event.institution;
          else if (field === "Organizing Department") value = event.department;
          else if (field === "Lead Coordinator (Faculty ID)")
            value = event.faculty;
          else if (field === "Resource Person") value = event.venue;
          else if (field === "Title of the Event") value = event.eventName;
          else if (field === "Number of Days") value = event.days;

          if (value) {
            doc.text(`${field}: ${value}`, 10, y);
            y += 7;
          }
        });

        y += 10; // gap between events
      });
    }

    doc.save("filtered_events.pdf");
  };

  const exportFilteredToExcel = () => {
    const filtered = events.filter((event) => {
      const eventDate = event.date ? new Date(event.date) : null;
      const from = dateRange.from ? new Date(dateRange.from) : null;
      const to = dateRange.to ? new Date(dateRange.to) : null;

      const inDateRange =
        (!from || (eventDate && eventDate >= from)) &&
        (!to || (eventDate && eventDate <= to));

      const facultyMatch = inputValues["Lead Coordinator (Faculty ID)"]
        ? event.faculty
            ?.toLowerCase()
            .includes(
              inputValues["Lead Coordinator (Faculty ID)"].toLowerCase()
            )
        : true;

      const venueMatch = inputValues["Resource Person"]
        ? event.venue
            ?.toLowerCase()
            .includes(inputValues["Resource Person"].toLowerCase())
        : true;

      return inDateRange && facultyMatch && venueMatch;
    });

    // Map all selected fields to their corresponding event properties
    const selectedFields = [];
    if (selected["Organizing Institution"]) selectedFields.push("institution");
    if (selected["Organizing Department"]) selectedFields.push("department");
    if (selected["Nature of the Event"]) selectedFields.push("nature");
    if (selected["Scope of the Event"]) selectedFields.push("scope");
    if (selected["Funding Source"]) selectedFields.push("funding");
    if (selected["Title of the Event"]) selectedFields.push("eventName");
    if (selected["Objectives of the Event"]) selectedFields.push("objectives");
    if (selected["Outcomes of the Event"]) selectedFields.push("outcomes");
    if (selected["Number of Days"]) selectedFields.push("days");
    if (selected["Lead Coordinator (Faculty ID)"])
      selectedFields.push("faculty");
    if (selected["Resource Person"]) selectedFields.push("venue");
    if (selected["Event Status"]) selectedFields.push("status");
    if (selected["Event Period : select Dates from – To"])
      selectedFields.push("date");

    // Include child selections if they exist
    data.forEach((item) => {
      if (selected[item.label] && item.children?.length > 0) {
        item.children.forEach((child) => {
          const childKey = `${item.label}-${child}`;
          if (childSelected[childKey]) {
            // Add logic here if child selections need to be included
          }
        });
      }
    });

    // Map filtered data to include only selected fields
    const dataToExport = filtered.map((event) => {
      const row = {};
      selectedFields.forEach((field) => {
        row[field] = event[field] || "";
      });
      return row;
    });

    // Convert to worksheet & download
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Events");

    XLSX.writeFile(workbook, "filtered_events.xlsx");
  };

  const inputFields = [
    "Title of the Event",
    "Number of Days",
    "Lead Coordinator (Faculty ID)",
    "Resource Person",
  ];

  const dateField = "Event Period : select Dates from – To";

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <div className="filter-container">
        <h3 className="column-title">Filter Events :</h3>

        {data.map((item, idx) => (
          <div key={idx} className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id={`main-${idx}`}
                checked={selected[item.label] || false}
                onChange={() => toggleCheckbox(item.label)}
              />
              <label
                htmlFor={`main-${idx}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {item.label}
                {expanded[item.label] && (
                  <span
                    style={{
                      marginLeft: "80%",
                      cursor: "pointer",
                      marginTop: "-6%",
                      fontWeight: "bold",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleExpand(item.label);
                    }}
                  >
                    ˅
                  </span>
                )}
              </label>
            </div>

            {expanded[item.label] && (
              <>
                {item.children.length > 0 && (
                  <div className="sub-options">
                    {item.children.map((child, i) => {
                      const childKey = `${item.label}-${child}`;
                      return (
                        <div key={i} className="checkbox-item sub">
                          <input
                            type="checkbox"
                            id={`sub-${idx}-${i}`}
                            checked={childSelected[childKey] || false}
                            onChange={() => toggleChild(item.label, child)}
                          />
                          <label htmlFor={`sub-${idx}-${i}`}>{child}</label>
                        </div>
                      );
                    })}
                  </div>
                )}

                {selected[item.label] && inputFields.includes(item.label) && (
                  <div className="checkbox-item vertical sub">
                    <label>Enter the {item.label.toLowerCase()}:</label>
                    <input
                      type="text"
                      value={inputValues[item.label] || ""}
                      onChange={(e) =>
                        handleInputChange(item.label, e.target.value)
                      }
                      placeholder={item.label}
                    />
                  </div>
                )}

                {selected[item.label] && item.label === dateField && (
                  <div className="checkbox-item vertical sub">
                    <label>Select Event Period:</label>
                    <div
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      <div>
                        <label>From:</label>
                        <input
                          type="date"
                          value={dateRange.from}
                          onChange={(e) =>
                            handleDateChange("from", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label>To:</label>
                        <input
                          type="date"
                          value={dateRange.to}
                          onChange={(e) =>
                            handleDateChange("to", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        <div class="top-bar">
          <div></div>
          <div class="download-buttons">
            <button class="download-btn-pdf" onClick={downloadFilteredPDF}>
              <i class="fa fa-download"></i> Download PDF
            </button>
            <button class="download-btn-excel" onClick={exportFilteredToExcel}>
              <i class="fa fa-download"></i> Download Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterEvents;
