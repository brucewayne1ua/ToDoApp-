from fastapi import APIRouter, HTTPException
from models import Task
from database import get_connection, create_table
import uuid

router = APIRouter()

create_table()

@router.get("/api/tasks")
def get_tasks():
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM tasks")
    tasks = [{"id": row[0], "name": row[1], "description": row[2]} for row in c.fetchall()]
    conn.close()
    return tasks

@router.post("/api/tasks")
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

@router.delete("/api/tasks/{task_id}")
def delete_task(task_id: str):
    conn = get_connection()
    c = conn.cursor()
    c.execute("DELETE FROM tasks WHERE id=?", (task_id,))
    conn.commit()
    conn.close()
    return {"message": "Task deleted successfully"}
