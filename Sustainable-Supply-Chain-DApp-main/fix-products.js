const Web3 = require('web3');
const Origin = require('./src/abis/Origin.json');

async function addProductsWithCorrectOwner() {
    console.log('🔧 Fixing owner issue and adding products...\n');
    
    const web3 = new Web3('http://localhost:7545');
    const accounts = await web3.eth.getAccounts();
    
    // Use the first account (which should be the deployer)
    const account = accounts[0];
    console.log('Using account:', account);
    
    const networkId = await web3.eth.net.getId();
    const contract = new web3.eth.Contract(Origin.abi, Origin.networks[networkId].address);
    
    // Check current owner
    const currentOwner = '0x3421668462324bFB48EA07D0B12243091CD09759'; // From contract
    console.log('Contract owner:', currentOwner);
    console.log('Current account:', account);
    
    if (currentOwner.toLowerCase() !== account.toLowerCase()) {
        console.log('❌ Account mismatch. Using UI method instead...');
        console.log('\n📋 SOLUTION: Use the Web UI to add products:');
        console.log('1. Go to http://localhost:3000');
        console.log('2. Click "Products" in sidebar');
        console.log('3. Click "Add Product" button');
        console.log('4. Fill the form with product details');
        console.log('5. Submit each product\n');
        
        console.log('🎯 Test Products to Add:');
        const testProducts = [
            'Eco-Friendly T-Shirt - Organic cotton, sustainable production',
            'Organic Cotton Jeans - Water-saving denim, recycled components', 
            'Bamboo Water Bottle - BPA-free, biodegradable material',
            'Recycled Plastic Backpack - Made from 20 plastic bottles',
            'Solar-Powered Charger - Renewable energy device'
        ];
        
        testProducts.forEach((product, i) => {
            console.log(`${i + 1}. ${product}`);
        });
        
        return;
    }
    
    // If accounts match, proceed with adding products
    const testProducts = [
        {
            name: 'Eco-Friendly T-Shirt',
            image: 'QmEcoTShirt123',
            process: '100% organic cotton, sustainably sourced',
            date: new Date().toISOString()
        },
        // ... other products
    ];

    for (const product of testProducts) {
        try {
            await contract.methods.addProduct(
                product.name,
                product.image,
                product.process,
                product.date
            ).send({ from: account, gas: 500000 });
            console.log(`✅ Added: ${product.name}`);
        } catch (error) {
            console.log(`❌ Failed: ${product.name} - ${error.message}`);
        }
    }
}

addProductsWithCorrectOwner().catch(console.error);
