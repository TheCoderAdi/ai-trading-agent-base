async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with account:", deployer.address);

    const TestToken = await ethers.getContractFactory("TestToken");
    const testToken = await TestToken.deploy();
    await testToken.waitForDeployment();

    console.log("Test Token deployed to:", testToken.target);

    const AITradingAgent = await ethers.getContractFactory("AITradingAgent");
    const tradingAgent = await AITradingAgent.deploy();
    await tradingAgent.waitForDeployment();

    console.log("AI Trading Agent deployed to:", tradingAgent.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
