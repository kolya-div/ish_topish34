
# 🤖 ARCHITECTJOBS PROFESSIONAL BOT (v4.5)
# Aiogram 3.x + SQLite Integration

import asyncio
import sqlite3
import logging
from datetime import datetime
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import Message

# Config
BOT_TOKEN = "8594163911:AAFs5VJ6Z4aFZk8zluyCPy-_rqwjLAIpY2w"
ADMIN_ID = 6237727606

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# SQLite Database Setup
def init_db():
    conn = sqlite3.connect('architect_jobs.db')
    cursor = conn.cursor()
    # Vakansiyalar jadvali
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS jobs (
            id TEXT PRIMARY KEY,
            title TEXT,
            company TEXT,
            salary TEXT,
            posted_at TEXT
        )
    ''')
    # Arizalar jadvali
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_title TEXT,
            applicant_name TEXT,
            applicant_telegram TEXT,
            applied_at TEXT
        )
    ''')
    conn.commit()
    conn.close()

def save_application_to_db(job_title, name, telegram):
    conn = sqlite3.connect('architect_jobs.db')
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO applications (job_title, applicant_name, applicant_telegram, applied_at) VALUES (?, ?, ?, ?)',
        (job_title, name, telegram, datetime.now().isoformat())
    )
    conn.commit()
    conn.close()

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def start_handler(message: Message):
    """Admin Dashboard welcome."""
    if message.from_user.id == ADMIN_ID:
        await message.answer(
            "🏛️ <b>ArchitectJobs Admin Dashboard (SQLite Mode)</b>\n\n"
            "Tizim muvaffaqiyatli ishga tushdi. Barcha arizalar bazaga saqlanmoqda.",
            parse_mode="HTML"
        )
    else:
        await message.answer("Sizda ushbu botdan foydalanish huquqi yo'q.")

@dp.message(Command("stats"))
async def stats_handler(message: Message):
    """Baza statistikasini ko'rish."""
    if message.from_user.id != ADMIN_ID: return
    
    conn = sqlite3.connect('architect_jobs.db')
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM applications')
    count = cursor.fetchone()[0]
    conn.close()
    
    await message.answer(f"📊 <b>Baza statistikasi:</b>\nJami arizalar: {count}", parse_mode="HTML")

async def main():
    init_db()
    logger.info("SQLite DB Engine initialized.")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
