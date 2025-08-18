from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Dummy data to be replaced with a database call
# This structure must match what your frontend expects
materials_data = {
    "subjects": [
        {
            "id": "ict",
            "name": "ICT",
            "fullName": "Information and Communication Technology",
            "icon": "Monitor",
            "chapters": [
                {"id": 1, "title": "Chapter 1", "driveLinks": [], "videoLinks": []},
                {"id": 2, "title": "Chapter 2", "driveLinks": [], "videoLinks": []},
                {"id": 3, "title": "Chapter 3", "driveLinks": [], "videoLinks": []},
                {"id": 4, "title": "Chapter 4", "driveLinks": [], "videoLinks": []},
                {"id": 5, "title": "Chapter 5", "driveLinks": [], "videoLinks": []},
                {"id": 6, "title": "Chapter 6", "driveLinks": [], "videoLinks": []}
            ]
        },
        {
            "id": "chemistry-1st",
            "name": "Chemistry 1st Paper",
            "fullName": "Chemistry First Paper",
            "icon": "Atom",
            "chapters": [
                {"id": 1, "title": "Chapter 1", "driveLinks": [], "videoLinks": []},
                {"id": 2, "title": "Chapter 2", "driveLinks": [], "videoLinks": []},
                {"id": 3, "title": "Chapter 3", "driveLinks": [], "videoLinks": []},
                {"id": 4, "title": "Chapter 4", "driveLinks": [], "videoLinks": []},
                {"id": 5, "title": "Chapter 5", "driveLinks": [], "videoLinks": []}
            ]
        },
        {
            "id": "chemistry-2nd",
            "name": "Chemistry 2nd Paper",
            "fullName": "Chemistry Second Paper",
            "icon": "FlaskConical",
            "chapters": [
                {"id": 1, "title": "Chapter 1", "driveLinks": [], "videoLinks": []},
                {"id": 2, "title": "Chapter 2", "driveLinks": [
                    {"name": "Class note(annoted)", "url": "https://www.dropbox.com/scl/fi/s2zvgfkepj74ksfmox4sg/organic-chemistry_annotated.pdf?rlkey=ahov0z578i04oecudg0yyc7f9&st=e1ydhdsg&dl=0"}
                ], "videoLinks": [{"name": "Organic chemistry one shot MCQ", "url": "https://youtu.be/cfLiNLdZ2dg?si=XBuWhrnTNLCRsiFt"}]},
                {"id": 3, "title": "Chapter 3", "driveLinks": [], "videoLinks": []},
                {"id": 4, "title": "Chapter 4", "driveLinks": [], "videoLinks": []}
            ]
        }
    ]
}

@api_router.get("/materials")
async def get_materials():
    return materials_data

# Include the router in the main app
app.include_router(api_router)

@app.get("/")
async def home():
    return {"message": "Welcome to the MathError API!"}

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
