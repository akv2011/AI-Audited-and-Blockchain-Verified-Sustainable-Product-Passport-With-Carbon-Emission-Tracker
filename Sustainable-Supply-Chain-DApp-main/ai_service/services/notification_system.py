"""
Real-time notification system for sustainability alerts
"""
import asyncio
import json
from typing import Dict, List, Callable
from datetime import datetime
from dataclasses import dataclass, asdict

@dataclass
class Alert:
    id: str
    type: str
    message: str
    severity: str  # 'low', 'medium', 'high', 'critical'
    timestamp: str
    source: str
    data: Dict
    resolved: bool = False

class NotificationSystem:
    def __init__(self):
        self.alerts = []
        self.subscribers = []
        self.alert_thresholds = {
            'carbon_footprint': {
                'high': 100,
                'critical': 200
            },
            'energy_consumption': {
                'high': 200,
                'critical': 300
            },
            'renewable_energy': {
                'low': 0.3,  # Below 30% renewable energy
                'critical': 0.1  # Below 10% renewable energy
            }
        }
    
    def add_subscriber(self, callback: Callable):
        """Add a callback function to receive notifications"""
        self.subscribers.append(callback)
    
    def remove_subscriber(self, callback: Callable):
        """Remove a callback function"""
        if callback in self.subscribers:
            self.subscribers.remove(callback)
    
    def notify_subscribers(self, alert: Alert):
        """Notify all subscribers about a new alert"""
        for callback in self.subscribers:
            try:
                callback(alert)
            except Exception as e:
                print(f"Error notifying subscriber: {e}")
    
    def check_carbon_footprint(self, carbon_value: float, context: Dict = None) -> Alert:
        """Check if carbon footprint exceeds thresholds"""
        thresholds = self.alert_thresholds['carbon_footprint']
        
        if carbon_value >= thresholds['critical']:
            severity = 'critical'
            message = f"CRITICAL: Carbon footprint of {carbon_value:.2f} kg CO₂e exceeds critical threshold ({thresholds['critical']} kg CO₂e)"
        elif carbon_value >= thresholds['high']:
            severity = 'high'
            message = f"HIGH: Carbon footprint of {carbon_value:.2f} kg CO₂e exceeds warning threshold ({thresholds['high']} kg CO₂e)"
        else:
            return None
        
        alert = Alert(
            id=f"carbon_{datetime.now().timestamp()}",
            type="carbon_footprint_threshold",
            message=message,
            severity=severity,
            timestamp=datetime.now().isoformat(),
            source="ai_prediction",
            data={
                "carbon_footprint": carbon_value,
                "threshold_exceeded": thresholds[severity],
                "context": context or {}
            }
        )
        
        self.alerts.append(alert)
        self.notify_subscribers(alert)
        return alert
    
    def check_energy_efficiency(self, energy_consumption: float, renewable_percentage: float, context: Dict = None) -> List[Alert]:
        """Check energy efficiency and renewable energy usage"""
        alerts = []
        
        # Check energy consumption
        energy_thresholds = self.alert_thresholds['energy_consumption']
        if energy_consumption >= energy_thresholds['critical']:
            alert = Alert(
                id=f"energy_{datetime.now().timestamp()}",
                type="energy_consumption_high",
                message=f"CRITICAL: Energy consumption of {energy_consumption:.2f} kWh is extremely high",
                severity='critical',
                timestamp=datetime.now().isoformat(),
                source="ai_prediction",
                data={
                    "energy_consumption": energy_consumption,
                    "threshold": energy_thresholds['critical'],
                    "context": context or {}
                }
            )
            alerts.append(alert)
            self.alerts.append(alert)
            self.notify_subscribers(alert)
        
        # Check renewable energy percentage
        renewable_thresholds = self.alert_thresholds['renewable_energy']
        if renewable_percentage <= renewable_thresholds['critical']:
            alert = Alert(
                id=f"renewable_{datetime.now().timestamp()}",
                type="renewable_energy_low",
                message=f"CRITICAL: Renewable energy usage at {renewable_percentage*100:.1f}% is critically low",
                severity='critical',
                timestamp=datetime.now().isoformat(),
                source="ai_prediction",
                data={
                    "renewable_percentage": renewable_percentage,
                    "threshold": renewable_thresholds['critical'],
                    "context": context or {}
                }
            )
            alerts.append(alert)
            self.alerts.append(alert)
            self.notify_subscribers(alert)
        elif renewable_percentage <= renewable_thresholds['low']:
            alert = Alert(
                id=f"renewable_{datetime.now().timestamp()}",
                type="renewable_energy_low",
                message=f"WARNING: Renewable energy usage at {renewable_percentage*100:.1f}% is below target",
                severity='medium',
                timestamp=datetime.now().isoformat(),
                source="ai_prediction",
                data={
                    "renewable_percentage": renewable_percentage,
                    "threshold": renewable_thresholds['low'],
                    "context": context or {}
                }
            )
            alerts.append(alert)
            self.alerts.append(alert)
            self.notify_subscribers(alert)
        
        return alerts
    
    def check_anomaly_detection(self, anomaly_result: Dict, context: Dict = None) -> Alert:
        """Check for sustainability anomalies"""
        if not anomaly_result.get('has_anomalies', False):
            return None
        
        risk_level = anomaly_result.get('risk_level', 'medium')
        anomalies = anomaly_result.get('anomalies', [])
        
        severity_map = {
            'low': 'medium',
            'medium': 'high',
            'high': 'critical'
        }
        
        alert = Alert(
            id=f"anomaly_{datetime.now().timestamp()}",
            type="sustainability_anomaly",
            message=f"Sustainability anomaly detected with {risk_level} risk level: {', '.join(anomalies)}",
            severity=severity_map.get(risk_level, 'medium'),
            timestamp=datetime.now().isoformat(),
            source="ai_anomaly_detection",
            data={
                "anomalies": anomalies,
                "risk_level": risk_level,
                "context": context or {}
            }
        )
        
        self.alerts.append(alert)
        self.notify_subscribers(alert)
        return alert
    
    def check_sustainability_score(self, score: float, grade: str, context: Dict = None) -> Alert:
        """Check if sustainability score is concerning"""
        if score < 40:
            severity = 'critical'
            message = f"CRITICAL: Sustainability score of {score:.1f} ({grade}) requires immediate attention"
        elif score < 60:
            severity = 'high'
            message = f"WARNING: Sustainability score of {score:.1f} ({grade}) is below acceptable levels"
        else:
            return None
        
        alert = Alert(
            id=f"score_{datetime.now().timestamp()}",
            type="sustainability_score_low",
            message=message,
            severity=severity,
            timestamp=datetime.now().isoformat(),
            source="ai_scoring",
            data={
                "score": score,
                "grade": grade,
                "context": context or {}
            }
        )
        
        self.alerts.append(alert)
        self.notify_subscribers(alert)
        return alert
    
    def get_active_alerts(self, severity_filter: str = None) -> List[Dict]:
        """Get all active (unresolved) alerts"""
        active_alerts = [alert for alert in self.alerts if not alert.resolved]
        
        if severity_filter:
            active_alerts = [alert for alert in active_alerts if alert.severity == severity_filter]
        
        return [asdict(alert) for alert in active_alerts]
    
    def resolve_alert(self, alert_id: str, resolution_notes: str = "") -> bool:
        """Mark an alert as resolved"""
        for alert in self.alerts:
            if alert.id == alert_id:
                alert.resolved = True
                alert.data['resolution_notes'] = resolution_notes
                alert.data['resolved_at'] = datetime.now().isoformat()
                return True
        return False
    
    def update_thresholds(self, new_thresholds: Dict):
        """Update alert thresholds"""
        self.alert_thresholds.update(new_thresholds)
    
    def get_alert_summary(self) -> Dict:
        """Get summary of alerts by severity"""
        summary = {
            'total': len(self.alerts),
            'active': len([a for a in self.alerts if not a.resolved]),
            'by_severity': {
                'critical': 0,
                'high': 0,
                'medium': 0,
                'low': 0
            },
            'by_type': {}
        }
        
        for alert in self.alerts:
            if not alert.resolved:
                summary['by_severity'][alert.severity] += 1
                
                if alert.type not in summary['by_type']:
                    summary['by_type'][alert.type] = 0
                summary['by_type'][alert.type] += 1
        
        return summary

# Global notification system instance
notification_system = NotificationSystem()

# Console logger for demonstrations
def console_alert_logger(alert: Alert):
    """Simple console logger for alerts"""
    severity_emoji = {
        'low': '💡',
        'medium': '⚠️', 
        'high': '🚨',
        'critical': '🔴'
    }
    
    print(f"\n{severity_emoji.get(alert.severity, '📢')} SUSTAINABILITY ALERT")
    print(f"Severity: {alert.severity.upper()}")
    print(f"Type: {alert.type}")
    print(f"Message: {alert.message}")
    print(f"Time: {alert.timestamp}")
    print(f"Source: {alert.source}")
    print("-" * 50)

# Add console logger as default subscriber
notification_system.add_subscriber(console_alert_logger)
