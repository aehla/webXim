
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';

const Container = styled('div')({
  padding: '16px',
  marginBottom: '16px',
  borderRadius: '8px',
  color: 'white',
});

const Title = styled('h2')({
  margin: '0',
  color: 'black',
});

const Subtitle = styled('h3')({
  margin: '0',
  color: 'white',
});

const GradientBackground = styled('div')({
  padding: '16px',
  background: 'linear-gradient(90deg, #009DD1 24%, #00506B 100%)',
  borderRadius: '8px',
});

const AddSurgicalNonSurgicalSupply = ({ onClose, addNewSupply, selectedSupply, handleUpdateItem }) => { // Changed prop name
  const [itemNumber, setItemNumber] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [quantityInStock, setQuantityInStock] = useState(0);
  const [reorderLevel, setReorderLevel] = useState(0);
  const [costPerUnit, setCostPerUnit] = useState('');
  const [supplier, setSupplier] = useState('');

  useEffect(() => {
    if (selectedSupply) {
      setItemNumber(selectedSupply.itemNumber);
      setItemName(selectedSupply.itemName);
      setItemDescription(selectedSupply.itemDescription);
      setQuantityInStock(selectedSupply.quantityInStock);
      setReorderLevel(selectedSupply.reorderLevel);
      setCostPerUnit(selectedSupply.costPerUnit);
      setSupplier(selectedSupply.supplier);
    }
  }, [selectedSupply]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSupply = {
      itemNumber,
      itemName,
      itemDescription,
      quantityInStock: parseInt(quantityInStock),
      reorderLevel: parseInt(reorderLevel),
      costPerUnit,
      supplier,
    };

    if (selectedSupply) {
      handleUpdateItem(newSupply);
    } else {
      addNewSupply(newSupply);
    }
    onClose(); // Close the dialog after submitting
  };

  return (
    <Container>
      <Title>{selectedSupply ? 'Update Supply' : 'Add Supply'}</Title>
      <GradientBackground>
        <Subtitle>Supply Details</Subtitle>
      </GradientBackground>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item Number"
          variant="outlined"
          margin="normal"
          fullWidth
          value={itemNumber}
          onChange={(event) => setItemNumber(event.target.value)}
          required
        />
        <TextField
          label="Item Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={itemName}
          onChange={(event) => setItemName(event.target.value)}
          required
        />
        <TextField
          label="Item Description"
          variant="outlined"
          margin="normal"
          fullWidth
          value={itemDescription}
          onChange={(event) => setItemDescription(event.target.value)}
          required
        />
        <TextField
          label="Quantity in Stock"
          type="number"
          variant="outlined"
          margin="normal"
          fullWidth
          value={quantityInStock}
          onChange={(event) => setQuantityInStock(event.target.value)}
          required
        />
        <TextField
          label="Reorder Level"
          type="number"
          variant="outlined"
          margin="normal"
          fullWidth
          value={reorderLevel}
          onChange={(event) => setReorderLevel(event.target.value)}
          required
        />
        <TextField
          label="Cost Per Unit"
          variant="outlined"
          margin="normal"
          fullWidth
          value={costPerUnit}
          onChange={(event) => setCostPerUnit(event.target.value)}
          required
        />
        <TextField
          select
          label="Supplier"
          variant="outlined"
          margin="normal"
          fullWidth
          value={supplier}
          onChange={(event) => setSupplier(event.target.value)}
          required
        >
          <MenuItem value="Supplier A">Supplier A</MenuItem>
          <MenuItem value="Supplier B">Supplier B</MenuItem>
          <MenuItem value="Supplier C">Supplier C</MenuItem>
          <MenuItem value="Supplier D">Supplier D</MenuItem>
          {/* Add more suppliers as needed */}
        </TextField>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <Button type="submit" variant="contained" color="primary">
            {selectedSupply ? 'Update Supply' : 'Add Supply'}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AddSurgicalNonSurgicalSupply;
