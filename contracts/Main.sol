// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

import "./CoursesStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Main is CoursesStorage, Ownable {
    constructor() Ownable(msg.sender) payable {
        createUser("Admin");
    }

    struct User {
        uint id;
        string name;
    }   

    uint public userCount = 0;
    mapping(address => User) public users;
    mapping(uint => address) public userAddresses;

    // unique tên người dùng
    mapping(string => bool) public nameExists;
    error NameAlreadyExists(string name);
    error UserAlreadyExists(address user);
    modifier nameNotExists(string memory name) {
        if (nameExists[name]) {
            revert NameAlreadyExists(name);
        }
        _;
    }

    event UserCreated(uint id, string name);
    event UserChanged(uint id, string name);

    // Tạo một người dùng mới
    function createUser(string memory name) public nameNotExists(name) {
        // require(bytes(users[msg.sender].name).length == 0, "User already exists");
        if (bytes(users[msg.sender].name).length != 0) {
            revert UserAlreadyExists(msg.sender);
        }

        userCount++;
        users[msg.sender] = User(userCount, name);
        userAddresses[userCount] = msg.sender;
        nameExists[name] = true;
        emit UserCreated(userCount, name);
    }
    // Xem thông tin toàn bộ người dùng
    function getAllUsers() public view onlyOwner returns (User[] memory) {
        User[] memory _users = new User[](userCount);
        for (uint i = 0; i < userCount; i++) {
            _users[i] = users[userAddresses[i + 1]];
        }
        return _users;
    }
    // Xem thông tin người dùng
    function getUser() public view returns (User memory) {
        return users[msg.sender];
    }
    // Sửa thông tin người dùng 
    function updateUser(string memory name) nameNotExists(name) public {
        nameExists[name] = true;
        nameExists[users[msg.sender].name] = false;
        users[msg.sender].name = name;
        emit UserChanged(users[msg.sender].id, name);
    }
    // Xóa người dùng
    function deleteUser() public {
        nameExists[users[msg.sender].name] = false;
        delete userAddresses[users[msg.sender].id];
        delete users[msg.sender];
    }
    // Xem thông tin người dùng theo địa chỉ    
    function getUserByAddress(address userAddress) public view returns (User memory) {
        return users[userAddress];
    }
}