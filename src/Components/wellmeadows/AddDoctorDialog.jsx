// AddDoctorDialog.js

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import supabase from '../../Services/Supabase';
import SuccessDialog from '../SuccessDialog';

export default function AddDoctorDialog({ open, onClose }) {
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const [FirstName, setFirstName] = React.useState('');
    const [LastName, setLastName] = React.useState('');
    const [Address, setAddress] = React.useState('');
    const [TelephoneNumber, setTelephoneNumber] = React.useState('');
    const [formError, setFormError] = React.useState('');

    const handleOpenSuccessDialog = () => {
        setShowSuccessDialog(true);
    };

    const handleCloseSuccessDialog = () => {
        setShowSuccessDialog(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!FirstName || !LastName || !Address || !TelephoneNumber) {
            setFormError('Please fill in all the fields correctly');
            return;
        }

        const { data, error } = await supabase
        .from('LocalDoctor')
        .insert([
        { FirstName, LastName, Address, TelephoneNumber },
        ])
        .select()

        if (error) {
            console.log(error);
            setFormError('Please fill in all the fields correctly');
        }

        if (data) {
            console.log(data);
            setFormError(null);
            handleOpenSuccessDialog();
        }
        
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Box sx={{ padding: 1 }}>
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
                        Add New Doctor
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                        {formError && <Typography>{formError}</Typography>}

                        <TextField 
                            fullWidth 
                            variant="outlined" 
                            size="small" 
                            label="First Name" 
                            value={FirstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <TextField 
                            fullWidth 
                            variant="outlined" 
                            size="small" 
                            label="Last Name" 
                            value={LastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <TextField 
                            fullWidth 
                            variant="outlined" 
                            size="small" 
                            label="Address" 
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <TextField 
                            fullWidth 
                            variant="outlined" 
                            size="small" 
                            label="Telephone Number" 
                            value={TelephoneNumber}
                            onChange={(e) => setTelephoneNumber(e.target.value)}
                        />
                    </Box>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Save
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>

            <SuccessDialog open={showSuccessDialog} onClose={handleCloseSuccessDialog} />
        </Dialog>
    );
}