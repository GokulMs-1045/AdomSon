import React from "react";
import EventNav from "../../EventNav";
import Navbar from "../../Navbar";
import "./Foodandtravel.css";
const FoodTravelForm = () => {
  const mealRows = [
    { category: "Guest", time: "Breakfast" },
    { category: "Participants", time: "Breakfast" },
    { category: "Guest", time: "Refreshment" },
    { category: "Participants", time: "Refreshment" },
    { category: "Guest", time: "Lunch" },
    { category: "Participants", time: "Lunch" },
    { category: "Guest", time: "Refreshment" },
    { category: "Participants", time: "Refreshment" },
    { category: "Guest", time: "Dinner" },
    { category: "Participants", time: "Dinner" },
  ];

  const travelRows = ["Guest", "Participants"];

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://your-backend-url/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: tableData })
      });
  
      if (response.ok) {
        alert("Submitted successfully!");
      } else {
        alert("Submission failed!");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  

  return (
    <>
      <div className="nav">
        <Navbar />
        <EventNav />
      </div>
      <div className="form-container">
        <h3>Food Arrangements</h3>
        <div className="food-inputs">
          {/* Guest Count */}
          <div className="floating-input">
            <input type="text" id="guests" required placeholder=" " />
            <label htmlFor="guests">No. of Guests</label>
          </div>

          {/* Faculty Count */}
          <div className="floating-input">
            <input type="text" id="faculty" required placeholder=" " />
            <label htmlFor="faculty">No. of Faculty</label>
          </div>

          {/* Student Count */}
          <div className="floating-input">
            <input type="text" id="students" required placeholder=" " />
            <label htmlFor="students">No. of Students</label>
          </div>

          {/* Meal Selection Dropdown */}
          <div className="floating-input">
            <select id="mealFor" required>
              <option value=""></option>
              <option value="guest">Only for Guest</option>
              <option value="both">Guest & Participants</option>
            </select>
            <label htmlFor="mealFor">Meal For</label>
          </div>
        </div>
        {/* <table className="food-table">
          <thead>
            <tr>
              <th className="meal-time-header">Meal Time</th>
              <th className="category-header">Category</th>
              <th>Meal Type</th>
              <th>Items Included</th>
              <th>Served at</th>
              <th>Count</th>
              <th>Special Notes</th>
            </tr>
          </thead>
          <tbody>
            {mealRows.reduce((rows, row, index, array) => {
              // Only show meal time if it's the first occurrence or different from previous
              if (index === 0 || row.time !== array[index - 1].time) {
                rows.push(
                  <tr key={`${row.time}-group`}>
                    <td
                      rowSpan={array.filter((r) => r.time === row.time).length}
                    >
                      {row.time}
                    </td>
                    <td>{row.category}</td>
                    <td>
                      <select className="meal-type-select">
                        <option value="veg">Veg</option>
                        <option value="nonveg">Non-Veg</option>
                      </select>
                    </td>
                    <td>
                      <select className="items-select">
                        {row.time === "Refreshment" ? (
                          <>
                            <option value="tea">Tea</option>
                            <option value="snacks">Snacks</option>
                            <option value="tws">TWS</option>
                          </>
                        ) : (
                          <>
                            <option value="standard">Standard</option>
                            <option value="special">Special</option>
                          </>
                        )}
                      </select>
                    </td>
                    <td>
                      <select className="served-at-select">
                        {row.time === "Refreshment" ? (
                          <option value="venue">Venue</option>
                        ) : (
                          <option value="sd">SD</option>
                        )}
                      </select>
                    </td>
                    <td>
                      <input type="text" className="count-input" />
                    </td>
                    <td>
                      <input type="text" className="notes-input" />
                    </td>
                  </tr>
                );
              } else {
                rows.push(
                  <tr key={`${row.time}-${row.category}`}>
                    <td>{row.category}</td>
                    <td>
                      <select className="meal-type-select">
                        <option value="veg">Veg</option>
                        <option value="nonveg">Non-Veg</option>
                      </select>
                    </td>
                    <td>
                      <select className="items-select">
                        {row.time === "Refreshment" ? (
                          <>
                            <option value="tea">Tea</option>
                            <option value="snacks">Snacks</option>
                            <option value="tws">TWS</option>
                          </>
                        ) : (
                          <>
                            <option value="standard">Standard</option>
                            <option value="special">Special</option>
                          </>
                        )}
                      </select>
                    </td>
                    <td>
                      <select className="served-at-select">
                        {row.time === "Refreshment" ? (
                          <option value="venue">Venue</option>
                        ) : (
                          <option value="sd">SD</option>
                        )}
                      </select>
                    </td>
                    <td>
                      <input type="text" className="count-input" />
                    </td>
                    <td>
                      <input type="text" className="notes-input" />
                    </td>
                  </tr>
                );
              }
              return rows;
            }, [])}
          </tbody>
        </table> */}
        <div className=".table-container">
        <div className="food-table">
        <table className="food-table">
          <thead>
            <tr>
              <th className="meal-time-header">Meal Time</th>
              <th className="category-header">Category</th>
              <th>Meal Type</th>
              <th>Items Included</th>
              <th style={{ width: "100px" }}>Count</th>
              <th>Served at</th>
              <th style={{ width: "250px" }}>Special Notes</th>
            </tr>
          </thead>
          <tbody>
            {/* Breakfast */}
            <tr>
              <td rowSpan="2">Breakfast</td>
              <td>Guest</td>
              <td>
                <select className="meal-type-select">
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                </select>
              </td>
              <td>
                <select className="items-select">
                  <option value="standard">Standard</option>
                  <option value="special">Special</option>
                </select>
              </td>
              <td>
                <input type="text" className="count-input" />
              </td>
              <td>
                <select className="served-at-select">
                  <option value="sd">Student Dining</option>
                  <option value="cd">Canteen Dining</option>
                  <option value="gd">Guest Dining</option>
                </select>
              </td>
              <td>
                <input type="text" className="notes-input" />
              </td>
            </tr>
            <tr>
              <td>Participants</td>
              <td>
                <select className="meal-type-select">
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                </select>
              </td>
              <td>
                <select className="items-select">
                  <option value="standard">Standard</option>
                  <option value="special">Special</option>
                </select>
              </td>
              <td>
                <input type="text" className="count-input" />
              </td>
              <td>
                <select className="served-at-select">
                  <option value="sd">Student Dining</option>
                  <option value="cd">Canteen Dining</option>
                  <option value="gd">Guest Dining</option>
                </select>
              </td>
              <td>
                <input type="text" className="notes-input" />
              </td>
            </tr>

            {/* Refreshment */}
            <tr>
              <td rowSpan="2">Refreshment</td>
              <td>Guest</td>
              <td>
                <select className="meal-type-select">
                  <option value="veg">-</option>
                  <option value="nonveg">-</option>
                </select>
              </td>
              <td>
                <select className="items-select">
                  <option value="tea">Tea</option>
                  <option value="snacks">Snacks</option>
                  <option value="tws">TWS</option>
                </select>
              </td>
              <td>
                <input type="text" className="count-input" />
              </td>
              <td>
                <select className="served-at-select">
                  <option value="venue">Venue</option>
                </select>
              </td>
              <td>
                <input type="text" className="notes-input" />
              </td>
            </tr>
            <tr>
              <td>Participants</td>
              <td>
                <select className="meal-type-select">
                  <option value="veg">-</option>
                  <option value="nonveg">-</option>
                </select>
              </td>
              <td>
                <select className="items-select">
                  <option value="tea">Tea</option>
                  <option value="snacks">Snacks</option>
                  <option value="tws">TWS</option>
                </select>
              </td>
              <td>
                <input type="text" className="count-input" />
              </td>
              <td>
                <select className="served-at-select">
                  <option value="venue">Venue</option>
                </select>
              </td>
              <td>
                <input type="text" className="notes-input" />
              </td>
            </tr>

            {/* Lunch */}
            <tr>
              <td rowSpan="2">Lunch</td>
              <td>Guest</td>
              <td>
                <select className="meal-type-select">
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                </select>
              </td>
              <td>
                <select className="items-select">
                  <option value="standard">Standard</option>
                  <option value="special">Special</option>
                </select>
              </td>
              <td>
                <input type="text" className="count-input" />
              </td>
              <td>
                <select className="served-at-select">
                  <option value="sd">Student Dining</option>
                  <option value="cd">Canteen Dining</option>
                  <option value="gd">Guest Dining</option>
                </select>
              </td>
              <td>
                <input type="text" className="notes-input" />
              </td>
            </tr>
            <tr>
              <td>Participants</td>
              <td>
                <select className="meal-type-select">
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                </select>
              </td>
              <td>
                <select className="items-select">
                  <option value="standard">Standard</option>
                  <option value="special">Special</option>
                </select>
              </td>
              <td>
                <input type="text" className="count-input" />
              </td>
              <td>
                <select className="served-at-select">
                  <option value="sd">Student Dining</option>
                  <option value="cd">Canteen Dining</option>
                  <option value="gd">Guest Dining</option>
                </select>
              </td>
              <td>
                <input type="text" className="notes-input" />
              </td>
            </tr>

            {/* Refreshment again */}
            <tr>
              <td rowSpan="2">Refreshment</td>
              <td>Guest</td>
              <td>
                <select className="meal-type-select">
                  <option value="veg">-</option>
                  <option value="nonveg">-</option>
                </select>
              </td>
              <td>
                <select className="items-select">
                  <option value="tea">Tea</option>
                  <option value="snacks">Snacks</option>
                  <option value="tws">TWS</option>
                </select>
              </td>
              <td>
                <input type="text" className="count-input" />
              </td>
              <td>
                <select className="served-at-select">
                  <option value="venue">Venue</option>
                </select>
              </td>
              <td>
                <input type="text" className="notes-input" />
              </td>
            </tr>
            <tr>
              <td>Participants</td>
              <td>
                <select className="meal-type-select">
                  <option value="veg">-</option>
                  <option value="nonveg">-</option>
                </select>
              </td>
              <td>
                <select className="items-select">
                  <option value="tea">Tea</option>
                  <option value="snacks">Snacks</option>
                  <option value="tws">TWS</option>
                </select>
              </td>
              <td>
                <input type="text" className="count-input" />
              </td>
              <td>
                <select className="served-at-select">
                  <option value="venue">Venue</option>
                </select>
              </td>
              <td>
                <input type="text" className="notes-input" />
              </td>
            </tr>

            {/* Dinner */}
            <tr>
              <td rowSpan="2">Dinner</td>
              <td>Guest</td>
              <td>
                <select className="meal-type-select">
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                </select>
              </td>
              <td>
                <select className="items-select">
                  <option value="standard">Standard</option>
                  <option value="special">Special</option>
                </select>
              </td>
              <td>
                <input type="text" className="count-input" />
              </td>
              <td>
                <select className="served-at-select">
                  <option value="sd">Student Dining</option>
                  <option value="cd">Canteen Dining</option>
                  <option value="gd">Guest Dining</option>
                </select>
              </td>
              <td>
                <input type="text" className="notes-input" />
              </td>
            </tr>
            <tr>
              <td>Participants</td>
              <td>
                <select className="meal-type-select">
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                </select>
              </td>
              <td>
                <select className="items-select">
                  <option value="standard">Standard</option>
                  <option value="special">Special</option>
                </select>
              </td>
              <td>
                <input type="text" className="count-input" />
              </td>
              <td>
                <select className="served-at-select">
                  <option value="sd">Student Dining</option>
                  <option value="cd">Canteen Dining</option>
                  <option value="gd">Guest Dining</option>
                </select>
              </td>
              <td>
                <input type="text" className="notes-input" />
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="travel">Travel Arrangements</h3>
        <table className="travel-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Mode of Travel</th>
              <th>Date</th>
              <th>Time</th>
              <th>Pickup Location</th>
              <th>Drop Location</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {travelRows.map((category, index) => (
              <tr key={index}>
                <td>{category}</td>
                <td>
                  <select className="travel-mode-select" defaultValue="car">
                    <option value="car">Car</option>
                    <option value="bus">Bus</option>
                    <option value="train">Train</option>
                    <option value="flight">Flight</option>
                  </select>
                </td>
                <td>
                  <input type="date" /> {/* Changed to date input */}
                </td>
                <td>
                  <input type="time" /> {/* Changed to time input */}
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        <div className="Buttons">
        <button className="T-submit-btn" onClick={handleSubmit}>
                  Submit
        </button>
        </div>
      </div>
    </>
  );
};

export default FoodTravelForm;
