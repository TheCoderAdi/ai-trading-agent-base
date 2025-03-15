require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

const RPC_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const TRADING_AGENT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const TRADING_AGENT_ABI = require("./AITradingAgent.json").abi;
const tradingAgent = new ethers.Contract(TRADING_AGENT_ADDRESS, TRADING_AGENT_ABI, wallet);

app.get("/orders", async (req, res) => {
    try {
        const orders = await tradingAgent.getOrders();
        const ordersWithStringBigInt = orders.map(order => {
            return order.map(item => {
                return typeof item === 'bigint' ? item.toString() : item;
            });
        });
        res.json({ success: true, orders: ordersWithStringBigInt });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/place-order", async (req, res) => {
    try {
        const { tokenAddress, amount, price } = req.body;

        if (!tokenAddress || !amount || !price) {
            return res.status(400).json({ success: false, error: "Missing parameters!" });
        }

        if (!ethers.isAddress(tokenAddress)) {
            return res.status(400).json({ success: false, error: "Invalid token address!" });
        }

        const modifiedPrice = ethers.parseUnits(price, 18);
        const modifiedAmount = ethers.parseUnits(amount, 18);

        const walletBalance = await provider.getBalance(wallet.address);
        const totalValue = modifiedPrice * modifiedAmount / ethers.parseUnits("1", 18);

        if (walletBalance < totalValue) {
            return res.status(400).json({ success: false, error: "Insufficient ETH balance!" });
        }

        const tx = await tradingAgent.placeOrder(tokenAddress, modifiedPrice, modifiedAmount, true, { value: totalValue });
        await tx.wait();

        res.json({ success: true, message: "Order placed successfully", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/execute-trade", async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return res.status(400).json({ success: false, error: "Order ID is required!" });
        }

        const tx = await tradingAgent.executeOrder(orderId);
        await tx.wait();

        res.json({ success: true, message: "Trade executed", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get("/balance/:address", async (req, res) => {
    try {
        const { address } = req.params;
        const balance = await provider.getBalance(address);
        res.json({ success: true, balance: ethers.formatEther(balance) });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});