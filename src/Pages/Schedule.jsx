import React, { useState } from 'react';

const Schedule = () => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [examinationResult, setExaminationResult] = useState('In-Patient');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log({ appointmentDate, examinationResult });
  };

  const containerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%', // Set width to 100%
    maxWidth: '800px', // Set maximum width
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    fontFamily: 'Roboto, sans-serif' // Roboto font
  };

  const headingStyle = {
    color: 'black',
    textAlign: 'left'
  };

  const examinationSectionStyle = {
    padding: '5px',
    borderRadius: '8px',
    marginTop: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const conductExaminationStyle = {
    background: 'linear-gradient(90deg, #009DD1 24%, #00506B 100%)',
    color: '#fff',
    padding: '1px',
    borderRadius: '5px',
    marginBottom: '2px',
    height: '40px',
    width: '100%',
    textAlign: 'left', // Align left
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center background color
    fontFamily: 'Roboto, sans-serif' // Roboto font
  };

  const inputStyle = {
    background: '#0000',
    color: 'black',
    borderRadius: '4px',
    borderColor: '#0000',
    padding: '8px',
    margin: '5px 0',
    fontFamily: 'Roboto, sans-serif' // Roboto font
  };

  const selectStyle = {
    background: '#0000',
    color: 'black',
    borderRadius: '4px',
    borderColor: '#0000',
    padding: '8px',
    margin: '1px 0',
    fontFamily: 'Roboto, sans-serif' // Roboto font
  };

  const buttonStyle = {
    backgroundColor: '#009DD1', // Change the button background color
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Roboto, sans-serif' // Roboto font
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ ...headingStyle, fontFamily: 'Roboto, sans-serif' }}>Schedule an Appointment</h2>
      <div className="examination-section" style={examinationSectionStyle}>
        <div style={{ ...conductExaminationStyle, textAlign: 'left' }}>
          <h3 style={{ textAlign: 'left', fontFamily: 'Roboto, sans-serif', color: 'white' }}>Conduct Examination</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label style={{ marginRight: '10px', width: '200px', textAlign: 'right', fontFamily: 'Roboto, sans-serif' }}>Examination Result:</label>
            <select
              value={examinationResult}
              onChange={(e) => setExaminationResult(e.target.value)}
              style={{ ...selectStyle, fontFamily: 'Roboto, sans-serif' }}
            >
              <option value="In-Patient">In-Patient</option>
              <option value="Out-Patient">Out-Patient</option>
            </select>
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label style={{ marginRight: '10px', width: '200px', textAlign: 'right', fontFamily: 'Roboto, sans-serif' }}>Appointment Date:</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              style={{ ...inputStyle, fontFamily: 'Roboto, sans-serif' }}
            />
          </div>
          <button type="submit" style={{ ...buttonStyle, fontFamily: 'Roboto, sans-serif' }}>Submit Examination</button>
        </form>
      </div>
    </div>
  );
};

export default Schedule;
