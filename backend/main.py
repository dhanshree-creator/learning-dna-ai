from fastapi import FastAPI
from pydantic import BaseModel
import boto3
import json

app = FastAPI()

client = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-east-1"
)

class CodeRequest(BaseModel):
    code: str
    level: str
    context: str

@app.post("/explain")
async def explain_code(request: CodeRequest):

    prompt = f"""
    Explain the following code in a {request.level} level.
    Use {request.context} style explanation.
    Convert explanation into a story format.

    Code:
    {request.code}
    """

    body = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 800,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }
        ]
    }

    response = client.invoke_model(
        modelId="anthropic.claude-3-haiku-20240307-v1:0",
        body=json.dumps(body)
    )

    result = json.loads(response["body"].read())

    return {
        "explanation": result["content"][0]["text"]
    }