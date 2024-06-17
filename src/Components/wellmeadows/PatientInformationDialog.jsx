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
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function PatientInformationDialog({ open, onClose }) {
    const [viewOpen, setViewOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleViewOpen = (patient) => {
        setSelectedPatient(patient);
        setViewOpen(true);
    };

    const handleUpdateOpen = (patient) => {
        setSelectedPatient(patient);
        setUpdateOpen(true);
    };

    const handleDelete = (patientId) => {
        // Implement the delete logic here
        console.log(`Deleting patient with ID: ${patientId}`);
    };

    const handleCloseView = () => {
        setViewOpen(false);
        setSelectedPatient(null);
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
                            Patient Information
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
                                Patient History
                            </Typography>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Patient Number</TableCell>
                                        <TableCell>Patient Name</TableCell>
                                        <TableCell>On Waiting List</TableCell>
                                        <TableCell>Ward Stay</TableCell>
                                        <TableCell>Expected Leave Date</TableCell>
                                        <TableCell>Actual Bed</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...Array(5)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>Example {index + 1}</TableCell>
                                            <TableCell>Example {index + 1}</TableCell>
                                            <TableCell>Example {index + 1}</TableCell>
                                            <TableCell>Example {index + 1}</TableCell>
                                            <TableCell>Example {index + 1}</TableCell>
                                            <TableCell>Example {index + 1}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleViewOpen(`Patient ${index + 1}`)}
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleUpdateOpen(`Patient ${index + 1}`)}
                                                    sx={{ marginLeft: 1 }}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDelete(index + 1)}
                                                    sx={{ marginLeft: 1 }}
                                                >
                                                    Delete
                                                </Button>
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

            {/* View Patient Dialog */}
            <Dialog open={viewOpen} onClose={handleCloseView} fullWidth maxWidth="sm">
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
                            View Patient Details
                        </Typography>
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="h6">Personal Details</Typography>
                            <TextField label="Patient Number" value={selectedPatient} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="Patient Name" value={selectedPatient} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="Address" value="Example Address" fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="Sex" value="Male" fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="Tel No." value="123-456-7890" fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="Marital Status" value="Single" fullWidth margin="normal" InputProps={{ readOnly: true }} />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="h6">Next-Of-Kin Details</Typography>
                            <TextField label="Full Name" value="Example Name" fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="Relationship" value="Example Relationship" fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="Address" value="Example Address" fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="Telephone No." value="123-456-7890" fullWidth margin="normal" InputProps={{ readOnly: true }} />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="h6">Local Doctor Details</Typography>
                            <TextField label="Full Name" value="Doctor Example" fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="Address" value="Example Address" fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="Telephone No." value="123-456-7890" fullWidth margin="normal" InputProps={{ readOnly: true }} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseView} color="primary">
                        Close
                    </Button>
                </DialogActions>
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
                            <Typography variant="h6">Personal Details</Typography>
                            <TextField label="Patient Number" defaultValue={selectedPatient} fullWidth margin="normal" />
                            <TextField label="Patient Name" defaultValue={selectedPatient} fullWidth margin="normal" />
                            <TextField label="Address" defaultValue="Example Address" fullWidth margin="normal" />
                            <Select label="Sex" defaultValue="Male" fullWidth margin="normal">
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                            </Select>
                            <TextField label="Tel No." defaultValue="123-456-7890" fullWidth margin="normal" />
                            <Select label="Marital Status" defaultValue="Single" fullWidth margin="normal">
                                <MenuItem value="Single">Single</MenuItem>
                                <MenuItem value="Married">Married</MenuItem>
                                <MenuItem value="Divorced">Divorced</MenuItem>
                                <MenuItem value="Widowed">Widowed</MenuItem>
                            </Select>
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="h6">Next-Of-Kin Details</Typography>
                            <TextField label="Full Name" defaultValue="Example Name" fullWidth margin="normal" />
                            <TextField label="Relationship" defaultValue="Example Relationship" fullWidth margin="normal" />
                            <TextField label="Address" defaultValue="Example Address" fullWidth margin="normal" />
                            <TextField label="Telephone No." defaultValue="123-456-7890" fullWidth margin="normal" />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="h6">Local Doctor Details</Typography>
                            <TextField label="Full Name" defaultValue="Doctor Example" fullWidth margin="normal" />
                            <TextField label="Address" defaultValue="Example Address" fullWidth margin="normal" />
                            <TextField label="Telephone No." defaultValue="123-456-7890" fullWidth margin="normal" />
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
