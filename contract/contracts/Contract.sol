pragma solidity >=0.4.16 <0.9.0;
pragma experimental ABIEncoderV2;

contract CarContract {
    enum CarType {
        Passenger, // possibly extend to Sedan, Coupe, etc.
        Lorry
    }

    struct UFixed {
        uint number; // solidity does not support floats
        int dotPosition;
    }

    struct Position {
        UFixed latitude;
        UFixed longitude;
    }

    struct Wind {
        UFixed speed;
        UFixed degree;
    }

    struct Weather {
        string units; // metric / imperial
        UFixed temperature;
        uint humidity;
        Wind wind;
    }

    struct CarData {
        string carBrand;
        CarType carType;
        Weather weather;
        Position position;
        int speed;
        uint timestamp; // now is current time in unix epoch
    }

    event CarDataAdded(address senderAddress, string carData);

    function postData(string memory _carData) public {
        emit CarDataAdded(msg.sender, _carData);
    }
}