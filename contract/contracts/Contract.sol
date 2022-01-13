pragma solidity >=0.4.16 <0.9.0;
pragma experimental ABIEncoderV2;

contract CarContract {
    event CarDataAdded(address senderAddress, string carData);

    function postData(string memory _carData) public {
        emit CarDataAdded(msg.sender, _carData);
    }

    event AnomalyDetected(address senderAddress, string anomaly);

    function postAnomaly(string memory _anomalyData) public {
        emit AnomalyDetected(msg.sender, _anomalyData);
    }
}
