import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-extrabold">🚀 AI Trading Agent</h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl">
          Leverage AI-powered automation for smarter trading on Base.
        </p>
        <Link to="/orders">
          <button className="mt-6 px-8 py-3 cursor-pointer bg-blue-600 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
            Start Trading
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold">🔥 Why Use AI Trading Agent?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">🤖 AI-Powered Trading</h3>
            <p className="text-gray-300 mt-2">
              Automated execution based on real-time market data.
            </p>
          </div>
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">⚡ Fast & Gas Efficient</h3>
            <p className="text-gray-300 mt-2">
              Optimized for Base network with minimal gas fees.
            </p>
          </div>
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">📊 Smart Order Execution</h3>
            <p className="text-gray-300 mt-2">
              AI-driven trade execution for optimal profit potential.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold">📌 How It Works</h2>
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full md:w-1/3">
              <h3 className="text-xl font-bold">📝 Step 1: Place Order</h3>
              <p className="text-gray-300 mt-2">
                Choose your token, set the amount and price.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full md:w-1/3">
              <h3 className="text-xl font-bold">🔄 Step 2: AI Execution</h3>
              <p className="text-gray-300 mt-2">
                The AI agent monitors and executes when conditions match.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full md:w-1/3">
              <h3 className="text-xl font-bold">💰 Step 3: Profit</h3>
              <p className="text-gray-300 mt-2">
                Orders are executed, and profits are realized seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Start Trading Section */}
      <section className="py-20 px-6 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold">🚀 Get Started Now</h2>
        <p className="text-gray-300 mt-4">
          Ready to automate your trading? Start placing your AI-powered trades
          today.
        </p>
        <Link to="/orders">
          <button className="mt-6 px-8 py-3 cursor-pointer bg-green-600 rounded-lg text-lg hover:bg-green-700 transition duration-300">
            Go to Orders
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
