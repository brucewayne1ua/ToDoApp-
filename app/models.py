from pydantic import BaseModel

class Task(BaseModel):
    name: str
    description: str

    class Config:
        orm_mode = True
