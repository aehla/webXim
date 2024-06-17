import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const staff = ['Nurse A', 'Nurse B', 'Doctor C'];
const wards = ['Ward 1', 'Ward 2', 'Ward 3'];
const shift = ['Day', 'Night']

function StaffAllocationDialog({ open, onClose }) {
  const [selectedStaff, setSelectedStaff] = useState(staff[0]);
  const [selectedWard, setSelectedWard] = useState(wards[0]);
  const [selectedShift, setSelectedShift] = useState(shift[0]);

  const handleChangeStaff = (event) => {
    setSelectedStaff(event.target.value);
  };

  const handleChangeWard = (event) => {
    setSelectedWard(event.target.value);
  };

  const handleChangeShift = (event) => {
    setSelectedShift(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Staff: ${selectedStaff}, Ward: ${selectedWard}`);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Staff Allocation</DialogTitle>
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
          Assign Staff to Wards
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Staff"
            value={selectedStaff}
            onChange={handleChangeStaff}
            fullWidth
            margin="normal"
          >
            {staff.map((staffMember) => (
              <MenuItem key={staffMember} value={staffMember}>
                {staffMember}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Ward"
            value={selectedWard}
            onChange={handleChangeWard}
            fullWidth
            margin="normal"
          >
            {wards.map((ward) => (
              <MenuItem key={ward} value={ward}>
                {ward}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Shift"
            value={selectedShift}
            onChange={handleChangeShift}
            fullWidth
            margin="normal"
          >
            {shift.map((shift) => (
              <MenuItem key={shift} value={shift}>
                {shift}
              </MenuItem>
            ))}
          </TextField>

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Allocate Staff
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default StaffAllocationDialog;
