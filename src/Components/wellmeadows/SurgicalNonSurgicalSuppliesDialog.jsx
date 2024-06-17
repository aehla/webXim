import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import AddSurgicalNonSurgicalSupply from './AddSurgicalNonSurgicalSupply';

const initialSupplies = [
  {
    itemNumber: 'SN-001',
    itemName: 'Scalpel',
    itemDescription: 'Surgical instrument for cutting',
    quantityInStock: 50,
    reorderLevel: 20,
    costPerUnit: '$15.00',
    supplier: 'Supplier C',
  },
  {
    itemNumber: 'SN-002',
    itemName: 'Bandage',
    itemDescription: 'Used for wound dressing',
    quantityInStock: 200,
    reorderLevel: 100,
    costPerUnit: '$1.00',
    supplier: 'Supplier D',
  },
  // Add more surgical and non-surgical supplies information objects here
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

function SurgicalNonSurgicalSuppliesDialog({ open, onClose }) {
  const [supplies, setSupplies] = useState(() => {
    const storedSupplies = localStorage.getItem('supplies');
    return storedSupplies ? JSON.parse(storedSupplies) : initialSupplies;
  });

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedSupply, setSelectedSupply] = useState(null);

  useEffect(() => {
    localStorage.setItem('supplies', JSON.stringify(supplies));
  }, [supplies]);

  const handleAddItem = () => {
    setSelectedSupply(null);
    setAddDialogOpen(true);
  };

  const handleEditItem = (supply) => {
    setSelectedSupply(supply);
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setSelectedSupply(null);
    setAddDialogOpen(false);
  };

  const handleDeleteItem = (itemNumber) => {
    setSupplies((prevSupplies) =>
      prevSupplies.filter((supply) => supply.itemNumber !== itemNumber)
    );
  };

  const handleUpdateItem = (updatedSupply) => {
    setSupplies((prevSupplies) =>
      prevSupplies.map((supply) =>
        supply.itemNumber === updatedSupply.itemNumber ? updatedSupply : supply
      )
    );
    setAddDialogOpen(false);
  };

  const addNewSupply = (newSupply) => {
    setSupplies([...supplies, newSupply]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl">
      <DialogTitle>Surgical and Non-Surgical Supplies</DialogTitle>
      <StyledDialogContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Subheading>Supplies Details</Subheading>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddItem}>
            Add Item
          </Button>
        </div>
        <StyledTable>
          <thead>
            <tr>
              <th>Item Number</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Quantity In Stock</th>
              <th>Reorder Level</th>
              <th>Cost Per Unit</th>
              <th>Supplier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map((supply) => (
              <tr key={supply.itemNumber}>
                <td>{supply.itemNumber}</td>
                <td>{supply.itemName}</td>
                <td>{supply.itemDescription}</td>
                <td>{supply.quantityInStock}</td>
                <td>{supply.reorderLevel}</td>
                <td>{supply.costPerUnit}</td>
                <td>{supply.supplier}</td>
                <td>
                  <Tooltip title="Edit">
                    <StyledButton
                      variant="contained"
                      size="small"
                      onClick={() => handleEditItem(supply)}
                    >
                      Update
                    </StyledButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <StyledButton
                      variant="contained"
                      size="small"
                      onClick={() => handleDeleteItem(supply.itemNumber)}
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
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <AddSurgicalNonSurgicalSupply
          onClose={handleAddDialogClose}
          addNewSupply={addNewSupply}
          selectedSupply={selectedSupply}
          handleUpdateItem={handleUpdateItem}
        />
      </Dialog>
    </Dialog>
  );
}

export default SurgicalNonSurgicalSuppliesDialog;
