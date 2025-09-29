from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import uvicorn
from datetime import datetime

# Initialize FastAPI app
app = FastAPI(
    title="FastAPI Demo",
    description="A demonstration of FastAPI features",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response validation
class Item(BaseModel):
    id: Optional[int] = None
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    category: str
    created_at: Optional[datetime] = None

class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    category: str

class ItemUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    category: Optional[str] = None

# In-memory storage (for demo purposes)
items_db: List[Item] = []
item_counter = 0

# Dependency function
def get_item_by_id(item_id: int):
    for item in items_db:
        if item.id == item_id:
            return item
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Item with id {item_id} not found"
    )

# API Endpoints

@app.get("/", tags=["Root"])
async def root():
    """Welcome endpoint"""
    return {
        "message": "Welcome to FastAPI Demo!",
        "documentation": "/docs",
        "total_items": len(items_db)
    }

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now(),
        "version": "1.0.0"
    }

@app.get("/items", response_model=List[Item], tags=["Items"])
async def get_all_items(skip: int = 0, limit: int = 100):
    """Get all items with pagination"""
    return items_db[skip:skip + limit]

@app.get("/items/{item_id}", response_model=Item, tags=["Items"])
async def get_item(item: Item = Depends(get_item_by_id)):
    """Get a specific item by ID"""
    return item

@app.post("/items", response_model=Item, status_code=status.HTTP_201_CREATED, tags=["Items"])
async def create_item(item: ItemCreate):
    """Create a new item"""
    global item_counter
    item_counter += 1
    
    new_item = Item(
        id=item_counter,
        name=item.name,
        description=item.description,
        price=item.price,
        category=item.category,
        created_at=datetime.now()
    )
    
    items_db.append(new_item)
    return new_item

@app.put("/items/{item_id}", response_model=Item, tags=["Items"])
async def update_item(item_id: int, item_update: ItemUpdate):
    """Update an existing item"""
    existing_item = get_item_by_id(item_id)
    
    update_data = item_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(existing_item, field, value)
    
    return existing_item

@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Items"])
async def delete_item(item_id: int):
    """Delete an item"""
    item = get_item_by_id(item_id)
    items_db.remove(item)
    return None

@app.get("/items/category/{category}", response_model=List[Item], tags=["Items"])
async def get_items_by_category(category: str):
    """Get items filtered by category"""
    filtered_items = [item for item in items_db if item.category.lower() == category.lower()]
    if not filtered_items:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No items found in category '{category}'"
        )
    return filtered_items

# Error handlers
@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    return HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=str(exc)
    )

def main():
    """Main function to run the FastAPI server"""
    print("Starting FastAPI Demo Server...")
    print("API Documentation available at: http://127.0.0.1:8000/docs")
    print("Alternative docs at: http://127.0.0.1:8000/redoc")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

if __name__ == "__main__":
    main()
