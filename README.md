# Trading Office Frontend

Next.js + Ant Design + TailwindCSS + Redux Toolkit

## Project Structure

```
trading_office_frontend/
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── 404.tsx
│   └── dashboard/
│       └── index.tsx
├── src/
│   ├── features/
│   │   ├── Dashboard/
│   │   │   └── index.tsx
│   │   └── Login/
│   │       └── index.tsx
│   ├── hooks/
│   │   └── useSSE.ts
│   ├── libs/
│   │   └── antd.tsx
│   ├── modules/
│   │   └── store/
│   │       ├── index.ts
│   │       └── slices/
│   │           └── dashboardSlice.ts
│   ├── services/
│   │   └── api.ts
│   ├── styles/
│   │   └── globals.css
│   ├── ui/
│   │   └── MainLayout.tsx
│   └── utils/
│       └── index.ts
├── .env
├── .env.example
├── Dockerfile
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
└── tsconfig.json
```

## Install

```bash
npm install
```

## Run

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## Docker

```bash
docker build -t trading-office-frontend .
docker run -p 3000:3000 trading-office-frontend
```

## Environment Variables

| ตัวแปร | Default | คำอธิบาย |
|---|---|---|
| NEXT_PUBLIC_API_URL | http://localhost:8080 | Backend API URL |

## Pages

| Path | Description |
|---|---|
| / | Redirect → /dashboard |
| /dashboard | Main dashboard — price, signal, AI summary |
| /login | Login page |
| /agent-room | AI Agent Room (Phase 6) |
| /signals | Signal history (Phase 4) |
| /rules | Rule Manager CRUD (Phase 6) |
| /404 | Not found page |

## Feature Structure

แต่ละ feature ใน `src/features/` จะมีโครงสร้างดังนี้:

```
features/
└── FeatureName/
    ├── index.tsx          ← main component
    ├── components/        ← sub-components
    ├── hooks/             ← feature-specific hooks
    └── types.ts           ← feature types
```

## Tech Stack

| Package | Version | ใช้ทำอะไร |
|---|---|---|
| Next.js | 14 | Framework (Pages Router) |
| Ant Design | 5 | UI Components |
| TailwindCSS | 3 | Utility CSS |
| Redux Toolkit | 2 | State Management |
| Axios | 1 | HTTP Client |
| React Hook Form | 7 | Form handling |
| Yup | 1 | Form validation |
| Dayjs | 1 | Date formatting |

## เพิ่ม Feature ใหม่

```
1. สร้าง src/features/{FeatureName}/index.tsx
2. สร้าง pages/{feature-name}/index.tsx → import feature
3. เพิ่ม menu ใน src/ui/MainLayout.tsx
4. เพิ่ม slice ใน src/modules/store/slices/ (ถ้าต้องการ state)
5. เพิ่ม repository ใน src/repositories/ สำหรับ API calls
```
