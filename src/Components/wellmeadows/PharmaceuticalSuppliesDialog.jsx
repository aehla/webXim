import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import AddPharmaceuticalSupply from './AddPharmaceuticalSupplyDialog';

const initialPharmaceuticals = [
  {
    drugNumber: 'P-001',
    drugName: 'Aspirin',
    description: 'Pain reliever',
    dosage: '500mg',
    methodOfAdmin: 'Oral',
    quantityInStock: 100,
    reorderLevel: 50,
    costPerUnit: '$0.10',
    supplier: 'Supplier A',
  },
  {
    drugNumber: 'P-002',
    drugName: 'Penicillin',
    description: 'Antibiotic',
    dosage: '250mg',
    methodOfAdmin: 'Injection',
    quantityInStock: 200,
    reorderLevel: 100,
    costPerUnit: '$0.50',
    supplier: 'Supplier B',
  },
  // Add more pharmaceutical supplies information objects here
];

const StyledDialogContent = styled(DialogContent)({
  width: '100%',
  maxHeight: '80vh',
  overflowX: 'auto',
});

const StyledTable = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  '& th, & td': {
    border: '1px solid #009DD1', // Change border color to #009DD1
    padding: '12px', // Increase padding
    textAlign: 'left',
  },
  '& th': {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#009DD1',
  color: 'white',
  '&:hover': {
    backgroundColor: '#007BA7',
  },
});

const Subheading = styled('div')({
  background: 'linear-gradient(90deg, #009DD1 24%, #00506B 100%)',
  color: 'white',
  padding: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'left',
});

function PharmaceuticalSuppliesDialog({ open, onClose }) {
  const [pharmaceuticals, setPharmaceuticals] = useState(() => {
    const storedPharmaceuticals = localStorage.getItem('pharmaceuticals');
    return storedPharmaceuticals ? JSON.parse(storedPharmaceuticals) : initialPharmaceuticals;
  });

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedPharmaceutical, setSelectedPharmaceutical] = useState(null);

  useEffect(() => {
    localStorage.setItem('pharmaceuticals', JSON.stringify(pharmaceuticals));
  }, [pharmaceuticals]);

  const handleAddItem = () => {
    setSelectedPharmaceutical(null);
    setAddDialogOpen(true);
  };

  const handleEditItem = (pharmaceutical) => {
    setSelectedPharmaceutical(pharmaceutical);
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setSelectedPharmaceutical(null);
    setAddDialogOpen(false);
  };

  const handleDeleteItem = (drugNumber) => {
    setPharmaceuticals((prevPharmaceuticals) =>
      prevPharmaceuticals.filter((pharmaceutical) => pharmaceutical.drugNumber !== drugNumber)
    );
  };

  const handleUpdateItem = (updatedPharmaceutical) => {
    setPharmaceuticals((prevPharmaceuticals) =>
      prevPharmaceuticals.map((pharmaceutical) =>
        pharmaceutical.drugNumber === updatedPharmaceutical.drugNumber ? updatedPharmaceutical : pharmaceutical
      )
    );
    setAddDialogOpen(false);
  };

  const addNewPharmaceutical = (newPharmaceutical) => {
    setPharmaceuticals([...pharmaceuticals, newPharmaceutical]);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} maxWidth="xl">
        <DialogTitle>Pharmaceutical Supplies</DialogTitle>
        <StyledDialogContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <Subheading>Pharmaceutical Supplies Details</Subheading>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddItem}>
              Add Item
            </Button>
          </div>
          <StyledTable>
            <thead>
              <tr>
                <th>Drug Number</th>
                <th>Drug Name</th>
                <th>Description</th>
                <th>Dosage</th>
                <th>Method of Admin</th>
                <th>Quantity in Stock</th>
                <th>Reorder Level</th>
                <th>Cost per Unit</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pharmaceuticals.map((pharmaceutical) => (
                <tr key={pharmaceutical.drugNumber}>
                  <td>{pharmaceutical.drugNumber}</td>
                  <td>{pharmaceutical.drugName}</td>
                  <td>{pharmaceutical.description}</td>
                  <td>{pharmaceutical.dosage}</td>
                  <td>{pharmaceutical.methodOfAdmin}</td>
                  <td>{pharmaceutical.quantityInStock}</td>
                  <td>{pharmaceutical.reorderLevel}</td>
                  <td>{pharmaceutical.costPerUnit}</td>
                  <td>{pharmaceutical.supplier}</td>
                  <td>
                    <Tooltip title="Edit">
                      <StyledButton
                        variant="contained"
                        size="small"
                        onClick={() => handleEditItem(pharmaceutical)}
                      >
                        Update
                      </StyledButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <StyledButton
                        variant="contained"
                        size="small"
                        onClick={() => handleDeleteItem(pharmaceutical.drugNumber)}
                      >
                        Delete
                      </StyledButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <AddPharmaceuticalSupply
          onClose={handleAddDialogClose}
          addNewPharmaceutical={addNewPharmaceutical}
          selectedPharmaceutical={selectedPharmaceutical}
          handleUpdateItem={handleUpdateItem}
        />
      </Dialog>
    </React.Fragment>
  );
}

export default PharmaceuticalSuppliesDialog;
