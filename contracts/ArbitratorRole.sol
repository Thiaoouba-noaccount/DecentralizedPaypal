pragma solidity ^0.5.0;

import "./Roles.sol";

contract ArbitratorRole {
    using Roles for Roles.Role;

    event ArbitratorAdded(address indexed account);
    event ArbitratorRemoved(address indexed account);

    Roles.Role private _Arbitrators;

    constructor () internal {
        _addArbitrator(msg.sender);
    }

    modifier onlyArbitrator() {
        require(isArbitrator(msg.sender), "ArbitratorRole: caller does not have the Arbitrator role");
        _;
    }

    function isArbitrator(address account) public view returns (bool) {
        return _Arbitrators.has(account);
    }

    function addArbitrator(address account) public onlyArbitrator {
        _addArbitrator(account);
    }

    function renounceArbitrator() public {
        _removeArbitrator(msg.sender);
    }

    function _addArbitrator(address account) internal {
        _Arbitrators.add(account);
        emit ArbitratorAdded(account);
    }

    function _removeArbitrator(address account) internal {
        _Arbitrators.remove(account);
        emit ArbitratorRemoved(account);
    }
}
