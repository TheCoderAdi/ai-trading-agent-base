import { useEffect, useState } from "react";
import { getOrders, executeTrade } from "../utils/api";
import toast from "react-hot-toast";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  const handleExecute = async (orderId) => {
    setExecuting(orderId);
    try {
      await executeTrade(orderId);
      fetchOrders();
    } catch (error) {
      toast.error(`❌ ${error.response?.data?.error || error.message}`);
    }
    setExecuting(null);
  };

  if (loading) return <p className="text-white">🔄 Loading orders...</p>;

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mt-4">
      <h2 className="text-2xl font-bold mb-4 text-white">📋 Open Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-400">⚠️ No active orders.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li
              key={index}
              className="bg-gray-700 p-4 rounded-md shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-white">
                  🔗 <b>Token:</b> {order[1]}
                </p>
                <p className="text-white">
                  📊 <b>Amount:</b> {order[2]}
                </p>
                <p className="text-white">
                  💲 <b>Price:</b> {order[3]}
                </p>
                <p className="text-white">
                  ✅ <b>Active:</b> {order[4] ? "Yes" : "No"}
                </p>
              </div>
              {order[4] && (
                <button
                  className="bg-green-600 cursor-pointer hover:bg-green-700 px-4 py-2 rounded-lg text-white font-bold transition duration-300 shadow-lg"
                  onClick={() => handleExecute(index)}
                  disabled={executing === index}
                >
                  {executing === index ? "⌛ Executing..." : "🚀 Execute Trade"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersList;
