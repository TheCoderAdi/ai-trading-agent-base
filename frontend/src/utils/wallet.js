import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers";

const APP_NAME = "AI Trading Agent";
const RPC_URL = "http://127.0.0.1/8545";
const CHAIN_ID = 31337;

const walletSDK = new CoinbaseWalletSDK({
    appName: APP_NAME
});

const ethereum = walletSDK.makeWeb3Provider(RPC_URL, CHAIN_ID);
console.log(ethereum)
const provider = new ethers.BrowserProvider(ethereum);

export const connectWallet = async () => {
    try {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        return { signer, address };
    } catch (error) {
        console.error("Wallet connection failed:", error);
        return null;
    }
};
