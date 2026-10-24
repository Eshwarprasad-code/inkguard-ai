from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class AlternativeOptions(BaseModel):
    conservative: str = Field(..., description="Risk-free, strictly compliant legal wording")
    balanced: str = Field(..., description="High promotional energy grounded in verified facts")
    creative: str = Field(..., description="Social-first phrasing preserving author hook")

class Finding(BaseModel):
    id: str
    category: str
    severity: str  # 'critical' | 'warning' | 'advisory'
    flaggedText: str
    startIndex: int
    endIndex: int
    rule: str
    sourceCitation: str
    explanation: str
    suggestedReplacement: str
    alternatives: Optional[AlternativeOptions] = None
    visualData: Optional[Dict[str, Any]] = None

class ImageMetadata(BaseModel):
    name: Optional[str] = None
    width: Optional[int] = 1200
    height: Optional[int] = 630
    textColor: Optional[str] = '#FFFFFF'
    backgroundColor: Optional[str] = '#FDE047'
    dominantColor: Optional[str] = '#FDE047'
    contrastRatio: Optional[float] = 1.34
    hasLogo: Optional[bool] = True
    logoPaddingPx: Optional[int] = 8

class InspectionRequest(BaseModel):
    text: str
    brandId: Optional[str] = "inkloom"
    imageMeta: Optional[ImageMetadata] = None

class InspectionSummary(BaseModel):
    toneQuality: str
    factIntegrity: str
    visualCompliance: str

class InspectionResponse(BaseModel):
    timestamp: str
    score: int
    status: str
    findingsCount: int
    criticalCount: int
    warningCount: int
    advisoryCount: int
    findings: List[Finding]
    summary: InspectionSummary

class FactItem(BaseModel):
    id: str
    category: str
    claim: str
    source: str
    verifiedDate: str
    details: Optional[str] = None

class SignOffRequest(BaseModel):
    assetId: str = "ASSET-2026-001"
    role: str  # 'creator' | 'manager' | 'legal'
    authorizerName: str
    comments: Optional[str] = None
