import { useState } from "react";
import { getOrders, placeOrder } from "../utils/api";
import toast from "react-hot-toast";

const OrderForm = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await placeOrder(tokenAddress, amount, price);
      if (response) {
        setMessage(`✅ Order placed! TX Hash: ${response.txHash}`);
        toast.success(" Order placed successfully!");
        await getOrders();
      }
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.error || error.message}`);
      toast.error(`${error.response?.data?.error || error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">
        📌 Place a New Order
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="🔗 Token Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          placeholder="📊 Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          placeholder="💲 Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full cursor-pointer p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold transition duration-300 shadow-lg"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "🚀 Place Order"}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-white">{message}</p>}
    </div>
  );
};

export default OrderForm;
