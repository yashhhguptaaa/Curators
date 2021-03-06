// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Counters.sol";

library SafeMath {
    function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x + y) >= x, "ds-math-add-overflow");
    }

    function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x - y) <= x, "ds-math-sub-underflow");
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }
}

interface IUniswapV2Router {
    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);
}

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
}

contract Donation {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter public _postsId;
    Counters.Counter private _creatorsId;

    address private DAI = 0xDD2C1fB2b9c5D5500b8Da6B817504589e9eBe12f; // polygon mainnet

    address private UniswapV2Router02 =
        0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff; //polygon mainnet

    address private WMATIC = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270; // polygon mainnet

    IUniswapV2Router uniswapRouter = IUniswapV2Router(UniswapV2Router02);

    mapping(address => Creator) public creators;

    struct Post {
        uint256 postid;
        address author;
        string postURI;
    }

    struct Creator {
        address author;
        uint256 balance; // balance here is amount gotten  through our platform
        uint256 supporters;
        bool exists;
    }

    mapping(uint256 => Post) public idToPost;

    event PostCreated(uint256 postid, address author, string postURI);

    event TipReceived(uint256 amount, address creator);

    event callpost(Post p);

    function createPost(string memory postURI) public returns (Post memory) {
        require(bytes(postURI).length > 0, "Post URI exists");
        require(msg.sender != address(0), "Send");

        if (creators[msg.sender].exists == false) {
            creators[msg.sender] = Creator(msg.sender, 0, 0, true);
        }

        _postsId.increment();
        uint256 currentPostId = _postsId.current();

        idToPost[currentPostId] = Post(currentPostId, msg.sender, postURI);

        emit PostCreated(currentPostId, msg.sender, postURI);
        return idToPost[currentPostId];
    }

    function fetchAllPosts() public view returns (Post[] memory) {
        uint256 postCount = _postsId.current();

        Post[] memory posts = new Post[](postCount);

        for (uint256 i = 0; i < postCount; i++) {
            posts[i] = idToPost[i + 1];
        }
        return posts;
    }

    function donate(address _creator) external payable {
        require(msg.value > 0, "Amount should be greater than 0.");
        require(msg.sender.balance >= msg.value, "Not enough balance");
        require(msg.sender != _creator, "Creator can not contribute");

        IERC20(WMATIC).approve(UniswapV2Router02, msg.value);
        uint256 amountOut = getAmountOutMin(msg.value);
        address[] memory path = getPath();

        uniswapRouter.swapETHForExactTokens{value: msg.value}(
            amountOut,
            path,
            _creator,
            block.timestamp.add(20)
        );

        creators[_creator].balance += amountOut;
        creators[_creator].supporters += 1;

        emit TipReceived(amountOut, _creator);
    }

    function getAmountOutMin(uint256 amountIn) internal view returns (uint256) {
        address[] memory path = getPath();
        uint256[] memory amountOutMins = uniswapRouter.getAmountsOut(
            amountIn,
            path
        );
        return amountOutMins[path.length.sub(1)];
    }

    function getPath() internal view returns (address[] memory) {
        address[] memory path;

        path = new address[](2);
        path[0] = WMATIC;
        path[1] = DAI;

        return path;
    }

    receive() external payable {}
}
