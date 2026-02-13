
# 🏛️ Neo-Modernist ArchitectJobs: Enterprise Setup & Maintenance (v4.0)

Ushbu loyiha professional darajadagi ish qidirish ekotizimi bo'lib, eng zamonaviy AI texnologiyalarini o'z ichiga oladi. Quyida tizimni sozlash va ishlatish bo'yicha to'liq yo'riqnoma berilgan.

---

## 🛠️ Tizim Talablari (Prerequisites)

- **Node.js**: v18.16.0 yoki undan yuqori (LTS tavsiya etiladi)
- **Paket menejeri**: npm v9.0+ yoki yarn
- **AI Access**: Google Cloud Console orqali Gemini va Veo API ruxsatlari
- **Telegram**: Telegram Bot API orqali Bot yaratilgan bo'lishi kerak (@BotFather orqali)

---

## 📦 Loyihani O'rnatish

### 1. Kodni yuklab olish va paketlarni o'rnatish
```bash
# Frontend kutubxonalarini o'rnatish
npm install react-router-dom framer-motion clsx tailwind-merge
npm install @google/genai lucide-react
```

### 2. Backend muhitini tayyorlash (Python)
Loyiha simulyatsiyasi uchun Flask va Aiogram stackidan foydalaniladi:
```bash
# Virtual muhit yaratish
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

# Backend paketlari
pip install flask flask-sqlalchemy flask-login aiogram pydantic-settings requests
```

---

## ⚙️ Konfiguratsiya (.env)

Loyiha ildizida `.env` faylini yarating va quyidagi maxfiy kalitlarni kiriting:

```env
# AI Konfiguratsiyasi
API_KEY="SIZNING_GEMINI_API_KALITINGIZ"

# Telegram Bot Konfiguratsiyasi
BOT_TOKEN="8594163911:AAFs5VJ6Z4aFZk8zluyCPy-_rqwjLAIpY2w"
ADMIN_ID="6237727606"

# Server Sozlamalari
PORT=3000
DEBUG=True
```

---

## 🚀 Ishga Tushirish

### Frontend Developer Mode
```bash
npm run dev
```

### Telegram Botni ishga tushirish (Simulyatsiya)
```bash
python Professional_Bot.py
```

---

## 🛡️ Xavfsizlik va Kengaytirish

1. **API Key xavfsizligi**: `process.env.API_KEY` hech qachon mijoz kodiga (client-side) ochiq holda kirmasligi kerak. Platforma `vite` yoki `webpack` orqali build qilinganda xavfsizlik choralarini ko'radi.
2. **Neo-Modernist Dizayn**: Har qanday yangi komponent `tailwind.config.js` dagi `neo-` ranglaridan foydalanishi shart.
3. **Veo AI**: Video yaratish uchun faqat pullik (paid) API kalitlaridan foydalaning, chunki bepul tierlarda video generatsiyasi bloklangan bo'lishi mumkin.

---

## 🤖 Tizim Funksiyalari

- **Vakansiyalar**: Real vaqt rejimida qidiruv va filtr.
- **Ariza**: Nomzod ariza topshirganda, adminstratorga darhol Telegram xabar yuboriladi.
- **AI Studio**: Posterni yuklab, Gemini orqali uni bir zumda Neo-Modernist uslubga tahrirlash.
- **Video AI**: Statik e'lonlarni professional videoga aylantirish.

---
© 2024 ArchitectJobs Enterprise. Barcha huquqlar himoyalangan.
