### **📌 AI-Powered Autonomous Trading Agent on Base**

---

## **🚀 Project Overview**

This project is an **AI-Powered Autonomous Trading Agent** built on **Base (Coinbase L2)**. It integrates **Coinbase Smart Wallet SDK** for seamless blockchain transactions, allowing users to **place, execute, and manage trades** efficiently.

---

## **📑 Features**

✅ **AI-Driven Trading** – Automated trade execution based on market data  
✅ **Coinbase Smart Wallet** – Secure and user-friendly wallet integration  
✅ **On-Chain Order Execution** – Trades are settled via smart contracts on Base  
✅ **React Frontend + CLI** – Users can interact through a web UI or terminal  
✅ **Express Backend** – Manages trading logic and smart contract interactions

---

## **🛠 Tech Stack**

- **Blockchain:** Solidity, Base (L2)
- **Smart Wallet:** Coinbase Smart Wallet SDK
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **CLI Interaction:** Inquirer.js

---

## **📦 Installation & Setup**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/thecoderadi/ai-trading-agent-base.git
cd ai-trading-agent-base
```

### **2️⃣ Install Dependencies**

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
cd ../cli && npm install
```

### **3️⃣ Start the Backend**

```bash
cd backend
node index.js
```

### **4️⃣ Start the Frontend**

```bash
cd frontend
npm start
```

### **5️⃣ Start the CLI**

```bash
cd cli
node cli.js
```

---

## **🛠 Smart Contract Deployment (Hardhat)**

### **1️⃣ Compile & Deploy**

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

---

## **⚡ Usage**

### **🖥️ Frontend**

- **Connect Wallet** using **Coinbase Smart Wallet**
- **Place Order**: Select a token, amount, and price
- **Execute Trade**: Automatically or manually execute a placed order
- **View Balance**: Check available funds in the wallet

### **🖥️ CLI Usage**

Run the CLI tool:

```bash
cd cli
node cli.js
```
