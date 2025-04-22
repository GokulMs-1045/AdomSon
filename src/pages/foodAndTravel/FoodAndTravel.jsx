import React, { useState, useEffect } from "react";
import EventNav from "../../EventNav";
import Navbar from "../../Navbar";
import "./Foodandtravel.css";

const FoodTravelForm = () => {
  // Days state
  const [days, setDays] = useState("");

  // Refreshment states
  const [refreshmentEntries, setRefreshmentEntries] = useState([]);
  const [refreshmentForm, setRefreshmentForm] = useState({
    date: "",
    time: "",
    session: "Forenoon",
    category: "Guest",
    items: "Only Tea/Coffee",
    count: "",
    servedAt: "Venue",
    note: "",
  });

  // Food states
  const [foodEntries, setFoodEntries] = useState([]);
  const [foodForm, setFoodForm] = useState({
    date: "",
    time: "",
    mealType: "Breakfast",
    category: "Guest",
    menu: "Standard",
    count: "",
    servedAt: "Dining Hall",
    note: "",
  });

  // Travel states
  const [travelEntries, setTravelEntries] = useState([]);
  const [travelForm, setTravelForm] = useState({
    category: "Guest",
    mode: "Car",
    date: "",
    time: "",
    pickup: "",
    drop: "",
    remarks: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/get_days")
      .then((response) => response.json())
      .then((data) => setDays(data.days))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Refreshment handlers
  const handleRefreshmentInputChange = (e) => {
    const { name, value } = e.target;
    setRefreshmentForm((prev) => ({ ...prev, [name]: value }));
  };

  const addRefreshmentEntry = () => {
    if (refreshmentForm.date && refreshmentForm.time && refreshmentForm.count) {
      setRefreshmentEntries((prev) => [
        ...prev,
        { ...refreshmentForm, id: Date.now() },
      ]);
      setRefreshmentForm({
        date: "",
        time: "",
        session: "Forenoon",
        category: "Guest",
        items: "Only Tea/Coffee",
        count: "",
        servedAt: "Venue",
        note: "",
      });
    }
  };

  // Food handlers
  const handleFoodInputChange = (e) => {
    const { name, value } = e.target;
    setFoodForm((prev) => ({ ...prev, [name]: value }));
  };

  const addFoodEntry = () => {
    if (foodForm.date && foodForm.time && foodForm.count) {
      setFoodEntries((prev) => [...prev, { ...foodForm, id: Date.now() }]);
      setFoodForm({
        date: "",
        time: "",
        mealType: "Breakfast",
        category: "Guest",
        menu: "Standard",
        count: "",
        servedAt: "Dining Hall",
        note: "",
      });
    }
  };

  // Travel handlers
  const handleTravelInputChange = (e) => {
    const { name, value } = e.target;
    setTravelForm((prev) => ({ ...prev, [name]: value }));
  };

  const addTravelEntry = () => {
    if (
      travelForm.date &&
      travelForm.time &&
      travelForm.pickup &&
      travelForm.drop
    ) {
      setTravelEntries((prev) => [...prev, { ...travelForm, id: Date.now() }]);
      setTravelForm({
        category: "Guest",
        mode: "Car",
        date: "",
        time: "",
        pickup: "",
        drop: "",
        remarks: "",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://your-backend-url/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days,
          refreshments: refreshmentEntries,
          meals: foodEntries,
          travel: travelEntries,
        }),
      });
      alert(response.ok ? "Submitted successfully!" : "Submission failed!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Group entries for display
  const groupEntries = (entries, timeField) => {
    return entries.reduce((acc, entry) => {
      if (!acc[entry.date]) acc[entry.date] = {};
      acc[entry.date][entry[timeField]] = entry;
      return acc;
    }, {});
  };

  const groupedRefreshments = groupEntries(refreshmentEntries, "session");
  const groupedFood = groupEntries(foodEntries, "mealType");

  return (
    <>
      <div className="nav">
        <Navbar />
        <EventNav />
      </div>

      <div className="food-travel-container">
        <h3>Food and Travel Arrangements</h3>

        {/* Days Input */}
        <div className="days-input">
          <div className="floating-input">
            <input
              type="text"
              id="event-days"
              required
              placeholder=" "
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
            <label htmlFor="event-days">No. of Days : 4</label>
          </div>
        </div>

        {/* Refreshment Section */}

        {/* Food Section */}
        <div className="section-container">
          <h3>Meal Arrangements</h3>

          {/* Food Input Form */}
          <div className="input-table-container">
            <table className="input-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Meal Type</th>
                  <th>Category</th>
                  <th>Menu</th>
                  <th>Persons</th>
                  <th>Served At</th>
                  <th>special Note</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="date"
                      name="date"
                      value={foodForm.date}
                      onChange={handleFoodInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      name="time"
                      value={foodForm.time}
                      onChange={handleFoodInputChange}
                    />
                  </td>
                  <td>
                    <select
                      name="mealType"
                      value={foodForm.mealType}
                      onChange={handleFoodInputChange}
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                    </select>
                  </td>
                  <td>
                    <select
                      name="category"
                      value={foodForm.category}
                      onChange={handleFoodInputChange}
                    >
                      <option value="Guest">Guest</option>
                      <option value="Participants">Participants</option>
                      <option value="Both">Both</option>
                    </select>
                  </td>
                  <td>
                    <select
                      name="menu"
                      value={foodForm.menu}
                      onChange={handleFoodInputChange}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Special">Special</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Count"
                      name="count"
                      value={foodForm.count}
                      onChange={handleFoodInputChange}
                    />
                  </td>
                  <td>
                    <select
                      name="servedAt"
                      value={foodForm.servedAt}
                      onChange={handleFoodInputChange}
                    >
                      <option value="Dining Hall">Dining Hall</option>
                      <option value="Venue">Venue</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Note"
                      name="note"
                      value={foodForm.note}
                      onChange={handleFoodInputChange}
                    />
                  </td>
                  <td>
                    <button className="add-btn" onClick={addFoodEntry}>
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Food Schedule Display */}
          <h4>Meal Schedule</h4>
          <div className="schedule-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th></th>
                  <th colSpan="6">Breakfast</th>
                  <th colSpan="6">Lunch</th>
                  <th colSpan="6">Dinner</th>
                </tr>
                <tr>
                  <th>Date</th>
                  {/* Breakfast columns */}
                  <th>Time</th>
                  <th>Category</th>
                  <th>Menu</th>
                  <th>Persons</th>
                  <th>Served At</th>
                  <th>special Note</th>
                  {/* Lunch columns */}
                  <th>Time</th>
                  <th>Category</th>
                  <th>Menu</th>
                  <th>Persons</th>
                  <th>Served At</th>
                  <th>special Note</th>
                  {/* Dinner columns */}
                  <th>Time</th>
                  <th>Category</th>
                  <th>Menu</th>
                  <th>Persons</th>
                  <th>Served At</th>
                  <th>special Note</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedFood).map(([date, meals]) => (
                  <tr key={date}>
                    <td>{date}</td>

                    {/* Breakfast section */}
                    {meals.Breakfast ? (
                      <>
                        <td>{meals.Breakfast.time}</td>
                        <td>{meals.Breakfast.category}</td>
                        <td>{meals.Breakfast.menu}</td>
                        <td>{meals.Breakfast.count}</td>
                        <td>{meals.Breakfast.servedAt}</td>
                        <td>{meals.Breakfast.note}</td>
                      </>
                    ) : (
                      <td colSpan="6" className="empty-cell">
                        No breakfast
                      </td>
                    )}

                    {/* Lunch section */}
                    {meals.Lunch ? (
                      <>
                        <td>{meals.Lunch.time}</td>
                        <td>{meals.Lunch.category}</td>
                        <td>{meals.Lunch.menu}</td>
                        <td>{meals.Lunch.count}</td>
                        <td>{meals.Lunch.servedAt}</td>
                        <td>{meals.Lunch.note}</td>
                      </>
                    ) : (
                      <td colSpan="6" className="empty-cell">
                        No lunch
                      </td>
                    )}

                    {/* Dinner section */}
                    {meals.Dinner ? (
                      <>
                        <td>{meals.Dinner.time}</td>
                        <td>{meals.Dinner.category}</td>
                        <td>{meals.Dinner.menu}</td>
                        <td>{meals.Dinner.count}</td>
                        <td>{meals.Dinner.servedAt}</td>
                        <td>{meals.Dinner.note}</td>
                      </>
                    ) : (
                      <td colSpan="6" className="empty-cell">
                        No dinner
                      </td>
                    )}
                  </tr>
                ))}
                {foodEntries.length === 0 && (
                  <tr>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <div className="submit-button-container">
              <button>Save</button>
            </div> */}
          </div>
        </div>
        <div className="section-container">
          <h3>Refreshment Arrangements</h3>
          <p>
            Please provide your refreshment details by selecting the date,
            session, items included, number of persons, and serving location
          </p>

          {/* Refreshment Input Form */}
          <div className="input-table-container">
            <table className="input-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Session</th>
                  <th>Category</th>
                  <th>Items</th>
                  <th>Persons</th>
                  <th>Served At</th>
                  <th>Special Note</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="date"
                      name="date"
                      value={refreshmentForm.date}
                      onChange={handleRefreshmentInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      name="time"
                      value={refreshmentForm.time}
                      onChange={handleRefreshmentInputChange}
                    />
                  </td>
                  <td>
                    <select
                      name="session"
                      value={refreshmentForm.session}
                      onChange={handleRefreshmentInputChange}
                    >
                      <option value="Forenoon">Forenoon</option>
                      <option value="Afternoon">Afternoon</option>
                    </select>
                  </td>
                  <td>
                    <select
                      name="category"
                      value={refreshmentForm.category}
                      onChange={handleRefreshmentInputChange}
                    >
                      <option value="Guest">Guest</option>
                      <option value="Participants">Participants</option>
                      <option value="Both">Both</option>
                    </select>
                  </td>
                  <td>
                    <select
                      name="items"
                      value={refreshmentForm.items}
                      onChange={handleRefreshmentInputChange}
                    >
                      <option value="Only Tea/Coffee">Only Tea/Coffee</option>
                      <option value="Tea/Coffee with Snacks">
                        Tea/Coffee with Snacks
                      </option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Count"
                      name="count"
                      value={refreshmentForm.count}
                      onChange={handleRefreshmentInputChange}
                    />
                  </td>
                  <td>
                    <select
                      name="servedAt"
                      value={refreshmentForm.servedAt}
                      onChange={handleRefreshmentInputChange}
                    >
                      <option value="Venue">Venue</option>
                      <option value="Guest Room">Guest Room</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Note"
                      name="note"
                      value={refreshmentForm.note}
                      onChange={handleRefreshmentInputChange}
                    />
                  </td>
                  <td>
                    <button className="add-btn" onClick={addRefreshmentEntry}>
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Refreshment Schedule Display */}
          <h4>Refreshment Schedule</h4>
          <div className="schedule-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th></th>
                  <th colSpan="5">Forenoon</th>
                  <th colSpan="5">Afternoon</th>
                </tr>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Category</th>
                  <th>Items</th>
                  <th>Persons</th>
                  <th>Served At</th>
                  <th>Time</th>
                  <th>Category</th>
                  <th>Items</th>
                  <th>Persons</th>
                  <th>Served At</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedRefreshments).map(([date, sessions]) => (
                  <tr key={date}>
                    <td>{date}</td>
                    {sessions.Forenoon ? (
                      <>
                        <td>{sessions.Forenoon.time}</td>
                        <td>{sessions.Forenoon.category}</td>
                        <td>{sessions.Forenoon.items}</td>
                        <td>{sessions.Forenoon.count}</td>
                        <td>{sessions.Forenoon.servedAt}</td>
                      </>
                    ) : (
                      <td colSpan="5" className="empty-cell">
                        No forenoon session
                      </td>
                    )}
                    {sessions.Afternoon ? (
                      <>
                        <td>{sessions.Afternoon.time}</td>
                        <td>{sessions.Afternoon.category}</td>
                        <td>{sessions.Afternoon.items}</td>
                        <td>{sessions.Afternoon.count}</td>
                        <td>{sessions.Afternoon.servedAt}</td>
                      </>
                    ) : (
                      <td colSpan="5" className="empty-cell">
                        No afternoon session
                      </td>
                    )}
                  </tr>
                ))}
                {refreshmentEntries.length === 0 && (
                  <tr>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <div className="submit-button-container">
              <button>Save</button>
            </div> */}
          </div>
        </div>
        {/* Travel Arrangements Section */}
        <div className="section-container">
          <h3>Travel Arrangements</h3>

          {/* Travel Input Form */}
          <div className="input-table-container">
            <table className="input-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Mode of Travel</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Pickup Location</th>
                  <th>Drop Location</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select
                      name="category"
                      value={travelForm.category}
                      onChange={handleTravelInputChange}
                    >
                      <option value="Guest">Guest</option>
                      <option value="Participants">Participants</option>
                    </select>
                  </td>
                  <td>
                    <select
                      name="mode"
                      value={travelForm.mode}
                      onChange={handleTravelInputChange}
                    >
                      <option value="Car">Car</option>
                      <option value="Bus">Bus</option>
                      <option value="Train">Train</option>
                      <option value="Flight">Flight</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      value={travelForm.date}
                      onChange={handleTravelInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      name="time"
                      value={travelForm.time}
                      onChange={handleTravelInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="pickup"
                      value={travelForm.pickup}
                      onChange={handleTravelInputChange}
                      placeholder="Pickup location"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="drop"
                      value={travelForm.drop}
                      onChange={handleTravelInputChange}
                      placeholder="Drop location"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="remarks"
                      value={travelForm.remarks}
                      onChange={handleTravelInputChange}
                      placeholder="Remarks"
                    />
                  </td>
                  <td>
                    <button className="add-btn" onClick={addTravelEntry}>
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>

          {/* Travel Schedule Display */}
          <h4>Travel Schedule</h4>
          <div className="schedule-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Mode</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Pickup</th>
                  <th>Drop</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {travelEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.category}</td>
                    <td>{entry.mode}</td>
                    <td>{entry.date}</td>
                    <td>{entry.time}</td>
                    <td>{entry.pickup}</td>
                    <td>{entry.drop}</td>
                    <td>{entry.remarks}</td>
                  </tr>
                ))}
                {travelEntries.length === 0 && (
                  <tr>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                    <td className="empty-table-message">-</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        
          <button className="submit-btn-fa" >
            Save
          </button>
        
      </div>
    </>
  );
};

export default FoodTravelForm;
