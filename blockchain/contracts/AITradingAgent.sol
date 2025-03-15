// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AITradingAgent is ReentrancyGuard, Ownable {
    struct LimitOrder {
        address user;
        address token;
        uint256 price;
        uint256 amount;
        bool isBuyOrder;
        bool executed;
    }

    LimitOrder[] public orders;
    mapping(uint256 => address) public orderOwners;

    event OrderPlaced(
        uint256 orderId,
        address indexed user,
        address token,
        uint256 price,
        uint256 amount,
        bool isBuyOrder
    );
    event OrderExecuted(uint256 orderId, address indexed user);

    constructor() Ownable(msg.sender) {}

    function placeOrder(
        address _token,
        uint256 _price,
        uint256 _amount,
        bool _isBuyOrder
    ) external payable nonReentrant {
        require(_amount > 0, "Amount must be greater than zero");
        if (_isBuyOrder) {
            require(
                msg.value == (_price * _amount) / 1e18,
                "Incorrect ETH sent for buy order"
            );
        } else {
            require(
                IERC20(_token).transferFrom(msg.sender, address(this), _amount),
                "Token transfer failed"
            );
        }

        uint256 orderId = orders.length;
        orders.push(
            LimitOrder(msg.sender, _token, _price, _amount, _isBuyOrder, false)
        );
        orderOwners[orderId] = msg.sender;

        emit OrderPlaced(
            orderId,
            msg.sender,
            _token,
            _price,
            _amount,
            _isBuyOrder
        );
    }

    function executeOrder(uint256 _orderId) external onlyOwner {
        LimitOrder storage order = orders[_orderId];
        require(!order.executed, "Order already executed");

        if (order.isBuyOrder) {
            payable(order.user).transfer(order.amount);
        } else {
            IERC20(order.token).transfer(order.user, order.amount);
        }

        order.executed = true;
        emit OrderExecuted(_orderId, order.user);
    }

    function getOrders() external view returns (LimitOrder[] memory) {
        return orders;
    }
}
