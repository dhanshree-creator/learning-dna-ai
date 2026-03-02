from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import boto3
import json

# ---------------------------
# FastAPI app setup
# ---------------------------
app = FastAPI()

# Allow frontend (localhost:5173) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Bedrock client setup
# ---------------------------
client = boto3.client(
    "bedrock-runtime",
    region_name="us-east-1"
)

# ---------------------------
# Request model
# ---------------------------
class CodeRequest(BaseModel):
    code: str
    level: str
    context: str

# ---------------------------
# POST endpoint
# ---------------------------
@app.post("/explain")
async def explain_code(request: CodeRequest):

    prompt = f"""
Explain the following code in a {request.level} level.
Use {request.context} style explanation.
Convert explanation into a story format.

Code:
{request.code}
"""

    try:
        response = client.converse(
            modelId="amazon.nova-lite-v1:0",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"text": prompt}
                    ]
                }
            ],
            inferenceConfig={
                "maxTokens": 800,
                "temperature": 0.7
            }
        )

        return {
            "explanation": response["output"]["message"]["content"][0]["text"]
        }

    except Exception as e:
        print("Bedrock error:", e)
        return {"error": str(e)}