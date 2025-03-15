#!/usr/bin/env node

import inquirer from "inquirer";
import axios from "axios";

const API_URL = "http://localhost:5000";

async function placeOrder() {
    const answers = await inquirer.prompt([
        { name: "tokenAddress", message: "Enter token address:" },
        {
            name: "amount",
            message: "Enter amount:",
            validate: (input) => !isNaN(input),
        },
        {
            name: "price",
            message: "Enter price:",
            validate: (input) => !isNaN(input),
        },
    ]);

    try {
        const response = await axios.post(`${API_URL}/place-order`, {
            tokenAddress: answers.tokenAddress,
            amount: answers.amount,
            price: answers.price,
        });
        console.log("✅ Order Placed:", response.data);
    } catch (error) {
        console.error(
            "❌ Error placing order:",
            error.response?.data || error.message
        );
    }
}

async function executeTrade() {
    try {
        const response = await axios.get(`${API_URL}/orders`);
        const orders = response.data.orders;

        if (!orders || orders.length === 0) {
            console.log("📭 No open orders found.");
            return;
        }

        const { orderIndex } = await inquirer.prompt([
            {
                type: "list",
                name: "orderIndex",
                message: "Select an order to execute:",
                choices: orders.map((order, index) => {
                    const [, tokenAddress, amount, price, isActive, isFilled] = order;
                    return {
                        name: `#${index + 1} 🏷️ Token: ${tokenAddress} | 📦 ${BigInt(amount) / BigInt(1e18)} | 💰 ${BigInt(price) / BigInt(1e18)} ETH | ✅ Active: ${isActive ? "Yes" : "No"} | 🔄 Filled: ${isFilled ? "Yes" : "No"}`,
                        value: index
                    };
                })
            }
        ]);

        const responseTrade = await axios.post(`${API_URL}/execute-trade`, {
            orderId: orderIndex.toString()
        });

        console.log("✅ Trade Executed:", responseTrade.data);
    } catch (error) {
        console.error("❌ Error executing trade:", error.response?.data || error.message);
    }
}

async function getOrders() {
    try {
        const response = await axios.get(`${API_URL}/orders`);
        const orders = response.data.orders;

        if (!orders || orders.length === 0) {
            console.log("📭 No open orders found.");
        } else {
            console.log("\n📜 Open Orders:\n");
            orders.forEach((order, index) => {
                const [user, tokenAddress, amount, price, isActive, isFilled] = order;

                console.log(
                    `#${index + 1} 🏷️ Token: ${tokenAddress}\n` +
                    `   👤 User: ${user}\n` +
                    `   📦 Amount: ${BigInt(amount) / BigInt(1e18)}\n` +
                    `   💰 Price: ${BigInt(price) / BigInt(1e18)} ETH\n` +
                    `   ✅ Active: ${isActive ? "Yes" : "No"}\n` +
                    `   🔄 Filled: ${isFilled ? "Yes" : "No"}\n`
                );
            });
        }
    } catch (error) {
        console.error(
            "❌ Error fetching orders:",
            error.response?.data || error.message
        );
    }
}

async function checkBalance() {
    try {
        const { address } = await inquirer.prompt([
            { name: "address", message: "Enter your address:" }
        ]);
        const response = await axios.get(`${API_URL}/balance/${address}`);
        console.log("💰 Balance:", response.data.balance);
    } catch (error) {
        console.error("❌ Error fetching balance:", error.response?.data || error.message);
    }
}

async function main() {
    const { action } = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Choose an action:",
            choices: ["Place Order", "View Orders", "Execute Trade", "Check Balance", "Exit"],
        },
    ]);

    if (action === "Place Order") {
        await placeOrder();
    } else if (action === "View Orders") {
        await getOrders();
    } else if (action === "Execute Trade") {
        await executeTrade();
    } else if (action === "Check Balance") {
        await checkBalance();
    } else {
        console.log("👋 Exiting CLI...");
        process.exit(0);
    }

    main();
}

main();
