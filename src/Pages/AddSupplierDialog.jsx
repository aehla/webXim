import React, { useState } from 'react';

function AddSupplierDialog({ onClose }) {
  const [supplier, setSupplier] = useState({
    supplierName: '',
    address: '',
    telephone: '',
    fax: '',
  });

  const handleChange = (event) => {
    setSupplier({ ...supplier, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the supplier data to your backend here
    onClose();
  };

  return (
    <div className="add-supplier-dialog">
      <div className="dialog-overlay" onClick={onClose}></div>
      <div className="dialog-content">
        <h2>Add Supplier</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="supplierName">Supplier Name</label>
            <input
              type="text"
              name="supplierName"
              id="supplierName"
              value={supplier.supplierName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              value={supplier.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telephone">Telephone Number</label>
            <input
              type="tel"
              name="telephone"
              id="telephone"
              value={supplier.telephone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fax">Fax Number</label>
            <input type="tel" name="fax" id="fax" value={supplier.fax} onChange={handleChange} />
          </div>
          <button type="submit" style={{ background: 'linear-gradient(90deg, #009DD1 24%, #00506B 100%)' }}>
            Add Supplier
          </button>
        </form>
        <div className="subtitle">
          <h3 style={{ background: 'linear-gradient(90deg, #009DD1 24%, #00506B 100%)' }}>Supplier Details</h3>
        </div>
        <div className="supplier-details">
          {/* Display Supplier Details Here */}
        </div>
      </div>
    </div>
  );
}

export default AddSupplierDialog;
