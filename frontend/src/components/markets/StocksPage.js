import React from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/StocksPage.css"
import { useState } from 'react';
import Tooltip from './Tooltip';

const mockStocks = {
  1: [// BIST 30
      { code: 'AKBNK', name: 'Akbank T.A.Ş.', price: 8.76 },
      { code: 'ALARK', name: 'Alarko Holding A.Ş.', price: 6.78 },
      { code: 'ARCLK', name: 'Arçelik A.Ş.', price: 29.56 },
      { code: 'ASELS', name: 'Aselsan Elektronik Sanayi ve Ticaret A.Ş.', price: 23.67 },
      { code: 'BIMAS', name: 'BİM Birleşik Mağazalar A.Ş.', price: 14.89 },
      { code: 'DOHOL', name: 'Doğan Holding A.Ş.', price: 3.12 },
      { code: 'EKGYO', name: 'Emlak Konut Gayrimenkul Yatırım Ortaklığı A.Ş.', price: 3.78 },
      { code: 'ENJSA', name: 'Enerjisa Enerji A.Ş.', price: 13.22 },
      { code: 'EREGL', name: 'Ereğli Demir ve Çelik Fabrikaları T.A.Ş.', price: 9.47 },
      { code: 'FROTO', name: 'Ford Otosan A.Ş.', price: 25.45 },
      { code: 'GARAN', name: 'Türkiye Garanti Bankası A.Ş.', price: 11.23 },
      { code: 'ISCTR', name: 'Türkiye İş Bankası A.Ş.', price: 6.35 },
      { code: 'KCHOL', name: 'Koç Holding A.Ş.', price: 18.90 },
      { code: 'KOZAA', name: 'Koza Altın İşletmeleri A.Ş.', price: 10.22 },
      { code: 'KRDMD', name: 'Kardemir Karabük Demir Çelik Sanayi ve Ticaret A.Ş.', price: 4.56 },
      { code: 'ODAS', name: 'Odaş Elektrik Üretim Sanayi Ticaret A.Ş.', price: 1.82 },
      { code: 'PETKM', name: 'Petkim Petrokimya Holding A.Ş.', price: 6.78 },
      { code: 'PGSUS', name: 'Pegasus Hava Taşımacılığı A.Ş.', price: 20.50 },
      { code: 'SAHOL', name: 'Hacı Ömer Sabancı Holding A.Ş.', price: 12.67 },
      { code: 'SISE', name: 'Şişecam A.Ş.', price: 10.33 },
      { code: 'SODA', name: 'Soda Sanayii A.Ş.', price: 7.44 },
      { code: 'TAVHL', name: 'TAV Havalimanları Holding A.Ş.', price: 19.05 },
      { code: 'TCELL', name: 'Turkcell İletişim Hizmetleri A.Ş.', price: 14.32 },
      { code: 'THYAO', name: 'Türk Hava Yolları A.O.', price: 15.56 },
      { code: 'TOASO', name: 'Tofaş Türk Otomobil Fabrikası A.Ş.', price: 20.87 },
      { code: 'TTKOM', name: 'Türk Telekomünikasyon A.Ş.', price: 7.68 },
      { code: 'TUPRS', name: 'Tüpraş-Türkiye Petrol Rafinerileri A.Ş.', price: 31.23 },
      { code: 'VAKBN', name: 'Türkiye Vakıflar Bankası T.A.O.', price: 7.12 },
      { code: 'YKBNK', name: 'Yapı ve Kredi Bankası A.Ş.', price: 8.23 }],
  2: [ // S&P top 50
      { code: 'AAPL', name: 'Apple Inc.', price: 175.00 },
      { code: 'MSFT', name: 'Microsoft Corporation', price: 350.00 },
      { code: 'AMZN', name: 'Amazon.com, Inc.', price: 145.00 },
      { code: 'GOOGL', name: 'Alphabet Inc. (Class A)', price: 120.00 },
      { code: 'FB', name: 'Meta Platforms, Inc.', price: 300.00 },
      { code: 'TSLA', name: 'Tesla, Inc.', price: 720.00 },
      { code: 'BRK.B', name: 'Berkshire Hathaway Inc. (Class B)', price: 325.00 },
      { code: 'NVDA', name: 'NVIDIA Corporation', price: 480.00 },
      { code: 'JPM', name: 'JPMorgan Chase & Co.', price: 140.00 },
      { code: 'JNJ', name: 'Johnson & Johnson', price: 160.00 },
      { code: 'V', name: 'Visa Inc.', price: 250.00 },
      { code: 'PG', name: 'Procter & Gamble Co.', price: 145.00 },
      { code: 'UNH', name: 'UnitedHealth Group Incorporated', price: 490.00 },
      { code: 'HD', name: 'The Home Depot, Inc.', price: 330.00 },
      { code: 'DIS', name: 'The Walt Disney Company', price: 120.00 },
      { code: 'PYPL', name: 'PayPal Holdings, Inc.', price: 80.00 },
      { code: 'MA', name: 'Mastercard Incorporated', price: 380.00 },
      { code: 'CMCSA', name: 'Comcast Corporation', price: 40.00 },
      { code: 'VZ', name: 'Verizon Communications Inc.', price: 35.00 },
      { code: 'NFLX', name: 'Netflix, Inc.', price: 490.00 },
      { code: 'PEP', name: 'PepsiCo, Inc.', price: 190.00 },
      { code: 'T', name: 'AT&T Inc.', price: 15.00 },
      { code: 'CSCO', name: 'Cisco Systems, Inc.', price: 55.00 },
      { code: 'INTC', name: 'Intel Corporation', price: 30.00 },
      { code: 'IBM', name: 'International Business Machines Corporation', price: 135.00 },
      { code: 'TXN', name: 'Texas Instruments Incorporated', price: 185.00 },
      { code: 'LLY', name: 'Eli Lilly and Company', price: 560.00 },
      { code: 'MDT', name: 'Medtronic plc', price: 90.00 },
      { code: 'COST', name: 'Costco Wholesale Corporation', price: 500.00 },
      { code: 'NOW', name: 'ServiceNow, Inc.', price: 550.00 },
      { code: 'QCOM', name: 'QUALCOMM Incorporated', price: 120.00 },
      { code: 'NKE', name: 'Nike, Inc.', price: 150.00 },
      { code: 'MRK', name: 'Merck & Co., Inc.', price: 110.00 },
      { code: 'AMGN', name: 'Amgen Inc.', price: 250.00 },
      { code: 'ISRG', name: 'Intuitive Surgical, Inc.', price: 300.00 },
      { code: 'LMT', name: 'Lockheed Martin Corporation', price: 420.00 },
      { code: 'SPGI', name: 'S&P Global Inc.', price: 400.00 },
      { code: 'MDLZ', name: 'Mondelez International, Inc.', price: 62.00 },
      { code: 'HON', name: 'Honeywell International Inc.', price: 220.00 },
      { code: 'TMO', name: 'Thermo Fisher Scientific Inc.', price: 550.00 },
      { code: 'ADBE', name: 'Adobe Inc.', price: 550.00 },
      { code: 'CAT', name: 'Caterpillar Inc.', price: 260.00 },
      { code: 'SYK', name: 'Stryker Corporation', price: 280.00 },
      { code: 'SYY', name: 'Sysco Corporation', price: 80.00 },
      { code: 'FIS', name: 'Fidelity National Information Services, Inc.', price: 70.00 },
      { code: 'C', name: 'Citigroup Inc.', price: 55.00 },
      { code: 'AXP', name: 'American Express Company', price: 180.00 },
      { code: 'MCO', name: 'Moody\'s Corporation', price: 360.00 },
      { code: 'BKNG', name: 'Booking Holdings Inc.', price: 2200.00 },
      { code: 'SCHW', name: 'The Charles Schwab Corporation', price: 90.00 },
      { code: 'DHR', name: 'Danaher Corporation', price: 310.00 },
      { code: 'ZTS', name: 'Zoetis Inc.', price: 200.00 },
      { code: 'LRCX', name: 'Lam Research Corporation', price: 600.00 },
      { code: 'FISV', name: 'FISV', price: 120.00 },
      { code: 'ADP', name: 'Automatic Data Processing, Inc.', price: 240.00 }],
  };

  const mockIndices = [
    { id: 1, name: "BIST30" },
    { id: 2, name: 'S&P TOP 50' },
];

