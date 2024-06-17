// src/components/PrescriptionFormDialog.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';

const PrescriptionFormDialog = ({ open, onClose, addPrescription, history = [] }) => {
    const [patientType, setPatientType] = useState('');
    const [drugName, setDrugName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [methodOfAdmin, setMethodOfAdmin] = useState('');
    const [unitsPerDay, setUnitsPerDay] = useState('');
    const [availablePrescription, setAvailablePrescription] = useState('');

    const handleCreatePrescription = () => {
        const newPrescription = {
            patient: patientType,
            drugName,
            startDate,
            finishDate,
            methodOfAdmin,
            unitsPerDay,
        };
        addPrescription(newPrescription);

        // Clear the text fields
        setPatientType('');
        setDrugName('');
        setStartDate('');
        setFinishDate('');
        setMethodOfAdmin('');
        setUnitsPerDay('');
        setAvailablePrescription('');
    };

    const handleAdministerPrescription = () => {
        // Logic to administer prescription (optional implementation)
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Prescription Information</DialogTitle>
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
                        Select Patient
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel>In Patient Name</InputLabel>
                            <Select
                                value={patientType}
                                onChange={(e) => setPatientType(e.target.value)}
                                label="In Patient Name"
                            >
                                <MenuItem value="kate">Kate</MenuItem>
                                <MenuItem value="shannen">Shannen</MenuItem>
                                <MenuItem value="kyla">Kyla</MenuItem>
                                <MenuItem value="ella">Ella</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
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
                        Prescription Details
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 3 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel>Drug Name</InputLabel>
                                <Select
                                    value={drugName}
                                    onChange={(e) => setDrugName(e.target.value)}
                                    label="Drug Name"
                                >
                                    <MenuItem value="aspirin">Aspirin</MenuItem>
                                    <MenuItem value="ibuprofen">Ibuprofen</MenuItem>
                                    <MenuItem value="paracetamol">Paracetamol</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Method of Admin</InputLabel>
                                <Select
                                    value={methodOfAdmin}
                                    onChange={(e) => setMethodOfAdmin(e.target.value)}
                                    label="Method of Admin"
                                >
                                    <MenuItem value="oral">Oral</MenuItem>
                                    <MenuItem value="iv">IV</MenuItem>
                                    <MenuItem value="im">IM</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Units Per Day</InputLabel>
                                <Select
                                    value={unitsPerDay}
                                    onChange={(e) => setUnitsPerDay(e.target.value)}
                                    label="Units Per Day"
                                >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Start Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Finish Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={finishDate}
                                onChange={(e) => setFinishDate(e.target.value)}
                            />
                        </Box>
                        <Button variant="contained" color="primary" onClick={handleCreatePrescription}>
                            Create Prescription
                        </Button>
                    </Box>

                    <Typography
                        variant="h6"
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
                        Administer Prescription
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Available Prescription</InputLabel>
                            <Select
                                value={availablePrescription}
                                onChange={(e) => setAvailablePrescription(e.target.value)}
                                label="Available Prescription"
                            >
                                {history.length > 0 ? history.map((prescription, index) => (
                                    <MenuItem key={index} value={prescription.drugName}>
                                        {prescription.drugName} for {prescription.patient}
                                    </MenuItem>
                                )) : <MenuItem value=""><em>No Prescriptions Available</em></MenuItem>}
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={handleAdministerPrescription}>
                            Administer Prescription
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PrescriptionFormDialog;
