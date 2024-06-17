import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function InPatientDialog({ open, onClose }) {
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleUpdateOpen = (patient) => {
        setSelectedPatient(patient);
        setUpdateOpen(true);
    };

    const handleDelete = (patientId) => {
        // Implement the delete logic here
        console.log(`Deleting patient with ID: ${patientId}`);
    };

    const handleCloseUpdate = () => {
        setUpdateOpen(false);
        setSelectedPatient(null);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
                <DialogContent>
                    <Box sx={{ padding: 1 }}>
                        <Typography
                            sx={{
                                color: 'black',
                                fontSize: 24,
                                fontFamily: 'Roboto',
                                fontWeight: '700',
                                marginBottom: 2,
                            }}
                        >
                            In-Patients
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                background: 'linear-gradient(90deg, #009DD1 24%, #00506B 100%)',
                                padding: 1,
                                borderRadius: 1,
                                marginBottom: 2,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontFamily: 'Roboto',
                                    fontWeight: '400',
                                    paddingLeft: 1,
                                }}
                            >
                                Current In-Patients
                            </Typography>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Patient Number</TableCell>
                                        <TableCell>Patient Name</TableCell>
                                        <TableCell>On Waiting List</TableCell>
                                        <TableCell>Ward</TableCell>
                                        <TableCell>Expected Stay</TableCell>
                                        <TableCell>Date Leave</TableCell>
                                        <TableCell>Actual Leave</TableCell>
                                        <TableCell>Bed</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...Array(5)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {/* Replace with appropriate component */}
                                            </TableCell>
                                            <TableCell>
                                                {/* Replace with appropriate component */}
                                            </TableCell>
                                            <TableCell>
                                                {/* Replace with appropriate component */}
                                            </TableCell>
                                            <TableCell>
                                                <Select value="" displayEmpty fullWidth>
                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                    {[1, 2, 3, 4, 5].map((option) => (
                                                        <MenuItem key={option} value={option}>{`Ward ${option}`}</MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                {/* Replace with appropriate component */}
                                            </TableCell>
                                            <TableCell>
                                                {/* Replace with appropriate component */}
                                            </TableCell>
                                            <TableCell>
                                                {/* Replace with appropriate component */}
                                            </TableCell>
                                            <TableCell>
                                                <Select value="" displayEmpty fullWidth>
                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                    {[1, 2, 3, 4, 5].map((option) => (
                                                        <MenuItem key={option} value={option}>{`Bed ${option}`}</MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" justifyContent="space-between">
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => handleUpdateOpen(`Patient ${index + 1}`)}
                                                        sx={{ marginRight: 1 }}
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleDelete(index + 1)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <DialogActions>
                            <Button onClick={onClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Update Patient Dialog */}
            <Dialog open={updateOpen} onClose={handleCloseUpdate} fullWidth maxWidth="sm">
                <DialogContent>
                    <Box sx={{ padding: 1 }}>
                        <Typography
                            sx={{
                                color: 'black',
                                fontSize: 20,
                                fontFamily: 'Roboto',
                                fontWeight: '500',
                                marginBottom: 2,
                            }}
                        >
                            Update Patient Details
                        </Typography>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField label="Patient Number" fullWidth margin="normal" disabled />
                            <TextField label="Patient Name" fullWidth margin="normal" disabled />
                            <TextField label="On Waiting List" fullWidth margin="normal" disabled />
                            <Select label="Ward" value="" displayEmpty fullWidth>
                                <MenuItem value=""><em>None</em></MenuItem>
                                {[1, 2, 3, 4, 5].map((option) => (
                                    <MenuItem key={option} value={option}>{`Ward ${option}`}</MenuItem>
                                ))}
                            </Select>
                            <TextField label="Expected Stay" fullWidth margin="normal" disabled />
                            <TextField label="Date Leave" fullWidth margin="normal" disabled />
                            <TextField label="Actual Leave" fullWidth margin="normal" disabled />
                            <Select label="Bed" value="" displayEmpty fullWidth>
                                <MenuItem value=""><em>None</em></MenuItem>
                                {[1, 2, 3, 4, 5].map((option) => (
                                    <MenuItem key={option} value={option}>{`Bed ${option}`}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdate} color="primary">
                        Close
                    </Button>
                    <Button color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
