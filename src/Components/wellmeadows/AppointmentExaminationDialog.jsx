import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const patients = ['Ella', 'Kyla', 'Shane', 'Shannen'];
const examinationResults = ['Out-Patient', 'In-Patient'];

function AppointmentExaminationDialog({ open, onClose }) {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [selectedResult, setSelectedResult] = useState(examinationResults[0]);

  const handleChangePatient = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleChangeResult = (event) => {
    setSelectedResult(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Patient: ${selectedPatient}, Examination Result: ${selectedResult}`);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth> {/* Added maxWidth and fullWidth */}
      <DialogTitle>Appointment Examination</DialogTitle>
      <DialogContent>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            background: 'linear-gradient(to right, #009DD1 24%, #00506B 100%)',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            marginBottom: '16px',
          }}
        >
          Conduct Examination
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Patient"
            value={selectedPatient}
            onChange={handleChangePatient}
            fullWidth
            margin="normal"
          >
            {patients.map((patient) => (
              <MenuItem key={patient} value={patient}>
                {patient}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Examination Result"
            value={selectedResult}
            onChange={handleChangeResult}
            fullWidth
            margin="normal"
          >
            {examinationResults.map((result) => (
              <MenuItem key={result} value={result}>
                {result}
              </MenuItem>
            ))}
          </TextField>

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Submit Examination
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AppointmentExaminationDialog;
