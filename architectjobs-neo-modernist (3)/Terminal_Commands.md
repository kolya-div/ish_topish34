
# 🏛️ Oltin-Olov Arhitektor: O'rnatish Qo'llanmasi

Ushbu loyiha enterprise-darajasidagi ish portalini yaratish uchun mo'ljallangan.

## 🛠️ Tizim Talablari
- Node.js v18+
- Python 3.10+ (Backend mantiqi uchun)
- Telegram Bot Token (Admin bildirishnomalari uchun)

## 📦 Kutubxonalarni O'rnatish

### 1. Frontend (React + Tailwind)
```bash
# Loyihaga kirish
cd architect-job-portal

# Zaruriy paketlarni o'rnatish
npm install react-router-dom lucide-react clsx tailwind-merge
npm install @google/genai
```

### 2. Backend (Python/Flask Simulyatsiyasi)
```bash
# Virtual muhit yaratish
python -m venv venv
source venv/bin/activate # Windows uchun: venv\Scripts\activate

# Paketlarni o'rnatish
pip install flask flask-sqlalchemy flask-login aiogram pydantic-settings
```

## 🚀 Loyihani Ishga Tushirish

1. **Environment Variables**: `.env` faylini yarating va quyidagilarni kiriting:
   - `API_KEY`: Gemini API kalitingiz
   - `BOT_TOKEN`: 8594163911:AAFs5VJ6Z4aFZk8zluyCPy-_rqwjLAIpY2w
   - `ADMIN_ID`: 6237727606

2. **Frontend Start**:
   ```bash
   npm run dev
   ```

## 🤖 Telegram Bot Sync
Bot har doim yangi ariza kelganda Admin ID'ga HTML formatdagi xabarni yuboradi. Buning uchun `services/apiService.ts` faylidagi `notifyTelegram` funksiyasi mas'uldir.

---
© 2024 Golden-Orange Architect Team.
