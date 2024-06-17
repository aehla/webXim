import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SuccessDialog({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Box 
                    sx={{ 
                        padding: 1, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CheckCircleIcon 
                      sx={{ 
                        fontSize: "100px",
                        marginBottom: 2, // Add some space below the icon
                        color: "#0496C7"
                      }}
                    />
                    <Typography
                        sx={{
                            color: "#0496C7",
                            fontSize: 50,
                            fontFamily: 'Roboto',
                            fontWeight: '700',
                            width: '100%',
                            textAlign: 'center',
                            padding: 1,
                            borderRadius: 1,
                            marginBottom: 2,
                        }}
                    >
                        SUCCESS!
                    </Typography>
                    <DialogActions>
                        <Button onClick={onClose} color="primary" variant="contained">
                            Close
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
