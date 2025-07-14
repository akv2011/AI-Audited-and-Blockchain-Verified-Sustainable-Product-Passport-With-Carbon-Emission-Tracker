pragma solidity >=0.4.22 <0.9.0;

contract AIPredictions {
    
    uint public predictionCount = 0;
    uint public alertCount = 0;
    
    address owner;
    
    mapping(uint => Prediction) public predictions;
    mapping(uint => Alert) public alerts;
    mapping(address => bool) public authorizedAI;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier onlyAuthorizedAI() {
        require(authorizedAI[msg.sender] || msg.sender == owner, "Only authorized AI or owner can perform this action");
        _;
    }
    
    constructor() public {
        owner = msg.sender;
        authorizedAI[msg.sender] = true; // Owner is automatically authorized
    }
    
    struct Prediction {
        uint id;
        string predictionType; // "carbon_footprint", "sustainability_score", "anomaly"
        string inputFeatures; // JSON string of input features
        string result; // JSON string of prediction result
        uint256 timestamp;
        address predictor;
        uint confidence; // Confidence level (0-100)
        string modelUsed;
        bool verified;
    }
    
    struct Alert {
        uint id;
        string alertType; // "high_carbon", "anomaly_detected", "threshold_exceeded"
        string message;
        uint256 timestamp;
        address triggeredBy;
        uint severity; // 1=low, 2=medium, 3=high, 4=critical
        bool resolved;
        string resolutionNotes;
    }
    
    event PredictionStored(
        uint id,
        string predictionType,
        uint confidence,
        string modelUsed,
        address predictor,
        uint256 timestamp
    );
    
    event AlertTriggered(
        uint id,
        string alertType,
        string message,
        uint severity,
        address triggeredBy,
        uint256 timestamp
    );
    
    event AlertResolved(
        uint id,
        string resolutionNotes,
        address resolvedBy,
        uint256 timestamp
    );
    
    function authorizeAI(address aiAddress) public onlyOwner {
        authorizedAI[aiAddress] = true;
    }
    
    function revokeAI(address aiAddress) public onlyOwner {
        authorizedAI[aiAddress] = false;
    }
    
    function storePrediction(
        string memory _predictionType,
        string memory _inputFeatures,
        string memory _result,
        uint _confidence,
        string memory _modelUsed
    ) public onlyAuthorizedAI {
        require(bytes(_predictionType).length > 0, "Prediction type is required");
        require(bytes(_result).length > 0, "Result is required");
        require(_confidence <= 100, "Confidence must be between 0-100");
        
        predictionCount++;
        predictions[predictionCount] = Prediction(
            predictionCount,
            _predictionType,
            _inputFeatures,
            _result,
            block.timestamp,
            msg.sender,
            _confidence,
            _modelUsed,
            false
        );
        
        emit PredictionStored(
            predictionCount,
            _predictionType,
            _confidence,
            _modelUsed,
            msg.sender,
            block.timestamp
        );
    }
    
    function verifyPrediction(uint _predictionId) public onlyOwner {
        require(_predictionId > 0 && _predictionId <= predictionCount, "Invalid prediction ID");
        predictions[_predictionId].verified = true;
    }
    
    function triggerAlert(
        string memory _alertType,
        string memory _message,
        uint _severity
    ) public onlyAuthorizedAI {
        require(bytes(_alertType).length > 0, "Alert type is required");
        require(bytes(_message).length > 0, "Message is required");
        require(_severity >= 1 && _severity <= 4, "Severity must be between 1-4");
        
        alertCount++;
        alerts[alertCount] = Alert(
            alertCount,
            _alertType,
            _message,
            block.timestamp,
            msg.sender,
            _severity,
            false,
            ""
        );
        
        emit AlertTriggered(
            alertCount,
            _alertType,
            _message,
            _severity,
            msg.sender,
            block.timestamp
        );
    }
    
    function resolveAlert(uint _alertId, string memory _resolutionNotes) public onlyOwner {
        require(_alertId > 0 && _alertId <= alertCount, "Invalid alert ID");
        require(!alerts[_alertId].resolved, "Alert already resolved");
        
        alerts[_alertId].resolved = true;
        alerts[_alertId].resolutionNotes = _resolutionNotes;
        
        emit AlertResolved(_alertId, _resolutionNotes, msg.sender, block.timestamp);
    }
    
    function getPredictionsByType(string memory _predictionType) public view returns (uint[] memory) {
        uint[] memory result = new uint[](predictionCount);
        uint counter = 0;
        
        for (uint i = 1; i <= predictionCount; i++) {
            if (keccak256(abi.encodePacked(predictions[i].predictionType)) == keccak256(abi.encodePacked(_predictionType))) {
                result[counter] = i;
                counter++;
            }
        }
        
        // Resize array to actual count
        uint[] memory filteredResult = new uint[](counter);
        for (uint j = 0; j < counter; j++) {
            filteredResult[j] = result[j];
        }
        
        return filteredResult;
    }
    
    function getUnresolvedAlerts() public view returns (uint[] memory) {
        uint[] memory result = new uint[](alertCount);
        uint counter = 0;
        
        for (uint i = 1; i <= alertCount; i++) {
            if (!alerts[i].resolved) {
                result[counter] = i;
                counter++;
            }
        }
        
        // Resize array to actual count
        uint[] memory filteredResult = new uint[](counter);
        for (uint j = 0; j < counter; j++) {
            filteredResult[j] = result[j];
        }
        
        return filteredResult;
    }
    
    function getRecentPredictions(uint _limit) public view returns (uint[] memory) {
        uint limit = _limit;
        if (limit > predictionCount) {
            limit = predictionCount;
        }
        
        uint[] memory result = new uint[](limit);
        uint counter = 0;
        
        // Get most recent predictions
        for (uint i = predictionCount; i > 0 && counter < limit; i--) {
            result[counter] = i;
            counter++;
        }
        
        return result;
    }
    
    function getPredictionMetrics() public view returns (
        uint totalPredictions,
        uint verifiedPredictions,
        uint totalAlerts,
        uint unresolvedAlerts
    ) {
        uint verified = 0;
        uint unresolved = 0;
        
        for (uint i = 1; i <= predictionCount; i++) {
            if (predictions[i].verified) {
                verified++;
            }
        }
        
        for (uint i = 1; i <= alertCount; i++) {
            if (!alerts[i].resolved) {
                unresolved++;
            }
        }
        
        return (predictionCount, verified, alertCount, unresolved);
    }
}
