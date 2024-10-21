import React, { useState } from 'react';
import '../../styles/Portfolio.css';
import mockStocks from '../../data/mockStocks';

const AssetList = ({ assets, setAssets }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleEdit = (index, field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const saveEdit = (index) => {
    const updatedAssets = [...assets];
    updatedAssets[index] = { ...updatedAssets[index], ...editData };
    setAssets(updatedAssets);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      const updatedAssets = assets.filter((_, i) => i !== index);
      setAssets(updatedAssets);
    }
  };

  const calculateProfitLoss = (asset) => {
    const assetCode = asset.stockCode;
    const assetPrice = mockStocks.find(stock => stock.code === assetCode)?.price || 0;
    const profitLoss = (parseFloat(assetPrice) - parseFloat(asset.stockPrice)) * parseFloat(asset.quantity);
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
                      value={editData.stockCode || asset.stockCode}
                      onChange={(e) => handleEdit(index, 'stockCode', e.target.value)}
                      className="asset-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.stockPrice || asset.stockPrice}
                      onChange={(e) => handleEdit(index, 'stockPrice', e.target.value)}
                      className="asset-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.quantity || asset.quantity}
                      onChange={(e) => handleEdit(index, 'quantity', e.target.value)}
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
                  <td>{asset.stockCode}</td>
                  <td>{asset.stockPrice.toFixed(2)}</td>
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
