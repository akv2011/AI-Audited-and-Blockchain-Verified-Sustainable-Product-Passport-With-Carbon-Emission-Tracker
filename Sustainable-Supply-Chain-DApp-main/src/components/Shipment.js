import React from 'react'
import { IoLocationSharp } from 'react-icons/io5'

const getSupplierName = (account) => {
    const suppliers = {
        "0xf00EbF44706A84d73698D51390a6801215fF338c": "Supplier #1",
        "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae": "Supplier #2", 
        "0xa686525B5A5c9353c649b9Ef7f387a9B92085619": "Supplier #3",
        "0x5e66410a4C6443d035E05162C9bb59708cB0596F": "Supplier #4",
        "0x3421668462324bFB48EA07D0B12243091CD09759": "Company"
    };
    return suppliers[account] || `${account.slice(0, 6)}...${account.slice(-4)}`;
};

const getStatusColor = (shipType) => {
    return shipType.includes('Sent') ? '#f59e0b' : '#10b981';
};

const ShipList = ({shipments, orders}) => 
shipments.sort((a,b) => b.id - a.id)
.map(shipment => (
    <tr className="shipments" key={shipment.id}>
        <td className="shipType">
            <div 
                className="status-badge" 
                style={{ backgroundColor: getStatusColor(shipment.shipType) }}
            >
                {shipment.shipType}
            </div>
        </td>
        <td className="shipType">
            <div className="order-ref">#{shipment.product}</div>
        </td>
        <td className="shipType">
            <div className="product-name">
                {orders.filter(obj => obj.id.includes(shipment.product)).map(order => order.name)}
            </div>
        </td>
        <td className="shipType">
            <div className="process-tag">{shipment.process}</div>
        </td>
        <td className="address">
            <div className="location-info">
                <IoLocationSharp style={{ color: '#0071ce', marginRight: '6px' }} />
                {shipment.place}
            </div>
        </td>
        <td className="map">
            <div className="map-container">
                {shipment.latitude && shipment.longitude ? (
                    <div 
                        style={{
                            width: "120px", 
                            height: "80px", 
                            cursor: "pointer", 
                            borderRadius: "8px",
                            border: "2px solid #e5e7eb",
                            backgroundColor: "#f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "10px",
                            color: "#6b7280"
                        }}
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${shipment.latitude},${shipment.longitude}`)}
                        title={`Click to view location: ${shipment.latitude}, ${shipment.longitude}`}
                    >
                        📍 Map<br/>
                        {shipment.latitude ? shipment.latitude.substring(0,6) : 'N/A'}<br/>
                        {shipment.longitude ? shipment.longitude.substring(0,6) : 'N/A'}
                    </div>
                ) : (
                    <div 
                        style={{
                            width: "120px", 
                            height: "80px", 
                            borderRadius: "8px",
                            border: "2px dashed #d1d5db",
                            backgroundColor: "#f9fafb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "10px",
                            color: "#9ca3af"
                        }}
                    >
                        No Location
                    </div>
                )}
            </div>
        </td>
        <td className="date">
            <div className="date-info">
                {new Date(shipment.date).toLocaleDateString()}
            </div>
        </td>
        <td className="p-comp">
            <div className="supplier-badge">
                {getSupplierName(shipment.account)}
            </div>
        </td>
    </tr>
))

const Shipment = ({shipments, orders}) => {
    if (!shipments || shipments.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">🚚</div>
                <h3>No Shipments Yet</h3>
                <p>Start tracking shipments to monitor your supply chain in real-time</p>
            </div>
        );
    }

    return (
        <div className="modern-table-container">
            <table className="modern-table">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Order #</th>                
                        <th>Product</th>                
                        <th>Process</th>                                
                        <th>Location</th>
                        <th>Map View</th>
                        <th>Date Added</th>
                        <th>Added by</th>
                    </tr>
                </thead>
                <tbody>
                    <ShipList shipments={shipments} orders={orders} />
                </tbody>
            </table>
        </div>
    )
}

export default Shipment
