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

const AddPharmaceuticalSupply = ({ onClose, addNewPharmaceutical, selectedPharmaceutical, handleUpdateItem }) => {
  const [drugNumber, setDrugNumber] = useState('');
  const [drugName, setDrugName] = useState('');
  const [description, setDescription] = useState('');
  const [dosage, setDosage] = useState('');
  const [methodOfAdmin, setMethodOfAdmin] = useState('');
  const [quantityInStock, setQuantityInStock] = useState(0);
  const [reorderLevel, setReorderLevel] = useState(0);
  const [costPerUnit, setCostPerUnit] = useState('');
  const [supplier, setSupplier] = useState('');

  useEffect(() => {
    if (selectedPharmaceutical) {
      setDrugNumber(selectedPharmaceutical.drugNumber);
      setDrugName(selectedPharmaceutical.drugName);
      setDescription(selectedPharmaceutical.description);
      setDosage(selectedPharmaceutical.dosage);
      setMethodOfAdmin(selectedPharmaceutical.methodOfAdmin);
      setQuantityInStock(selectedPharmaceutical.quantityInStock);
      setReorderLevel(selectedPharmaceutical.reorderLevel);
      setCostPerUnit(selectedPharmaceutical.costPerUnit);
      setSupplier(selectedPharmaceutical.supplier);
    }
  }, [selectedPharmaceutical]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPharmaceutical = {
      drugNumber,
      drugName,
      description,
      dosage,
      methodOfAdmin,
      quantityInStock: parseInt(quantityInStock),
      reorderLevel: parseInt(reorderLevel),
      costPerUnit,
      supplier,
    };

    if (selectedPharmaceutical) {
      handleUpdateItem(newPharmaceutical);
    } else {
      addNewPharmaceutical(newPharmaceutical);
    }
    onClose(); // Close the dialog after submitting
  };

  return (
    <Container>
      <Title>{selectedPharmaceutical ? 'Update Pharmaceutical Supply' : 'Add Pharmaceutical Supply'}</Title>
      <GradientBackground>
        <Subtitle>Pharmaceutical Supply Details</Subtitle>
      </GradientBackground>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Drug Number"
          variant="outlined"
          margin="normal"
          fullWidth
          value={drugNumber}
          onChange={(event) => setDrugNumber(event.target.value)}
          required
        />
        <TextField
          label="Drug Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={drugName}
          onChange={(event) => setDrugName(event.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          margin="normal"
          fullWidth
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <TextField
          label="Dosage"
          variant="outlined"
          margin="normal"
          fullWidth
          value={dosage}
          onChange={(event) => setDosage(event.target.value)}
          required
        />
        <TextField
          select
          label="Method of Admin"
          variant="outlined"
          margin="normal"
          fullWidth
          value={methodOfAdmin}
          onChange={(event) => setMethodOfAdmin(event.target.value)}
          required
        >
          <MenuItem value="Oral">Oral</MenuItem>
          <MenuItem value="Injection">Injection</MenuItem>
          <MenuItem value="Topical">Topical</MenuItem>
          <MenuItem value="Inhalation">Inhalation</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
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
            {selectedPharmaceutical ? 'Update Drug' : 'Add Drug'}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AddPharmaceuticalSupply;
    