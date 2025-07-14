import React, { useState, useEffect } from 'react'
import Web3 from "web3"
import Origin from "../../abis/Origin.json"
import AddProduct from '../AddProduct'
import Sidebar from '../Sidebar'
import Product from '../Product'
import "../App.css"
import Button from "../FormButton"

const Products = () => {

    useEffect(() => { 
        const loadWeb3 = async () => {
            if(window.ethereum) {
              window.web3 = new Web3(window.ethereum)
              await window.ethereum.enable()
            } if (window.web3) {
              window.web3 = new Web3(window.web3.currentProvider)
            } else {
              window.alert("Please use Metamask!")
            }
        }
        loadWeb3()}, [])

    useEffect(() => { 
            const loadBlockchainData = async () => {
                try {
                    const web3 = window.web3
                    if (!web3) {
                        window.alert("Web3 not loaded. Please refresh the page.")
                        setLoading(false)
                        return
                    }
                    
                    //Load account
                    const accounts = await web3.eth.getAccounts()
                    if (accounts.length === 0) {
                        window.alert("No accounts found. Please connect your wallet.")
                        setLoading(false)
                        return
                    }
                    setAccount(accounts[0])
                    console.log("Connected account:", accounts[0])
                    
                    const networkId = await web3.eth.net.getId()
                    console.log("Network ID:", networkId)
                    const networkData = Origin.networks[networkId]
                    console.log("Network data:", networkData)
                    
                    if (networkData) {
                        //Fetch contract
                        const contract = new web3.eth.Contract(Origin.abi, networkData.address)
                        setContract(contract)
                        console.log("Contract loaded:", contract)
                        
                        const productCount = await contract.methods.productCount().call()
                        console.log("Product count:", productCount)
                        
                        //Load products
                        for (var i = 1; i <= productCount; i++) {
                            const newProduct = await contract.methods.products(i).call()
                            setProducts(products =>([...products, newProduct]))
                        }
                        setLoading(false)
                    }
                    else { 
                        window.alert("Origin contract is not deployed to the detected network")
                        setLoading(false)
                    }
                } catch (error) {
                    console.error("Error loading blockchain data:", error)
                    window.alert("Failed to connect to blockchain. Please check your connection.")
                    setLoading(false)
                }
            }
            loadBlockchainData()}, [])
    
    const [products, setProducts] = useState([])
    const [contract, setContract] = useState(null)
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [account, setAccount] = useState("")
    const [loading, setLoading] = useState(true)        

    //Add Product
    const addProduct = ({name, image, process, date}) => {
        if (!contract) {
            window.alert("Contract not loaded. Please check your network connection.")
            return
        }
        if (!account) {
            window.alert("No account detected. Please connect your wallet.")
            return
        }
        
        contract.methods.addProduct(name, image, process, date).send( {from: account} )
        .once('receipt', (receipt) => {
            console.log("Product added successfully:", receipt)
            window.location.reload()
        })
        .on('error', (error) => {
            console.error("Error adding product:", error)
            window.alert("Failed to add product. Please try again.")
        })
    }

    const onView = (hash) => {
        const url = `https://ipfs.infura.io/ipfs/${hash}`
        window.open(url)
    } 

    return (
        <>
        <div>
            <Sidebar />
            <div className="main-container">
            <header className="product-header"> 
                <h2>Products</h2> 
                {!loading && contract && (
                    <Button className="btn" 
                    onClick={() => setShowAddProduct(!showAddProduct)}
                    color={showAddProduct ? "#f2f2f2": "#3eb049"}
                    text={showAddProduct ? "X": <>{"Add Product"}</>}
                    />
                )}
            </header>
            {loading && <div>Loading blockchain data...</div>}
            {!loading && !contract && <div>Failed to connect to blockchain. Please check your network connection.</div>}
            {!loading && contract && showAddProduct && (
                <AddProduct onAdd={() => setShowAddProduct(!showAddProduct)} 
                addProduct={addProduct}/>
            )}
            {!loading && <Product onView={onView} products={products} />}
            </div>
        </div>
        </>
    )
}

export default Products
