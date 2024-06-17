import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PrescriptionHistoryDialog = ({ open, onClose, history = [] }) => {
    const [selectedPatient, setSelectedPatient] = useState('');

    const filteredHistory = selectedPatient
        ? history.filter(prescription => prescription.patient === selectedPatient)
        : history;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Prescription History</DialogTitle>
            <DialogContent>
                <Box sx={{ padding: 2 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            color: 'white',
                            fontSize: 20,
                            fontFamily: 'Roboto',
                            fontWeight: '400',
                            background: 'linear-gradient(90deg, #009DD1 24%, #00506B 100%)',
                            width: '100%',
                            padding: 1,
                            borderRadius: 1,
                            marginBottom: 2,
                        }}
                    >
                        Patient Prescription History
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel>In-Patient</InputLabel>
                        <Select
                            value={selectedPatient}
                            onChange={(e) => setSelectedPatient(e.target.value)}
                            label="In-Patient"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {Array.from(new Set(history.map(prescription => prescription.patient))).map((patient, index) => (
                                <MenuItem key={index} value={patient}>{patient}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ marginTop: 3, overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'linear-gradient(90deg, #009DD1 24%, #00506B 100%)', color: 'white' }}>
                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Drug</th>
                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Units Per Day</th>
                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Method of Admin</th>
                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Start Date</th>
                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                                            No prescription history available.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredHistory.map((prescription, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{prescription.drugName}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{prescription.unitsPerDay} per day</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{prescription.methodOfAdmin}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{prescription.startDate}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{prescription.finishDate}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PrescriptionHistoryDialog;
