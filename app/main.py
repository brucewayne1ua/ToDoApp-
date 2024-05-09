import uuid
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel):
    name: str
    description: str

    class Config:
        orm_mode = True

def get_connection():
    conn = sqlite3.connect('tasks.db')
    return conn

def create_table():
    conn = get_connection()
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS tasks
                 (id TEXT PRIMARY KEY, name TEXT, description TEXT)''')
    conn.commit()
    conn.close()

create_table()

@app.get("/")
async def main():
    return FileResponse("public/index.html")

@app.get("/api/tasks")
def get_tasks():
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM tasks")
    tasks = [{"id": row[0], "name": row[1], "description": row[2]} for row in c.fetchall()]
    conn.close()
    return tasks

@app.post("/api/tasks")
def create_task(task: Task):
    print("Данные от фронтенда:", task.name, task.description)
    if not task.name or not task.description:
        raise HTTPException(status_code=400, detail="Name and description fields are required")
    task_id = str(uuid.uuid4())  # Генерируем новый ID для задачи
    conn = get_connection()
    c = conn.cursor()
    c.execute("INSERT INTO tasks VALUES (?, ?, ?)", (task_id, task.name, task.description))
    conn.commit()
    conn.close()
    return {"id": task_id, "name": task.name, "description": task.description}

@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: str):
    conn = get_connection()
    c = conn.cursor()
    c.execute("DELETE FROM tasks WHERE id=?", (task_id,))
    conn.commit()
    conn.close()
    return {"message": "Task deleted successfully"}
