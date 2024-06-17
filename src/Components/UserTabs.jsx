import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StaffAllocationDialog from './wellmeadows/StaffAllocationDialog';
import AddSupplierDialog from '../Pages/AddSupplierDialog';

const initialStaffData = [
  {
    staffNumber: 1,
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main Street',
    phoneNumber: '555-123-4567',
    dateOfBirth: '1970-01-01',
    sex: 'Male',
    nin: '123456789',
    position: 'Manager',
    currentSalary: 100000,
    salaryScale: 'N/A',
  },
  // Add more staff data objects here...
];

const initialSupplierData = [
  {
    supplierNumber: 1,
    supplierName: 'Supplier 1',
    lastName: 'Last Name 1',
    address: '123 Supplier Street',
    telNo: '555-123-4567',
    faxNumber: '555-987-6543',
  },
  // Add more supplier data objects here...
];

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const StyledButton = styled(Button)({
  // Add your styled button styles here
});

const Subheading = styled('div')({
  background: 'linear-gradient(135deg, #009DD1 24%, #00506B 100%)', // Linear gradient background
  color: 'white',
  padding: '8px 16px', // Padding
  borderRadius: '4px', // Border radius
});

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const UserTabs = () => {
  const [value, setValue] = useState(0);
  const [openAddStaff, setOpenAddStaff] = useState(false); // Changed state variable name
  const [openAddSupplier, setOpenAddSupplier] = useState(false); // New state variable for Add Supplier Dialog
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    nationalInsuranceNumber: '',
    positionHeld: '',
    currentSalary: '',
    salaryScale: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedStaffDetails, setSelectedStaffDetails] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [selectedWard, setSelectedWard] = useState('Ward A'); // Add state for selected ward
  const [staffAllocationData, setStaffAllocationData] = useState([]); // Add state for allocated staff data
  const [suppliers, setSuppliers] = useState([]); // State for suppliers
  const [supplierFormData, setSupplierFormData] = useState({
    supplierNumber: '',
    supplierName: '',
    lastName: '',
    address: '',
    telNo: '',
    faxNumber: '',
  });

  const navigate = useNavigate();

  // Function to retrieve staff data from local storage
  const getStaffDataFromLocalStorage = () => {
    const staffDataFromStorage = localStorage.getItem('staffData');
    if (staffDataFromStorage) {
      setStaffData(JSON.parse(staffDataFromStorage));
    } else {
      setStaffData(initialStaffData);
    }
  };

  // Function to store staff data to local storage
  const storeStaffDataToLocalStorage = (data) => {
    localStorage.setItem('staffData', JSON.stringify(data));
  };

  useEffect(() => {
    getStaffDataFromLocalStorage();
  }, []); // Load staff data on component mount

  useEffect(() => {
    storeStaffDataToLocalStorage(staffData);
  }, [staffData]); // Update local storage when staff data changes

  // Function to retrieve supplier data from local storage
  const getSupplierDataFromLocalStorage = () => {
    const supplierDataFromStorage = localStorage.getItem('supplierData');
    if (supplierDataFromStorage) {
      setSuppliers(JSON.parse(supplierDataFromStorage));
    } else {
      setSuppliers(initialSupplierData);
    }
  };

  // Function to store supplier data to local storage
  const storeSupplierDataToLocalStorage = (data) => {
    localStorage.setItem('supplierData', JSON.stringify(data));
  };

  useEffect(() => {
    getSupplierDataFromLocalStorage();
  }, []);

  useEffect(() => {
    storeSupplierDataToLocalStorage(suppliers);
  }, [suppliers]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedStaff) {
      // Update existing staff member
      const updatedStaffData = staffData.map((staff) =>
        staff.staffNumber === selectedStaff.staffNumber ? { ...staff, ...formData } : staff
      );
      setStaffData(updatedStaffData);
      setSnackbarSeverity('success');
      setSnackbarMessage('Staff member updated successfully!');
      setOpenSnackbar(true);
      setOpenAddStaff(false); // Changed to close Add Staff Dialog
      setSelectedStaff(null);
      // Clear the form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        sex: '',
        address: '',
        phoneNumber: '',
        dateOfBirth: '',
        nationalInsuranceNumber: '',
        positionHeld: '',
        currentSalary: '',
        salaryScale: '',
      });
    } else {
      // Add new staff member
      const newStaff = {
        ...formData,
        staffNumber: staffData.length + 1,
      };
      setStaffData([...staffData, newStaff]);
      setSnackbarSeverity('success');
      setSnackbarMessage('Staff member added successfully!');
      setOpenSnackbar(true);
      setOpenAddStaff(false); // Changed to close Add Staff Dialog
      // Clear the form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        sex: '',
        address: '',
        phoneNumber: '',
        dateOfBirth: '',
        nationalInsuranceNumber: '',
        positionHeld: '',
        currentSalary: '',
        salaryScale: '',
      });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleBackClick = () => {
    navigate('/staff-details'); // Adjust the path to your staff details page
  };

  const handleAddStaff = () => {
    setOpenAddStaff(true); // Changed to open Add Staff Dialog
  };

  const handleUpdateStaff = (staff) => {
    // Populate the form with the data of the selected staff member
    setFormData({
      firstName: staff.firstName,
      lastName: staff.lastName,
      sex: staff.sex,
      address: staff.address,
      phoneNumber: staff.phoneNumber,
      dateOfBirth: staff.dateOfBirth,
      nationalInsuranceNumber: staff.nin,
      positionHeld: staff.position,
      currentSalary: staff.currentSalary,
      salaryScale: staff.salaryScale,
    });

    setSelectedStaff(staff);
    setOpenAddStaff(true); // Changed to open Add Staff Dialog
  };

  const handleDeleteStaff = (staff) => {
    const updatedStaffData = staffData.filter((s) => s.staffNumber !== staff.staffNumber);
    setStaffData(updatedStaffData);
    setSnackbarSeverity('success');
    setSnackbarMessage('Staff member deleted successfully!');
    setOpenSnackbar(true);
  };

  const handleViewStaff = (staffNumber) => {
    const staffDetails = staffData.find((staff) => staff.staffNumber === staffNumber);
    setSelectedStaffDetails(staffDetails);
    setViewDialogOpen(true);
  };

  const handleViewDialogClose = () => {
    setViewDialogOpen(false);
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  // Function to add allocated staff
  const handleAddAllocatedStaff = (allocatedStaff) => {
    setStaffAllocationData([...staffAllocationData, allocatedStaff]);
  };

  // Function to handle adding a new supplier
  const handleAddSupplier = (event) => {
    event.preventDefault();
    const newSupplier = { ...supplierFormData };
    setSuppliers([...suppliers, newSupplier]);
    setSupplierFormData({
      supplierNumber: '',
      supplierName: '',
      lastName: '',
      address: '',
      telNo: '',
      faxNumber: '',
    });
    setOpenAddSupplier(false); // Close Add Supplier Dialog
  };

  // Function to handle updating a supplier
  const handleUpdateSupplier = (index) => {
    const updatedSuppliers = [...suppliers];
    updatedSuppliers[index] = { ...supplierFormData };
    setSuppliers(updatedSuppliers);
  };

  // Function to handle deleting a supplier
  const handleDeleteSupplier = (index) => {
    const updatedSuppliers = [...suppliers];
    updatedSuppliers.splice(index, 1);
    setSuppliers(updatedSuppliers);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={(_, newValue) => setValue(newValue)} aria-label="basic tabs example">
          <Tab label="Staff" {...a11yProps(0)} />
          <Tab label="Staff Allocation" {...a11yProps(1)} />
          <Tab label="Supplier" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'white' }}>
            <Subheading>Staff Details</Subheading>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddStaff}>
              Add Staff
            </Button>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Staff Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>NIN</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Current Salary</TableCell>
                  <TableCell>Salary Scale</TableCell>
                  <TableCell>Actions</TableCell> {/* New column for actions */}
                </TableRow>
              </TableHead>
              <TableBody>
                {staffData.map((staff) => (
                  <TableRow key={staff.staffNumber}>
                    <TableCell>{staff.staffNumber}</TableCell>
                    <TableCell>{staff.firstName} {staff.lastName}</TableCell>
                    <TableCell>{staff.address}</TableCell>
                    <TableCell>{staff.phoneNumber}</TableCell>
                    <TableCell>{staff.dateOfBirth}</TableCell>
                    <TableCell>{staff.sex}</TableCell>
                    <TableCell>{staff.nin}</TableCell>
                    <TableCell>{staff.position}</TableCell>
                    <TableCell>{staff.currentSalary}</TableCell>
                    <TableCell>{staff.salaryScale}</TableCell>
                    <TableCell>
                      <StyledButton variant="contained" sx={{ background: '#009DD1', color: 'white' }} onClick={() => handleDeleteStaff(staff)}>Delete</StyledButton>
                      <StyledButton variant="contained" sx={{ background: '#009DD1', color: 'white' }} onClick={() => handleViewStaff(staff.staffNumber)}>View</StyledButton>
                      <StyledButton variant="contained" sx={{ background: '#009DD1', color: 'white' }} onClick={() => handleUpdateStaff(staff)}>Update</StyledButton> {/* Edit button */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* Staff Allocation Tab Content */}
        <Subheading>Assign Staff to Wards</Subheading>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Staff Number</TableCell>
                <TableCell>Staff Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Shift</TableCell>
                <TableCell>Ward</TableCell> {/* New column for Ward */}
              </TableRow>
            </TableHead>
            <TableBody>
              {staffAllocationData.map((staff) => (
                <TableRow key={staff.staffNumber}>
                  <TableCell>{staff.staffNumber}</TableCell>
                  <TableCell>{staff.firstName}</TableCell>
                  <TableCell>{staff.lastName}</TableCell>
                  <TableCell>{staff.position}</TableCell>
                  <TableCell>{selectedWard}</TableCell> {/* Display selected ward */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Add Staff Allocation dialog */}
        <StaffAllocationDialog
          open={openAddStaff} // Changed state variable name
          onClose={() => setOpenAddStaff(false)} // Changed to close Add Staff Dialog
          onAdd={handleAddAllocatedStaff} // Pass the handle function to add allocated staff
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* Supplier Tab Content */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Subheading>Supplier Details</Subheading>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenAddSupplier(true)}>
            Add Supplier
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Supplier Number</TableCell>
                <TableCell>Supplier Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Tel. No.</TableCell>
                <TableCell>Fax Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier, index) => (
                <TableRow key={index}>
                  <TableCell>{supplier.supplierNumber}</TableCell>
                  <TableCell>{supplier.supplierName}</TableCell>
                  <TableCell>{supplier.lastName}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.telNo}</TableCell>
                  <TableCell>{supplier.faxNumber}</TableCell>
                  <TableCell>
                    <StyledButton
                      variant="contained"
                      sx={{ background: '#009DD1', color: 'white', marginRight: '8px' }}
                      onClick={() => handleUpdateSupplier(index)}
                    >
                      Update
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      sx={{ background: '#009DD1', color: 'white' }}
                      onClick={() => handleDeleteSupplier(index)}
                    >
                      Delete
                    </StyledButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Supplier Add Dialog */}
        <Dialog open={openAddSupplier} onClose={() => setOpenAddSupplier(false)}>
          <DialogTitle>Add Supplier</DialogTitle>
          <DialogContent>
            <form onSubmit={handleAddSupplier}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Supplier Number"
                    name="supplierNumber"
                    value={supplierFormData.supplierNumber}
                    onChange={(e) =>
                      setSupplierFormData({ ...supplierFormData, supplierNumber: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Supplier Name"
                    name="supplierName"
                    value={supplierFormData.supplierName}
                    onChange={(e) =>
                      setSupplierFormData({ ...supplierFormData, supplierName: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={supplierFormData.lastName}
                    onChange={(e) =>
                      setSupplierFormData({ ...supplierFormData, lastName: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={supplierFormData.address}
                    onChange={(e) =>
                      setSupplierFormData({ ...supplierFormData, address: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tel. No."
                    name="telNo"
                    value={supplierFormData.telNo}
                    onChange={(e) =>
                      setSupplierFormData({ ...supplierFormData, telNo: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Fax Number"
                    name="faxNumber"
                    value={supplierFormData.faxNumber}
                    onChange={(e) =>
                      setSupplierFormData({ ...supplierFormData, faxNumber: e.target.value })
                    }
                    required
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddSupplier} variant="contained" color="primary">
              Add Supplier
            </Button>
            <Button onClick={() => setOpenAddSupplier(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </CustomTabPanel>

      <Dialog open={openAddStaff} onClose={() => setOpenAddStaff(false)}>
        <DialogTitle>{selectedStaff ? 'Update' : 'Add'} Staff Member</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Sex</InputLabel>
                  <Select
                    value={formData.sex}
                    label="Sex"
                    onChange={handleChange}
                    name="sex"
                    required
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="National Insurance Number"
                  name="nationalInsuranceNumber"
                  value={formData.nationalInsuranceNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Position Held"
                  name="positionHeld"
                  value={formData.positionHeld}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Current Salary"
                  name="currentSalary"
                  type="number"
                  value={formData.currentSalary}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Salary Scale"
                  name="salaryScale"
                  value={formData.salaryScale}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedStaff ? 'Update' : 'Add'} Staff Member
          </Button>
          <Button onClick={() => setOpenAddStaff(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={viewDialogOpen} onClose={handleViewDialogClose}>
        <DialogTitle>Staff Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Staff Number: {selectedStaffDetails?.staffNumber}
          </Typography>
          <Typography variant="body1">
            Name: {selectedStaffDetails?.firstName} {selectedStaffDetails?.lastName}
          </Typography>
          <Typography variant="body1">Address: {selectedStaffDetails?.address}</Typography>
          <Typography variant="body1">Phone Number: {selectedStaffDetails?.phoneNumber}</Typography>
          <Typography variant="body1">Date of Birth: {selectedStaffDetails?.dateOfBirth}</Typography>
          <Typography variant="body1">Sex: {selectedStaffDetails?.sex}</Typography>
          <Typography variant="body1">NIN: {selectedStaffDetails?.nin}</Typography>
          <Typography variant="body1">Position: {selectedStaffDetails?.position}</Typography>
          <Typography variant="body1">Current Salary: {selectedStaffDetails?.currentSalary}</Typography>
          <Typography variant="body1">Salary Scale: {selectedStaffDetails?.salaryScale}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTabs;
