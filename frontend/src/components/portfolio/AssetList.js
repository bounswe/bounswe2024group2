import React, { useState } from 'react';
import '../../styles/portfolio/AssetList.css';
import { useAlertModal } from '../alert/AlertModalContext';

const AssetList = ({ assets, setAssets }) => {
  const { showModal } = useAlertModal();
  
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleEdit = (index, field, value, param = "string") => {
    let parsedValue = value;
    if (param === "number") {
      parsedValue = value === "" ? "0" : Number(value);
      if (isNaN(parsedValue)) {
        parsedValue = 0;
      }
    } else if (param === "string") {
      parsedValue = value;
    }
  
    setEditData({ ...editData, [field]: parsedValue });
  };

  const saveEdit = (index) => {
    const updatedAssets = [...assets];
    updatedAssets[index] = { ...updatedAssets[index], ...editData };
    setAssets(updatedAssets);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    showModal(
      'Are you sure you want to delete this asset?', 
      () => {
        const updatedAssets = assets.filter((_, i) => i !== index);
        setAssets(updatedAssets);
      },
      () => {},
      true,
      "Cancel",
      "Delete",
    );
  };

  const calculateProfitLoss = (asset) => {
    const profitLoss = (parseFloat(asset.currentPrice) - parseFloat(asset.boughtPrice)) * parseFloat(asset.quantity);
    return profitLoss.toFixed(2);
  };

  const getProfitLossClass = (asset) => {
    const profitLoss = parseFloat(calculateProfitLoss(asset));
    if (profitLoss > 0) return 'green';
    if (profitLoss < 0) return 'red';
    return '';
  };

  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const displayedAssets = assets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="asset-list-container">
      <table className="asset-table">
        <thead>
          <tr>
            <th>Stock Code</th>
            <th>Stock Price</th>
            <th>Quantity</th>
            <th>Profit/Loss Margin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedAssets.map((asset, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editData.code || asset.code}
                      className="asset-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.boughtPrice || asset.boughtPrice}
                      onChange={(e) => handleEdit(index, 'boughtPrice', e.target.value, "number")}
                      className="asset-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.quantity || asset.quantity}
                      onChange={(e) => handleEdit(index, 'quantity', e.target.value, "number")}
                      className="asset-input"
                    />
                  </td>
                  <td className={getProfitLossClass(asset)}>
                    {calculateProfitLoss(asset)}
                  </td>
                  <td>
                    <button onClick={() => saveEdit(index)} className="asset-save-button">Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{asset.code}</td>
                  <td>{parseFloat(asset.boughtPrice).toFixed(2)}</td>
                  <td>{asset.quantity}</td>
                  <td className={getProfitLossClass(asset)}>
                    {calculateProfitLoss(asset)}
                  </td>
                  <td>
                    <button onClick={() => setEditIndex(index)} className="asset-edit-button">Edit</button>
                    <button onClick={() => handleDelete(index)} className="asset-delete-button">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AssetList;
