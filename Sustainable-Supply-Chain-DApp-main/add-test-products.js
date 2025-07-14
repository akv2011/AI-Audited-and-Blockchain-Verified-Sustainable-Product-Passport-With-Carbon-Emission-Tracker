const Web3 = require('web3');
const Origin = require('./src/abis/Origin.json');

async function addTestProducts() {
    console.log('🚀 Adding test products to blockchain...\n');
    
    const web3 = new Web3('http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    
    const networkId = await web3.eth.net.getId();
    const contract = new web3.eth.Contract(Origin.abi, Origin.networks[networkId].address);
    
    const testProducts = [
        {
            name: 'Eco-Friendly T-Shirt',
            image: 'QmEcoTShirt123',
            process: '100% organic cotton, sustainably sourced, low-impact dyes',
            date: new Date().toISOString()
        },
        {
            name: 'Organic Cotton Jeans', 
            image: 'QmOrganicJeans456',
            process: 'Organic cotton denim, water-saving production, recycled buttons',
            date: new Date().toISOString()
        },
        {
            name: 'Bamboo Water Bottle',
            image: 'QmBambooBottle789',
            process: 'Sustainable bamboo fiber, BPA-free, biodegradable',
            date: new Date().toISOString()
        },
        {
            name: 'Recycled Plastic Backpack',
            image: 'QmRecycledBackpack012',
            process: 'Made from 20 recycled plastic bottles, durable, lightweight',
            date: new Date().toISOString()
        },
        {
            name: 'Solar-Powered Phone Charger',
            image: 'QmSolarCharger345',
            process: 'Renewable energy device, portable solar panels, eco-friendly',
            date: new Date().toISOString()
        }
    ];

    console.log(`Adding ${testProducts.length} test products...`);
    
    for (let i = 0; i < testProducts.length; i++) {
        const product = testProducts[i];
        try {
            console.log(`📦 Adding: ${product.name}`);
            
            const result = await contract.methods.addProduct(
                product.name,
                product.image, 
                product.process,
                product.date
            ).send({ 
                from: account, 
                gas: 500000,
                gasPrice: '20000000000'
            });
            
            console.log(`   ✅ Success! Transaction: ${result.transactionHash.substring(0, 10)}...`);
            
        } catch (error) {
            console.log(`   ❌ Failed: ${error.message}`);
        }
    }
    
    // Verify products were added
    console.log('\n🔍 Verifying products on blockchain...');
    const finalCount = await contract.methods.productCount().call();
    console.log(`📊 Total products: ${finalCount}`);
    
    console.log('\n📋 Available Products:');
    for (let i = 1; i <= finalCount; i++) {
        const product = await contract.methods.products(i).call();
        console.log(`${i}. ${product.name}`);
        console.log(`   📝 Process: ${product.process}`);
        console.log(`   🖼️  Image: ${product.image}`);
        console.log(`   📅 Date: ${product.date}\n`);
    }
    
    console.log('🎉 Test products setup complete!');
    console.log('💡 Now you can:');
    console.log('   1. Go to http://localhost:3000');
    console.log('   2. Navigate to "Products" to see all products');
    console.log('   3. Create orders using these products');
    console.log('   4. Test the complete supply chain workflow');
}

addTestProducts()
    .then(() => process.exit(0))
    .catch(error => {
        console.error('❌ Error:', error);
        process.exit(1);
    });
