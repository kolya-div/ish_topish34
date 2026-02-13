
# 🏛️ ArchitectJobs: Enterprise Tizimini Sozlash Qo'llanmasi

Ushbu loyiha professional darajadagi ish qidirish portali bo'lib, veb-interfeys va Telegram bot integratsiyasini o'z ichiga oladi.

## 🛠️ Texnik Talablar
- **Node.js**: v18.0 yoki undan yuqori
- **Brauzer**: Modern (Chrome, Firefox, Safari)
- **API Kalitlari**: Gemini AI va Telegram Bot Token

## 📦 Kutubxonalarni O'rnatish

### 1. Frontend Muhitini Tayyorlash
Loyihaning asosi React va Tailwind CSS platformasida qurilgan. Quyidagi buyruqlar orqali zaruriy paketlarni o'rnating:

```bash
# Frontend paketlari
npm install react-router-dom framer-motion clsx tailwind-merge
npm install @google/genai
```

### 2. Backend va Bot Simulyatsiyasi (Python)
Loyiha Flask va Aiogram 3.x stack'iga asoslangan mantiqni o'z ichiga oladi:

```bash
# Python virtual muhitini yaratish
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

# Backend paketlari
pip install flask flask-sqlalchemy flask-login aiogram pydantic-settings
```

## ⚙️ Konfiguratsiya (.env)
Tizim to'liq ishlashi uchun quyidagi o'zgaruvchilarni sozlash shart:

- `API_KEY`: Google Gemini API (Video va Rasm generatsiyasi uchun)
- `BOT_TOKEN`: 8594163911:AAFs5VJ6Z4aFZk8zluyCPy-_rqwjLAIpY2w
- `ADMIN_ID`: 6237727606

## 🚀 Ishga Tushirish
Frontend qismini mahalliy serverda ishlatish:
```bash
npm run dev
```

## 🤖 Telegram Integratsiyasi
Tizim avtomatik ravishda har bir yangi ariza yoki e'lon haqida Admin ID'ga HTML formatidagi vizual boy xabarlarni yuboradi. Buning uchun `apiService.ts` dagi mantiqdan foydalaniladi.

---
© 2024 ArchitectJobs Senior Engineering Team.
