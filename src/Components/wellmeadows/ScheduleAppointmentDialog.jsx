import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ScheduleAppointmentDialog({ open, onClose }) {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointmentData, setAppointmentData] = useState({
        patient_id: '',
        consultant_id: '',
        appointment_date: '',
        appointment_time: '',
        examination_room: ''
    });
    const [examinationResult, setExaminationResult] = useState('');

    useEffect(() => {
        const fetchPatientsAndDoctors = async () => {
            try {
                const { data: patientsData } = await supabase.from('patients').select('*');
                setPatients(patientsData);
                
                const { data: doctorsData } = await supabase.from('doctors').select('*');
                setDoctors(doctorsData);
            } catch (error) {
                console.error('Error fetching patients and doctors:', error);
            }
        };

        fetchPatientsAndDoctors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveAppointment = async () => {
        try {
            const { data, error } = await supabase
                .from('appointments')
                .insert([appointmentData]);

            if (error) throw error;

            handleClose();
        } catch (error) {
            console.error('Error saving appointment:', error);
        }
    };

    const handleClearAll = () => {
        setAppointmentData({
            patient_id: '',
            consultant_id: '',
            appointment_date: '',
            appointment_time: '',
            examination_room: ''
        });
        setExaminationResult('');
    };

    const handleClose = () => {
        handleClearAll();
        onClose();
    };

    const handleExaminationResultChange = (e) => {
        setExaminationResult(e.target.value);
    };

    const handleSubmitExamination = () => {
        // Handle the examination submission logic here
        console.log('Examination Result:', examinationResult);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
                        Schedule Appointment
                    </Typography>
                    <Typography
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
                        Appointment Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            select
                            label="Patient's Name"
                            name="patient_id"
                            value={appointmentData.patient_id}
                            onChange={handleChange}
                        >
                            {patients.map((patient) => (
                                <MenuItem key={patient.id} value={patient.id}>
                                    {patient.first_name} {patient.last_name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            select
                            label="Consultant Name"
                            name="consultant_id"
                            value={appointmentData.consultant_id}
                            onChange={handleChange}
                        >
                            {doctors.map((doctor) => (
                                <MenuItem key={doctor.id} value={doctor.id}>
                                    {doctor.first_name} {doctor.last_name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="date"
                            label="Appointment Date"
                            name="appointment_date"
                            InputLabelProps={{ shrink: true }}
                            value={appointmentData.appointment_date}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="time"
                            label="Appointment Time"
                            name="appointment_time"
                            InputLabelProps={{ shrink: true }}
                            value={appointmentData.appointment_time}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Examination Room"
                            name="examination_room"
                            value={appointmentData.examination_room}
                            onChange={handleChange}
                        />
                    </Box>
                    <DialogActions>
                        <Button onClick={handleClearAll} color="primary">
                            Clear All
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSaveAppointment}>
                            Conduct Appointment
                        </Button>
                    </DialogActions>

                    <Typography
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
                            marginTop: 3,
                        }}
                    >
                        Conduct Examination
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
                        <TextField
                            select
                            label="Examination Result"
                            value={examinationResult}
                            onChange={handleExaminationResultChange}
                            variant="outlined"
                            size="small"
                            sx={{ marginBottom: 2, width: '50%' }}
                        >
                            <MenuItem value="Out-Patient">Out-Patient</MenuItem>
                            <MenuItem value="In-Patient">In-Patient</MenuItem>
                            <MenuItem value="Discharged">Discharged</MenuItem>
                        </TextField>
                        <Button variant="contained" color="primary" onClick={handleSubmitExamination}>
                            Submit Examination
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