const StocksPage = () => {
  const { indexId } = useParams(); // Get the index ID from the URL
  const stocks = mockStocks[indexId]; // Get stocks based on the index ID
  const indexName = mockIndices.find(index => index.id === parseInt(indexId))?.name || 'Unknown Index';

  const [tooltip, setTooltip] = useState({ visible: false, stock: null, position: {} });

  const handleMouseEnter = (stock, event) => {
      const tooltipPosition = {
          top: event.clientY + 10, // Offset to position tooltip below the mouse
          left: event.clientX + 10,
      };
      setTooltip({ visible: true, stock, position: tooltipPosition });
  };

  const handleMouseLeave = () => {
      setTooltip({ visible: false, stock: null, position: {} });
  };

  return (
      <>
          <div className="stocks-container">
              <h2>Stocks in {indexName}</h2>
              <div className="stocks-table">
                  <table>
                      <thead>
                          <tr>
                              <th>Stock Code</th>
                              <th>Stock Name</th>
                              <th>Price</th>
                          </tr>
                      </thead>
                      <tbody>
                          {stocks && stocks.length > 0 ? (
                              stocks.map(stock => (
                                  <tr 
                                      key={stock.code}
                                      className="stock-row" 
                                      onMouseEnter={(event) => handleMouseEnter(stock, event)}
                                      onMouseLeave={handleMouseLeave}
                                  >
                                      <td>{stock.code}</td>
                                      <td>{stock.name}</td>
                                      <td>${stock.price.toFixed(2)}</td>
                                  </tr>
                              ))
                          ) : (
                              <tr>
                                  <td colSpan="3">No stocks available for this index.</td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
          {/* Render Tooltip outside the stocks-container */}
          {tooltip.visible && <Tooltip stock={tooltip.stock} position={tooltip.position} />}
      </>
  );
};

export default StocksPage;