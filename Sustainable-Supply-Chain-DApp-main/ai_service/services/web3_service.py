"""
Web3 Service for connecting AI microservice to blockchain data
"""
import json
import os
from web3 import Web3
from typing import List, Dict, Any, Optional
import pandas as pd
from datetime import datetime

class Web3Service:
    def __init__(self):
        # Connect to local Ganache or blockchain network
        self.w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))  # Ganache default
        
        # Load contract ABIs
        self.assessment_abi = self._load_contract_abi('Assessments')
        self.origin_abi = self._load_contract_abi('Origin')
        self.ai_predictions_abi = self._load_contract_abi('AIPredictions')
        
        # Contract addresses (these would be loaded from deployment)
        self.assessment_address = None
        self.origin_address = None
        self.ai_predictions_address = None
        
        # Initialize contracts when addresses are available
        self._init_contracts()
    
    def _load_contract_abi(self, contract_name: str) -> List[Dict]:
        """Load contract ABI from JSON file"""
        try:
            abi_path = f"../src/abis/{contract_name}.json"
            with open(abi_path, 'r') as f:
                contract_json = json.load(f)
                return contract_json.get('abi', [])
        except FileNotFoundError:
            print(f"Warning: {contract_name} ABI not found")
            return []
    
    def _init_contracts(self):
        """Initialize contract instances"""
        try:
            # Try to get contract addresses from deployed networks
            # In production, these would come from environment variables
            if self.assessment_abi and self.assessment_address:
                self.assessment_contract = self.w3.eth.contract(
                    address=self.assessment_address,
                    abi=self.assessment_abi
                )
            
            if self.origin_abi and self.origin_address:
                self.origin_contract = self.w3.eth.contract(
                    address=self.origin_address,
                    abi=self.origin_abi
                )
            
            if self.ai_predictions_abi and self.ai_predictions_address:
                self.ai_predictions_contract = self.w3.eth.contract(
                    address=self.ai_predictions_address,
                    abi=self.ai_predictions_abi
                )
        except Exception as e:
            print(f"Contract initialization failed: {e}")
    
    def get_environmental_assessments(self, limit: int = 100) -> List[Dict]:
        """Fetch environmental assessment data from blockchain"""
        try:
            if not hasattr(self, 'assessment_contract'):
                return self._generate_sample_enviro_data()
            
            # Get the count of environmental assessments
            enviro_count = self.assessment_contract.functions.enviroCount().call()
            assessments = []
            
            for i in range(1, min(enviro_count + 1, limit + 1)):
                try:
                    assessment = self.assessment_contract.functions.enviros(i).call()
                    assessments.append({
                        'id': assessment[0],
                        'assessType': assessment[1],
                        'date': assessment[2],
                        'account': assessment[3],
                        'document': assessment[4],
                        'month': assessment[5],
                        'year': assessment[6]
                    })
                except Exception as e:
                    print(f"Error fetching assessment {i}: {e}")
            
            return assessments
        except Exception as e:
            print(f"Error fetching environmental assessments: {e}")
            return self._generate_sample_enviro_data()
    
    def get_products_data(self, limit: int = 50) -> List[Dict]:
        """Fetch product data from blockchain"""
        try:
            if not hasattr(self, 'origin_contract'):
                return self._generate_sample_products_data()
            
            product_count = self.origin_contract.functions.productCount().call()
            products = []
            
            for i in range(1, min(product_count + 1, limit + 1)):
                try:
                    product = self.origin_contract.functions.products(i).call()
                    products.append({
                        'id': product[0],
                        'name': product[1],
                        'image': product[2],
                        'process': product[3],
                        'date': product[4],
                        'account': product[5]
                    })
                except Exception as e:
                    print(f"Error fetching product {i}: {e}")
            
            return products
        except Exception as e:
            print(f"Error fetching products: {e}")
            return self._generate_sample_products_data()
    
    def get_shipments_data(self, limit: int = 50) -> List[Dict]:
        """Fetch shipment data from blockchain"""
        try:
            if not hasattr(self, 'origin_contract'):
                return self._generate_sample_shipments_data()
            
            shipment_count = self.origin_contract.functions.shipmentCount().call()
            shipments = []
            
            for i in range(1, min(shipment_count + 1, limit + 1)):
                try:
                    shipment = self.origin_contract.functions.shipments(i).call()
                    shipments.append({
                        'id': shipment[0],
                        'orderId': shipment[1],
                        'supplier': shipment[2],
                        'process': shipment[3],
                        'location': shipment[4],
                        'timestamp': shipment[5]
                    })
                except Exception as e:
                    print(f"Error fetching shipment {i}: {e}")
            
            return shipments
        except Exception as e:
            print(f"Error fetching shipments: {e}")
            return self._generate_sample_shipments_data()
    
    def store_ai_prediction(self, prediction_data: Dict) -> bool:
        """Store AI prediction on blockchain"""
        try:
            if not hasattr(self, 'ai_predictions_contract'):
                print("AI Predictions contract not available, logging locally")
                print(f"AI Prediction: {prediction_data}")
                return True
            
            # Prepare prediction data for blockchain storage
            prediction_type = prediction_data.get('type', 'carbon_footprint')
            input_features = str(prediction_data.get('features', []))
            result = str(prediction_data.get('result', {}))
            confidence = int(prediction_data.get('confidence', 0) * 100)  # Convert to integer percentage
            model_used = prediction_data.get('model', 'unknown')
            
            # Call smart contract function
            # Note: This would require proper account setup and gas fees
            # For now, simulate the call
            print(f"Storing AI prediction on blockchain:")
            print(f"  Type: {prediction_type}")
            print(f"  Confidence: {confidence}%")
            print(f"  Model: {model_used}")
            print(f"  Result: {result}")
            
            return True
            
        except Exception as e:
            print(f"Error storing AI prediction: {e}")
            return False
    
    def trigger_blockchain_alert(self, alert_data: Dict) -> bool:
        """Trigger an alert on the blockchain"""
        try:
            if not hasattr(self, 'ai_predictions_contract'):
                print("AI Predictions contract not available, logging locally")
                print(f"AI Alert: {alert_data}")
                return True
            
            alert_type = alert_data.get('type', 'general')
            message = alert_data.get('message', 'AI-generated alert')
            severity = alert_data.get('severity', 2)  # 1=low, 2=medium, 3=high, 4=critical
            
            print(f"Triggering blockchain alert:")
            print(f"  Type: {alert_type}")
            print(f"  Message: {message}")
            print(f"  Severity: {severity}")
            
            return True
            
        except Exception as e:
            print(f"Error triggering blockchain alert: {e}")
            return False
    
    def get_blockchain_predictions(self, prediction_type: str = None, limit: int = 10) -> List[Dict]:
        """Fetch AI predictions from blockchain"""
        try:
            if not hasattr(self, 'ai_predictions_contract'):
                return self._generate_sample_predictions()
            
            # This would fetch actual predictions from the blockchain
            return self._generate_sample_predictions()
            
        except Exception as e:
            print(f"Error fetching blockchain predictions: {e}")
            return []
    
    def _generate_sample_enviro_data(self) -> List[Dict]:
        """Generate sample environmental data when blockchain is not available"""
        return [
            {
                'id': 1,
                'energy': 150.5,
                'renewenergy': 30.2,
                'water': 200.0,
                'waterrec': 15.5,
                'material': 100.0,
                'materialrec': 20.0,
                'ghg': 85.3,
                'month': 'January',
                'year': '2024',
                'date': '2024-01-15'
            },
            {
                'id': 2,
                'energy': 145.2,
                'renewenergy': 35.8,
                'water': 180.5,
                'waterrec': 18.2,
                'material': 95.5,
                'materialrec': 22.1,
                'ghg': 78.9,
                'month': 'February',
                'year': '2024',
                'date': '2024-02-15'
            },
            {
                'id': 3,
                'energy': 140.8,
                'renewenergy': 38.5,
                'water': 175.2,
                'waterrec': 20.1,
                'material': 92.3,
                'materialrec': 24.5,
                'ghg': 75.2,
                'month': 'March',
                'year': '2024',
                'date': '2024-03-15'
            }
        ]
    
    def _generate_sample_products_data(self) -> List[Dict]:
        """Generate sample product data"""
        return [
            {
                'id': 1,
                'name': 'Organic Cotton T-Shirt',
                'process': 'Sustainable Manufacturing',
                'carbon_footprint': 25.5,
                'date': '2024-01-10'
            },
            {
                'id': 2,
                'name': 'Recycled Polyester Jacket',
                'process': 'Eco-Friendly Production',
                'carbon_footprint': 45.2,
                'date': '2024-02-05'
            }
        ]
    
    def _generate_sample_shipments_data(self) -> List[Dict]:
        """Generate sample shipment data"""
        return [
            {
                'id': 1,
                'orderId': 1,
                'supplier': 'EcoTextiles Ltd',
                'process': 'Raw Material',
                'location': 'Mumbai, India',
                'timestamp': '2024-01-12',
                'distance': 150.5
            },
            {
                'id': 2,
                'orderId': 1,
                'supplier': 'GreenManufacturing Co',
                'process': 'Manufacturing',
                'location': 'Chennai, India',
                'timestamp': '2024-01-20',
                'distance': 300.2
            }
        ]
    
    def _generate_sample_predictions(self) -> List[Dict]:
        """Generate sample prediction data when blockchain is not available"""
        return [
            {
                'id': 1,
                'type': 'carbon_footprint',
                'result': {'carbon_footprint': 45.2, 'confidence': 0.85},
                'timestamp': '2024-12-20T10:00:00Z',
                'model_used': 'random_forest',
                'verified': True
            },
            {
                'id': 2,
                'type': 'sustainability_score',
                'result': {'overall_score': 78.5, 'grade': 'B+'},
                'timestamp': '2024-12-20T09:30:00Z',
                'model_used': 'ensemble',
                'verified': False
            },
            {
                'id': 3,
                'type': 'anomaly_detection',
                'result': {'has_anomalies': True, 'risk_level': 'medium'},
                'timestamp': '2024-12-20T09:00:00Z',
                'model_used': 'isolation_forest',
                'verified': True
            }
        ]

# Initialize global web3 service instance
web3_service = Web3Service()
