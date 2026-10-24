import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List
from datetime import datetime
import hashlib

from backend.models import (
    InspectionRequest, 
    InspectionResponse, 
    FactItem, 
    SignOffRequest
)
from backend.services.verifier import verify_content, BRAND_KNOWLEDGE

app = FastAPI(
    title="InkGuard AI — Brand Governance & Verification API",
    description="High-performance pre-flight content verification engine for tone, factual claim grounding, visual identity, and WCAG accessibility.",
    version="2.0.0"
)

# Enable CORS for local dev and cloud deployments (Vercel, Netlify, localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory audit log for stakeholder sign-offs
APPROVAL_AUDIT_LOG = []

@app.get("/health", tags=["Health"])
def health_check() -> Dict[str, str]:
    """Liveness probe verifying that the InkGuard AI backend is operational."""
    return {
        "status": "healthy",
        "service": "InkGuard AI Core Engine",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "version": "2.0.0"
    }

@app.post("/api/v1/inspect", response_model=InspectionResponse, tags=["Inspection"])
def inspect_content(payload: InspectionRequest) -> InspectionResponse:
    """
    Main pre-flight inspection endpoint.
    Audits text copy & multimodal image metadata against living brand guidelines.
    """
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="Content text cannot be empty.")

    results = verify_content(
        text=payload.text,
        image_meta=payload.imageMeta,
        brand_id=payload.brandId or "inkloom"
    )
    return results

@app.get("/api/v1/guidelines", tags=["Knowledge Hub"])
def get_guidelines(brand_id: str = "inkloom") -> Dict[str, Any]:
    """Retrieves active living brand guidelines and corporate fact base."""
    if brand_id not in BRAND_KNOWLEDGE:
        brand_id = "inkloom"
    return BRAND_KNOWLEDGE[brand_id]

@app.post("/api/v1/facts", tags=["Knowledge Hub"])
def add_approved_fact(fact: FactItem, brand_id: str = "inkloom") -> Dict[str, Any]:
    """Registers a new verified corporate fact into the Grounding Repository."""
    if brand_id not in BRAND_KNOWLEDGE:
        brand_id = "inkloom"

    BRAND_KNOWLEDGE[brand_id]["approvedFacts"].insert(0, fact.model_dump())
    return {
        "message": "Fact successfully registered in Single Source of Truth",
        "fact": fact
    }

@app.post("/api/v1/sign-off", tags=["Governance"])
def submit_sign_off(request: SignOffRequest) -> Dict[str, Any]:
    """Records multi-stakeholder sign-off and generates cryptographic certificate."""
    cert_hash = hashlib.sha256(
        f"{request.assetId}-{request.role}-{request.authorizerName}-{datetime.utcnow()}".encode()
    ).hexdigest()

    event = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "assetId": request.assetId,
        "role": request.role,
        "authorizer": request.authorizerName,
        "comments": request.comments or "Approved without reservation",
        "verificationHash": cert_hash
    }
    APPROVAL_AUDIT_LOG.insert(0, event)

    return {
        "status": "AUTHORIZED",
        "certificateRef": f"CERT-INKGUARD-2026-{cert_hash[:8].upper()}",
        "verificationHash": cert_hash,
        "event": event
    }

@app.get("/api/v1/ambiguity-radar", tags=["Analytics"])
def get_ambiguity_radar() -> Dict[str, Any]:
    """Returns analytics on guidelines with highest creator disputes."""
    return {
        "meanComplianceScore": 91.2,
        "totalAssetsGoverned": 1248,
        "turnaroundMinutes": 18,
        "ambiguityAlerts": [
            {
                "ruleId": "Rule §2.3: Bold yet humble tone",
                "disputeRate": "46%",
                "status": "High Ambiguity",
                "recommendation": "Add positive/negative reference examples to guideline manual"
            },
            {
                "ruleId": "Rule §4.2: Permitted Superlatives",
                "disputeRate": "32%",
                "status": "Moderate Ambiguity",
                "recommendation": "Codify approved whitelist of verified, data-backed claims"
            }
        ]
    }

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
