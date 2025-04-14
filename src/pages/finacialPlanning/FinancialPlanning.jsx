import React, { useState } from 'react';
import './FinancialPlanning.css';

const fundingSources = [
  "Management Funding",
  "Department Funding",
  "Participant Contribution / Registration Fees",
  "Industry / Companies Funding",
  "Government Grants",
  "Alumni Funding",
  "Professional Societies / Student Chapters",
  "Tech Clubs / Innovation Cells",
  "Event Collaborations",
  "Others"
];

const estimatedBudgetItems = [
  "Resource Person Honorarium",
  "Travel Allowance",
  "Banners / Flex / Backdrop",
  "Printing - Certificates, Brochures, Posters",
  "Ceremonial Arrangements / Mementos / Gifts",
  "Technical Arrangements",
  "Stationery & Event Materials",
  "Accommodation & Hospitality",
  "Food & Refreshments",
  "Logistics & Venue",
  "Photography / Videography",
  "Digital Promotion & Media",
  "Miscellaneous / Contingency"
];

const FinancialPlanning = () => {
  const [fundingData, setFundingData] = useState(fundingSources.map(() => ({ amount: '', remarks: '' })));
  const [budgetData, setBudgetData] = useState(estimatedBudgetItems.map(() => ({ amount: '', remarks: '' })));

  const handleFundingChange = (index, field, value) => {
    const updated = [...fundingData];
    updated[index][field] = value;
    setFundingData(updated);
  };

  const handleBudgetChange = (index, field, value) => {
    const updated = [...budgetData];
    updated[index][field] = value;
    setBudgetData(updated);
  };

  const fundingTotal = fundingData.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const budgetTotal = budgetData.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const handleSubmit = async () => {
    const payload = {
      fundingData,
      budgetData,
      fundingTotal,
      budgetTotal,
    };

    try {
      const response = await fetch('https://your-backend-api.com/saveFinancialData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Data saved successfully!');
      } else {
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while saving the data.');
    }
  };

  return (
    <div className="financial-planning">
        <div>
            <h1>Financial Planning</h1>
        </div>
      <h2>Funding Sources</h2>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Particulars</th>
            <th>Amount</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {fundingSources.map((source, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{source}</td>
              <td>
                <input
                  type="number"
                  value={fundingData[index].amount}
                  onChange={(e) => handleFundingChange(index, 'amount', e.target.value)}
                  placeholder="Enter amount"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={fundingData[index].remarks}
                  onChange={(e) => handleFundingChange(index, 'remarks', e.target.value)}
                  placeholder="Remarks"
                />
              </td>
            </tr>
          ))}
          <tr className="total-row">
            <td colSpan="2"><strong>Total Estimated Amount</strong></td>
            <td><strong>{fundingTotal.toFixed(2)}</strong></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <h2>Estimated Budget</h2>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Particulars</th>
            <th>Estimated Amount</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {estimatedBudgetItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>
              <td>
                <input
                  type="number"
                  value={budgetData[index].amount}
                  onChange={(e) => handleBudgetChange(index, 'amount', e.target.value)}
                  placeholder="Enter amount"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={budgetData[index].remarks}
                  onChange={(e) => handleBudgetChange(index, 'remarks', e.target.value)}
                  placeholder="Remarks"
                />
              </td>
            </tr>
          ))}
          <tr className="total-row">
            <td colSpan="2"><strong>Total Estimated Budget</strong></td>
            <td><strong>{budgetTotal.toFixed(2)}</strong></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div className="submit-button-container">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default FinancialPlanning;
