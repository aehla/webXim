import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddDoctorDialog from './AddDoctorDialog';
import supabase from '../../Services/Supabase';

export default function AddPatientDialog({ open, onClose }) {
    const [step, setStep] = useState(1);

    const handleProceed = () => {
        setStep(step + 1);
    };

    const handleClose = () => {
        setStep(1); // Reset to step 1 when closing the dialog
        onClose();
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
                        {step === 1 ? 'Add Patient' : 'Add Patient'}
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            background:
                                'linear-gradient(90deg, #009DD1 24%, #00506B 100%)',
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
                            {step === 1 ? 'Local Doctor Referral' : step === 2 ? 'Patient Information' : 'Next-Of-Kin Details'}
                        </Typography>
                    </Box>

                    {step === 1 && (
                        <LocalDoctorReferral handleProceed={handleProceed} />
                    )}

                    {step === 2 && (
                        <PatientInformation handleProceed={handleProceed} />
                    )}

                    {step === 3 && (
                        <NextOfKinDetails handleProceed={handleProceed} onClose={handleClose} />
                    )}

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

function LocalDoctorReferral({ handleProceed }) {
    const [doctors, setDoctors] = React.useState(null);
    const [doctorList, setDoctorList] = React.useState([]);
    const [showAddDoctorDialog, setShowAddDoctorDialog] = useState(false);

    const handleOpenAddDoctorDialog = () => {
        setShowAddDoctorDialog(true);
    };

    const handleCloseAddDoctorDialog = () => {
        setShowAddDoctorDialog(false);
    };

    React.useEffect(() => {
        const fetchDoctors = async () => {
            let { data, error } = await supabase
                .from('LocalDoctor')
                .select('ClinicNumber, FirstName, LastName')

            if (data) {
                setDoctorList(data);
            }
        }

        fetchDoctors();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                select
                label="Select the doctor who referred the patient"
                value={doctors}
                onChange={(e) => setDoctors(e.target.value)}
            >
                {doctorList.length > 0 ? (
                    doctorList.map((doctor) => (
                        <MenuItem key={doctor.ClinicNumber} value={doctor.ClinicNumber}>
                            {`${doctor.FirstName} ${doctor.LastName}`}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No doctors available</MenuItem>
                )}
            </TextField>
            <Typography
                sx={{ color: 'black', fontSize: 14, mt: 1 }}
            >
                Doctor not listed? <a href="#add-new-doctor" onClick={handleOpenAddDoctorDialog} style={{ color: '#009DD1' }}>Click here</a> to add new local doctor
            </Typography>

            <AddDoctorDialog open={showAddDoctorDialog} onClose={handleCloseAddDoctorDialog} />

            <Button variant="contained" color="primary" onClick={handleProceed} sx={{ mt: 2 }}>
                Proceed
            </Button>
        </Box>
    );
}

function PatientInformation({ handleProceed }) {
    const [patientInfo, setPatientInfo] = useState({
        firstName: '',
        lastName: '',
        sex: 'Male',
        address: '',
        telephone: '',
        dateRegistered: '',
        dateOfBirth: '',
        maritalStatus: 'Single',
    });

    React.useEffect(() => {
        const fetchPatientInfo = async () => {
            let { data, error } = await supabase
                .from('Patient')
                .select('*')
                .single(); // Assuming you are fetching a single patient's data

            if (data) {
                setPatientInfo({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    sex: data.sex,
                    address: data.address,
                    telephone: data.telephone,
                    dateRegistered: data.dateRegistered,
                    dateOfBirth: data.dateOfBirth,
                    maritalStatus: data.maritalStatus,
                });
            }
        };

        fetchPatientInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="First Name"
                name="firstName"
                value={patientInfo.firstName}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Last Name"
                name="lastName"
                value={patientInfo.lastName}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                select
                label="Sex"
                name="sex"
                value={patientInfo.sex}
                onChange={handleChange}
            >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
            </TextField>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Address"
                name="address"
                value={patientInfo.address}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Telephone Number"
                name="telephone"
                value={patientInfo.telephone}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Date Registered"
                name="dateRegistered"
                value={patientInfo.dateRegistered}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                type="date"
                label="Date of Birth"
                name="dateOfBirth"
                value={patientInfo.dateOfBirth}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                select
                label="Marital Status"
                name="maritalStatus"
                value={patientInfo.maritalStatus}
                onChange={handleChange}
            >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Widowed">Widowed</MenuItem>
            </TextField>

            <Button variant="contained" color="primary" onClick={handleProceed} sx={{ mt: 2 }}>
                Proceed
            </Button>
        </Box>
    );
}

function NextOfKinDetails({ handleProceed, onClose }) {
    const [nextOfKin, setNextOfKin] = useState({
        firstName: '',
        lastName: '',
        relationship: '',
        address: '',
        telephone: '',
    });

    React.useEffect(() => {
        const fetchNextOfKinDetails = async () => {
            let { data, error } = await supabase
                .from('NextOfKin')
                .select('*')
                .single(); // Assuming you are fetching a single next-of-kin's data

            if (data) {
                setNextOfKin({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    relationship: data.relationship,
                    address: data.address,
                    telephone: data.telephone,
                });
            }
        };

        fetchNextOfKinDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNextOfKin((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="First Name"
                name="firstName"
                value={nextOfKin.firstName}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Last Name"
                name="lastName"
                value={nextOfKin.lastName}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Relationship"
                name="relationship"
                value={nextOfKin.relationship}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Address"
                name="address"
                value={nextOfKin.address}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Telephone Number"
                name="telephone"
                value={nextOfKin.telephone}
                onChange={handleChange}
            />

            <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
                Add Patient
            </Button>
        </Box>
    );
}
