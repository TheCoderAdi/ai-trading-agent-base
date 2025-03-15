import axios from "axios";
import { connectWallet } from "./wallet";
import TRADING_AGENT_ABI from "./AITradingAgent.json";
import { ethers } from "ethers";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000";
const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const getOrders = async () => {
    try {
        const res = await axios.get(`${API_URL}/orders`);
        return res.data.orders;
    } catch (error) {
        console.error("❌ Failed to fetch orders:", error);
        toast.error(" Error fetching orders!");
        return [];
    }
};

export const placeOrder = async (tokenAddress, amount, price) => {
    try {
        const wallet = await connectWallet();
        if (!wallet) return;

        const contract = new ethers.Contract(CONTRACT_ADDRESS, TRADING_AGENT_ABI.abi, wallet.signer);

        const modifiedPrice = ethers.parseUnits(price, 18);
        const modifiedAmount = ethers.parseUnits(amount, 18);
        const totalValue = (modifiedPrice * modifiedAmount) / ethers.parseUnits("1", 18);

        const tx = await contract.placeOrder(tokenAddress, modifiedPrice, modifiedAmount, true, { value: totalValue });
        await tx.wait();

        return { txHash: tx.hash };
    } catch (error) {
        console.error("❌ Order placement failed:", error);
        toast.error(" Failed to place order!");
    }
};

export const executeTrade = async (orderId) => {
    try {
        const wallet = await connectWallet();
        if (!wallet) return;

        const contract = new ethers.Contract(CONTRACT_ADDRESS, TRADING_AGENT_ABI.abi, wallet.signer);

        const tx = await contract.executeOrder(orderId);
        await tx.wait();

        toast.success(" Trade executed successfully!");
        return { txHash: tx.hash }
    } catch (error) {
        console.error(" Trade already execution failed:", error);
        toast.error(" Trade already executed!");
    }
};

export const getBalance = async () => {
    try {
        const wallet = await connectWallet();
        if (!wallet) return;

        const res = await axios.get(`${API_URL}/balance/${wallet.address}`);
        return res.data.balance;
    } catch (error) {
        console.error("❌ Balance fetch failed:", error);
        toast.error(" Unable to fetch balance!");
    }
};
