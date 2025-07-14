const Web3 = require('web3');
const Origin = require('./src/abis/Origin.json');

async function addInitialProducts() {
    // Connect to Ganache
    const web3 = new Web3('http://localhost:8545');
    
    // Get accounts
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    
    // Get network ID and contract
    const networkId = await web3.eth.net.getId();
    const networkData = Origin.networks[networkId];
    
    if (!networkData) {
        console.log('Contract not deployed to this network');
        return;
    }
    
    const contract = new web3.eth.Contract(Origin.abi, networkData.address);
    
    // Check current product count
    const currentCount = await contract.methods.productCount().call();
    console.log('Current product count:', currentCount);
    
    if (currentCount > 0) {
        console.log('Products already exist. Skipping initialization.');
        return;
    }
    
    // Add sample products
    const products = [
        {
            name: 'Eco-Friendly T-Shirt',
            price: web3.utils.toWei('25.99', 'ether'),
            description: 'Sustainable cotton t-shirt made from organic materials',
            image: 'QmSampleHash1' // Sample IPFS hash
        },
        {
            name: 'Organic Cotton Jeans',
            price: web3.utils.toWei('65.00', 'ether'),
            description: 'Premium organic denim jeans with sustainable production',
            image: 'QmSampleHash2'
        },
        {
            name: 'Bamboo Water Bottle',
            price: web3.utils.toWei('15.99', 'ether'),
            description: 'Eco-friendly bamboo water bottle - plastic free',
            image: 'QmSampleHash3'
        }
    ];
    
    console.log('Adding initial products...');
    
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        try {
            console.log(`Adding product: ${product.name}`);
            await contract.methods.addProduct(
                product.name,
                product.price,
                product.description,
                product.image
            ).send({ from: account, gas: 500000 });
            console.log(`✅ Added: ${product.name}`);
        } catch (error) {
            console.error(`❌ Failed to add ${product.name}:`, error.message);
        }
    }
    
    // Verify products were added
    const finalCount = await contract.methods.productCount().call();
    console.log('Final product count:', finalCount);
    
    // List all products
    console.log('\n📦 Available Products:');
    for (let i = 1; i <= finalCount; i++) {
        const product = await contract.methods.products(i).call();
        console.log(`${i}. ${product.name} - ${web3.utils.fromWei(product.price, 'ether')} ETH`);
    }
}

addInitialProducts()
    .then(() => {
        console.log('\n🎉 Initial products setup complete!');
        process.exit(0);
    })
    .catch(error => {
        console.error('❌ Error:', error);
        process.exit(1);
    });
