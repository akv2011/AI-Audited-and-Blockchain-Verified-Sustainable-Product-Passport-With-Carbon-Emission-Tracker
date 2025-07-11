import React from 'react';

const OrderList = ({orders}) => 
orders.sort((a,b) => b.id - a.id)
.map(order => (
    <tr key={order.id}>
        <td className="id">
            <div className="order-id">#{order.id}</div>
        </td>
        <td className="p-name">
            <div className="order-name">{order.name}</div>
        </td>
        <td className="p-comp">
            <div className="quantity-badge">{order.quantity}</div>
        </td>
        <td className="p-comp">
            <div className="unit-tag">{order.unit}</div>
        </td>
        <td className="p-comp">
            <div className="date-info">{new Date(order.date).toLocaleDateString()}</div>
        </td> 
    </tr>
))

const Order = ({ orders}) => {
    if (!orders || orders.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <h3>No Orders Yet</h3>
                <p>Create your first order to get started with supply chain tracking</p>
            </div>
        );
    }

    return (
        <div className="modern-table-container">
            <table className="modern-table">
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Order Name</th> 
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Date Added</th>
                    </tr>
                </thead>
                <tbody>
                    <OrderList orders={orders} />
                </tbody>
            </table>
        </div>
    )
}

export default Order
