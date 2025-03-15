import React, { useState } from "react";
import { connectWallet } from "../utils/wallet";

const Navbar = () => {
  const [account, setAccount] = useState(null);

  const handleConnect = async () => {
    const wallet = await connectWallet();
    if (wallet) setAccount(wallet.address);
  };

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">AI Trading Agent</h1>
      {account ? (
        <span className="text-sm">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </span>
      ) : (
        <button
          onClick={handleConnect}
          className="bg-blue-600 px-4 py-2 rounded cursor-pointer"
        >
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Navbar;
