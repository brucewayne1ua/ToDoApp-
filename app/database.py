import sqlite3

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
