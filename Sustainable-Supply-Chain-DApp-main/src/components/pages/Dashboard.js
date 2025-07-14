import React, { useState, useEffect} from 'react'
import Web3 from "web3"
import Origin from "../../abis/Origin.json"
import AddOrder from '../AddOrder'
import Order from '../Order'
import Sidebar from '../Sidebar'
import Shipment from '../Shipment'
import AddShipment from '../AddShipment'
import Button from "../FormButton"
import WalmartLogo from '../WalmartLogo'
import './Dashboard.css'

const Dashboard = () => {

    const [web3Loaded, setWeb3Loaded] = useState(false)

    useEffect(() => { 
        const loadWeb3 = async () => {
          //Load ethereum or web3 object on the browser
            if(window.ethereum) {
              window.web3 = new Web3(window.ethereum)
              await window.ethereum.enable()
              setWeb3Loaded(true)
            } else if (window.web3) {
              window.web3 = new Web3(window.web3.currentProvider)
              setWeb3Loaded(true)
            } else {
              window.alert("Please use Metamask!")
            }
        }
        loadWeb3()}, [])

    useEffect(() => { 
            const loadBlockchainData = async () => {
                if (!web3Loaded) return
                const web3 = window.web3
                //Load account
                const accounts = await web3.eth.getAccounts()
                // console.log(accounts)
                setAccount(accounts[0])
                // console.log(account)
                // console.log(Origin.abi)
                const networkId = await web3.eth.net.getId()
                console.log("Detected Network ID:", networkId)
                console.log("Available networks in Origin contract:", Object.keys(Origin.networks))
                const networkData = Origin.networks[networkId]
                console.log("Network data for", networkId, ":", networkData)
                if (networkData) {
                    //Fetch contract
                    const contract = new web3.eth.Contract(Origin.abi, networkData.address)
                    setContract(contract)
                    console.log("Contract loaded successfully:", networkData.address)
                    const orderCount = await contract.methods.orderCount().call()
                    //Load orders
                    for (var i = 1; i <= orderCount; i++) {
                        const newOrder = await contract.methods.orders(i).call()
                        setOrder(orders =>([...orders, newOrder]))
                    }
                    const shipmentCount = await contract.methods.shipmentCount().call()
                    //Load shipments
                    for (var i = 1; i <= shipmentCount; i++) {
                        const newShipment = await contract.methods.shipments(i).call()
                        setShipment(shipments =>([...shipments, newShipment]))
                        setLatlong(shipments =>([...shipments, JSON.parse(newShipment.latlong)]))
                    }
                    }
                else { 
                    console.error("Contract not found for network ID:", networkId)
                    console.error("Available networks:", Object.keys(Origin.networks))
                    window.alert(`Origin contract is not deployed to the detected network (ID: ${networkId}). Available networks: ${Object.keys(Origin.networks).join(', ')}`)
                }
            }
        loadBlockchainData()}, [web3Loaded])
    
    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [showCreateOrder, setShowCreateOrder] = useState(false)
    const [showCreateShip, setShowCreateShip] = useState(false)
    const [orders, setOrder] = useState([])
    const [shipments, setShipment] = useState([])
    const [shipType, setShipType] = useState("")
    const [latlong, setLatlong] = useState([])
    
    const newShipment = (shipments.map(t1 => ({...t1, ...latlong.find(t2 => t2.id === t1.id)})))

    //Add Order
    const addOrder = ({name, quantity, unit, date}) => {
        contract.methods.addOrder(name, quantity, unit, date).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.reload()
          })
    }

    //Add Shipment
    const addShipment = ({shipType, place, latlong, date, product, process}) => {
        contract.methods.addShipment(shipType, place, latlong, date, product, process).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.reload()
          })
    }

    return (
        <>
        <div className="modern-dashboard">
            <Sidebar/>
            
            {/* Modern Header */}
            <div className="dashboard-content">
                <header className="modern-header">
                    <div className="header-left">
                        <WalmartLogo size="medium" showText={true} />
                        <div className="header-title">
                            <h1>Supply Chain Dashboard</h1>
                            <p>Sustainable Product Passport & Analytics</p>
                        </div>
                    </div>
                    <div className="header-actions">
                        <div className="action-group">
                            <Button 
                                onClick={() => {setShowCreateShip(!showCreateShip); setShipType("Shipment Sent")}}
                                color="orange"
                                text="📦 Send Shipment"
                                className="modern-btn"
                            />
                            <Button 
                                onClick={() => {setShowCreateShip(!showCreateShip); setShipType("Shipment Received")}}
                                color="gold"
                                text="📥 Receive Shipment"
                                className="modern-btn"
                            />
                            <Button 
                                onClick= {() => {setShowCreateOrder(!showCreateOrder)}}
                                color= {showCreateOrder ? "#f2f2f2" : "#3eb049"}
                                text= {showCreateOrder ? "✕ Cancel" : "➕ Create Order"}
                                className="modern-btn primary"
                            />
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📋</div>
                        <div className="stat-content">
                            <h3>{orders.length}</h3>
                            <p>Total Orders</p>
                        </div>
                        <div className="stat-trend positive">+12%</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🚚</div>
                        <div className="stat-content">
                            <h3>{shipments.length}</h3>
                            <p>Active Shipments</p>
                        </div>
                        <div className="stat-trend positive">+8%</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🌱</div>
                        <div className="stat-content">
                            <h3>92%</h3>
                            <p>Sustainability Score</p>
                        </div>
                        <div className="stat-trend positive">+5%</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🔗</div>
                        <div className="stat-content">
                            <h3>Active</h3>
                            <p>Blockchain Status</p>
                        </div>
                        <div className="stat-indicator online"></div>
                    </div>
                </div>

                {/* Modal Forms */}
                {showCreateOrder && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <AddOrder addOrder={addOrder} onAdd= {() => {setShowCreateOrder(!showCreateOrder)}} />
                        </div>
                    </div>
                )}
                
                {showCreateShip && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <AddShipment addShipment={addShipment} shipType={shipType} onShipAdd= {() => {setShowCreateShip(!showCreateShip)}} />
                        </div>
                    </div>
                )}

                {/* Content Sections */}
                <div className="dashboard-sections">
                    <div className="section-card">
                        <div className="section-header">
                            <h2>📋 Orders Management</h2>
                            <span className="section-badge">{orders.length} items</span>
                        </div>
                        <Order orders={orders} />
                    </div>
                    
                    <div className="section-card">
                        <div className="section-header">
                            <h2>🚚 Shipments Tracking</h2>
                            <span className="section-badge">{shipments.length} items</span>
                        </div>
                        <Shipment shipments = {newShipment} orders={orders} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;


