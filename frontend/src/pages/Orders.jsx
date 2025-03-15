import OrderForm from "../components/OrderForm";
import OrdersList from "../components/OrdersList";

const Orders = () => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        📊 AI Trading Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrderForm />
        <OrdersList />
      </div>
    </div>
  );
};

export default Orders;
