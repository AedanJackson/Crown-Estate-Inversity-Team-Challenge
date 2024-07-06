import sqlite3

sql_string = """
CREATE TABLE IF NOT EXISTS Feedback (
    WindFarm TEXT,
    Comment TEXT
)
"""

def connect_db():
    conn = sqlite3.connect("WindFarms.db")
    c = conn.cursor
    with conn:
        c.execute(sql_string)

connect_db()

    
