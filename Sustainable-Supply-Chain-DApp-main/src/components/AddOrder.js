import React, { useEffect, useState } from 'react';
import Web3 from "web3"
import Origin from "../abis/Origin.json"

const AddOrder = ({addOrder, onAdd}) => {

    useEffect(() => { 
        const loadWeb3AndBlockchainData = async () => {
            try {
                // Load Web3
                let web3;
                if(window.ethereum) {
                    web3 = new Web3(window.ethereum)
                    await window.ethereum.enable()
                    window.web3 = web3
                } else if (window.web3) {
                    web3 = new Web3(window.web3.currentProvider)
                    window.web3 = web3
                } else {
                    // Fallback: Try connecting directly to Ganache
                    try {
                        web3 = new Web3('http://localhost:7545')
                        window.web3 = web3
                        console.log("Connected directly to Ganache")
                    } catch (error) {
                        console.error("Failed to connect to blockchain:", error)
                        // Load dummy products for testing
                        const dummyProducts = [
                            { id: '1', name: 'Eco-Friendly T-Shirt', price: '25.99', description: 'Sustainable cotton t-shirt' },
                            { id: '2', name: 'Organic Cotton Jeans', price: '65.00', description: 'Organic denim jeans' },
                            { id: '3', name: 'Bamboo Water Bottle', price: '15.99', description: 'Sustainable bamboo bottle' }
                        ]
                        setProducts(dummyProducts)
                        window.alert("MetaMask not detected. Using demo products for testing. Please install MetaMask for full functionality.")
                        return
                    }
                }

                // Load Blockchain Data
                const networkId = await web3.eth.net.getId()
                console.log("Network ID:", networkId)
                const networkData = Origin.networks[networkId]
                console.log("Network Data:", networkData)
                
                if (networkData) {
                    //Fetch contract
                    const contract = new web3.eth.Contract(Origin.abi, networkData.address)
                    const productCount = await contract.methods.productCount().call()
                    console.log("Product Count:", productCount)
                    
                    //Load products
                    const loadedProducts = []
                    for (var i = 1; i <= productCount; i++) {
                        const newProduct = await contract.methods.products(i).call()
                        loadedProducts.push(newProduct)
                    }
                    setProducts(loadedProducts)
                    
                    if (loadedProducts.length === 0) {
                        window.alert("No products found on blockchain. Please add some products first using the 'Add Product' feature.")
                    }
                } else { 
                    console.error("Contract deployment issue - Network ID:", networkId);
                    console.error("Available networks:", Object.keys(Origin.networks));
                    window.alert(`❌ Origin contract not found!\n\nDetected Network ID: ${networkId}\nAvailable Networks: ${Object.keys(Origin.networks).join(', ')}\n\n🔧 SOLUTION:\n1. Set MetaMask to Ganache Local network\n2. Chain ID: 5777\n3. RPC: http://127.0.0.1:7545\n\nSee CONTRACT_FIX_GUIDE.md for detailed instructions.`);
                }
            } catch (error) {
                console.error("Error loading blockchain data:", error)
                window.alert("Failed to connect to blockchain. Error: " + error.message + ". Please check your MetaMask connection and try again.")
                
                // Load dummy products as fallback
                const dummyProducts = [
                    { id: '1', name: 'Demo: Eco-Friendly T-Shirt', price: '25.99', description: 'Sustainable cotton t-shirt (Demo Mode)' },
                    { id: '2', name: 'Demo: Organic Cotton Jeans', price: '65.00', description: 'Organic denim jeans (Demo Mode)' }
                ]
                setProducts(dummyProducts)
            }
        }
        loadWeb3AndBlockchainData()
    }, [])

    const [products, setProducts] = useState([])        
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [unit, setUnit] = useState("")
    const [date, setDate] = useState("")
    const [d, setD] = useState("")
    
    useEffect(() => {
        getDate()
    }, [d])

    const getDate = async () => {
        const today = new Date()
        const d = await today.getDate() +'-'+ (today.getMonth()+1) +'-'+ today.getFullYear()
        const t = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const date = await d + " " + t
        setDate(date)
        console.log(date)
    }
    
    const onSubmit = async(e) => {
        e.preventDefault()
        console.log(name)
        console.log(quantity)
        console.log(unit)
        setD("now")
        addOrder({name, quantity, unit, date})
    }

    return (
        <div className='center'>
            <form className="order-form" onSubmit={onSubmit}>
            <div className="form-header">
                <h2>Add Order</h2>
                <button className="btn form-close" style= {{background:"red", fontSize:"14px"}} onClick={onAdd}>X</button>
            </div>
            <div className="product-center-form">                
                <div className="form-inputs">
                    <label className='order-label'>Select Product</label>
                    <select 
                        className="order-product" required
                        value = {name} onChange={(e) => setName(e.target.value)}
                    >
                        <option value=""disabled selected hidden></option>
                        {products.map(product => { 
                        return <option value={product.name}>{product.name} </option>
                        })}
                    </select>
                </div>
                <div className="form-inputs">
                    <label className='order-label'>Product Quantity and Unit</label>
                        <input 
                            type="number"
                            className="quantity" required
                            placeholder="Enter Product Quantity"
                            value = {quantity} onChange={(e) => setQuantity(e.target.value)}
                        />
                        <select 
                            className="unit" required
                            value = {unit} onChange={(e) => setUnit(e.target.value)}                        
                        >
                            <option value=""disabled selected hidden>Select Unit</option>
                            <option value="kg">kg</option>
                            <option value="items">items</option>
                        </select>
                </div>
                <button className="btn order-input-btn" type="submit">
                    Add
                </button>
            </div>
            </form>
        </div>
    )
}

export default AddOrder
