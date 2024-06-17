import React from 'react';
import Dialog from '@mui/material/Dialog';
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
import ButtonGroup from '@mui/material/ButtonGroup';

export default function OutPatientDialog({ open, onClose }) {
    const handleDelete = (patientId) => {
        // Implement the delete logic here
        console.log(`Deleting outpatient with ID: ${patientId}`);
    };

    return (
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
                        Out-Patients
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
                            Current Out-Patients
                        </Typography>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Patient Number</TableCell>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>Sex</TableCell>
                                    <TableCell>Telephone Number</TableCell>
                                    <TableCell>Appointment Date</TableCell>
                                    <TableCell>Appointment Time</TableCell>
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
                                            {/* Replace with appropriate component */}
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
                                            {/* Replace with appropriate component */}
                                        </TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="contained" color="error">
                                                <Button onClick={() => handleDelete(index + 1)}>Delete</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={onClose} color="primary">
                            Close
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
