# 🦊 MetaMask Setup Guide for Local Testing

## 🚨 **URGENT: MetaMask Configuration Required**

The error you're experiencing is because MetaMask isn't properly connected to your local blockchain. Follow these steps to fix it:

---

## 📋 **Step-by-Step MetaMask Setup**

### **1. Install MetaMask Extension**
- If not installed: Go to [metamask.io](https://metamask.io) and install the browser extension
- If installed: Make sure it's enabled and unlocked

### **2. Add Local Network to MetaMask**

**Click on MetaMask → Settings → Networks → Add Network**

**Enter these exact details:**
```
Network Name: Ganache Local
New RPC URL: http://127.0.0.1:7545
Chain ID: 1337
Currency Symbol: ETH
Block Explorer URL: (leave empty)
```

**Click "Save"**

### **3. Import Test Account**

Your Ganache blockchain has pre-funded test accounts. Import one:

**Get Private Key:**
1. Check your Ganache output in terminal (look for private keys)
2. Or use this default Ganache private key: `0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d`

**Import to MetaMask:**
1. Click MetaMask → Account Icon → Import Account
2. Select "Private Key"
3. Paste the private key
4. Click "Import"

### **4. Switch to Local Network**
- Click the network dropdown in MetaMask
- Select "Ganache Local" (the network you just added)
- You should see ETH balance (100 ETH from Ganache)

### **5. Refresh the Application**
- Go back to http://localhost:3000
- Refresh the page
- MetaMask should prompt you to connect
- Click "Connect" when prompted

---

## 🔧 **Alternative Quick Fix**

If you don't want to use MetaMask, I can modify the code to work without it:

### **Option A: MetaMask Setup (Recommended)**
Follow the steps above for full blockchain functionality

### **Option B: Mock Mode (Quick Testing)**
I can create a mock mode that bypasses blockchain for quick UI testing

---

## 🧪 **Test the Fix**

After setting up MetaMask:

1. **Go to**: http://localhost:3000
2. **Navigate to**: Products → Add Order
3. **Expected Result**: No more Web3 errors, products should load
4. **If successful**: You'll see a dropdown with available products

---

## 🚨 **Troubleshooting**

### **Error: "Cannot read properties of undefined (reading 'eth')"**
- ✅ **Solution**: Complete MetaMask setup above
- ✅ **Check**: MetaMask is connected to Ganache Local network
- ✅ **Verify**: Account has ETH balance

### **Error: "Origin contract is not deployed"**
- ✅ **Solution**: Wait for contract deployment to complete
- ✅ **Check**: Run `npx truffle migrate --reset` in terminal
- ✅ **Verify**: Look for successful deployment messages

### **Error: "Please install MetaMask"**
- ✅ **Solution**: Install MetaMask browser extension
- ✅ **Alternative**: Use Chrome/Firefox with MetaMask support

---

## ⚡ **Quick Command Summary**

```bash
# 1. Start services (if not running)
cd ai_service && uvicorn main:app --reload --port 8001 &
cd backend && npm start &
npm start &

# 2. Start blockchain (if not running)
ganache-cli --deterministic --accounts 10 --host 0.0.0.0 --port 7545 &

# 3. Deploy contracts
npx truffle migrate --reset

# 4. Setup MetaMask (manual steps above)

# 5. Test application
# Go to http://localhost:3000
```

---

## 🎯 **What Should Work After Setup**

- ✅ **Add Order**: Select products from dropdown
- ✅ **Add Product**: Create new products on blockchain  
- ✅ **View Products**: See all blockchain-stored products
- ✅ **Assessments**: Environmental and social assessments
- ✅ **AI Analytics**: Machine learning predictions
- ✅ **Dashboard**: Real-time sustainability metrics

---

**🚀 Complete the MetaMask setup above, then try creating an order again!**
