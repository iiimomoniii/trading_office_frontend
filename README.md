# 🏢 TradingOffice — Frontend

AI-powered trading dashboard built with **Next.js 14** (Pages Router). แสดงราคาตลาด real-time, EMA50 signal, และ AI summary จาก Claude โดยรับข้อมูลผ่าน Server-Sent Events จาก Go backend

---

## Tech Stack

| Category | Library | Version |
|---|---|---|
| Framework | Next.js (Pages Router) | ^14.2 |
| UI Components | Ant Design (antd) | ^5.19 |
| Icons | @ant-design/icons | ^5.3 |
| State Management | Redux Toolkit | ^2.2 |
| SSR Redux | next-redux-wrapper | ^8.1 |
| HTTP Client | Axios | ^1.10 |
| Forms | React Hook Form + Yup | ^7.51 / ^1.4 |
| Styling | Tailwind CSS | ^3.4 |
| Date | Day.js | ^1.11 |
| Number format | react-number-format, numeral | ^5.3 / ^2.0 |
| Utility | lodash, clsx | ^4.17 / ^2.1 |
| E2E Testing | Playwright | ^1.60 |
| Language | TypeScript | ^5.4 |

---

## Project Structure

```
trading_office_frontend/
├── pages/                      # Next.js Pages Router
│   ├── _app.tsx                # Global providers (Redux, Antd)
│   ├── _document.tsx           # HTML document shell
│   ├── index.tsx               # Root → redirect to /login
│   ├── login.tsx               # Login page
│   ├── 404.tsx                 # Not found page
│   └── dashboard/
│       └── index.tsx           # Dashboard page
├── src/
│   ├── hooks/
│   │   └── useSSE.ts           # Server-Sent Events hook
│   ├── libs/
│   │   └── antd.tsx            # Ant Design theme config
│   ├── modules/
│   │   └── store/
│   │       ├── index.ts        # Redux store setup
│   │       └── slices/
│   │           └── dashboardSlice.ts  # Market price & signal state
│   ├── services/
│   │   └── api.ts              # Axios instance
│   ├── styles/
│   │   └── globals.css         # Global CSS + Tailwind directives
│   ├── types/
│   │   └── css.d.ts            # CSS module type declarations
│   ├── ui/
│   │   └── MainLayout.tsx      # App shell layout
│   └── utils/
│       └── index.ts            # Shared utilities
├── e2e/                        # Playwright e2e tests
│   ├── pages/
│   │   └── LoginPage.ts        # Page Object: Login
│   ├── login.spec.ts           # Login e2e tests
│   └── health-check.spec.ts    # Health check e2e tests
├── playwright.config.ts
├── tailwind.config.js
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## Setup

### Prerequisites

- Node.js >= 20
- npm >= 10
- Go backend running at `http://localhost:8080` (for API + SSE)

### 1. Clone & Install

```bash
git clone <repo-url>
cd trading_office_frontend
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

แก้ไขค่าใน `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080` | URL ของ Go backend |

### 3. Run Development Server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

---

## Docker

### Frontend เดี่ยว

```bash
docker build -t trading-office-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8080 trading-office-frontend
```

### Docker Compose (รวม Backend)

```bash
# จาก root ของ monorepo
docker compose up --build
```

Services:
- `frontend` → http://localhost:3000
- `backend` (Go) → http://localhost:8080

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Development server (hot reload) |
| `build` | `npm run build` | Production build |
| `start` | `npm start` | Start production server |
| `lint` | `npm run lint` | ESLint |
| `test:e2e` | `npm run test:e2e` | Playwright headless |
| `test:e2e:ui` | `npm run test:e2e:ui` | Playwright UI mode |
| `test:e2e:headed` | `npm run test:e2e:headed` | Playwright พร้อม browser |
| `test:e2e:report` | `npm run test:e2e:report` | เปิด HTML test report |

---

## Pages

### `/` — Root

**File:** `pages/index.tsx`

Redirect อัตโนมัติไปที่ `/login` ผ่าน `useRouter().replace()` โดยไม่ render UI

---

### `/login` — Login Page

**File:** `pages/login.tsx`

หน้า Sign In สำหรับเข้าใช้งาน Dashboard

**Components ที่ใช้:**
- `antd`: Card, Form, Input, Input.Password, Button
- `@ant-design/icons`: UserOutlined, LockOutlined
- `next/router`: redirect ไป `/dashboard` หลัง login สำเร็จ

**Form Fields:**
| Field | Validation |
|---|---|
| Username | required |
| Password | required |

**Flow:** กรอกข้อมูล → submit → `router.push('/dashboard')`

> หมายเหตุ: Auth logic ยังเป็น TODO — จะ implement ใน auth story ถัดไป

---

### `/dashboard` — Dashboard Page

**File:** `pages/dashboard/index.tsx`

หน้าหลักของระบบ แสดงข้อมูล trading แบบ real-time

**ข้อมูลที่แสดง (planned):**
- PriceWidget — ราคาตลาดล่าสุด (BTCUSDT, ETHUSDT ฯลฯ) รับจาก SSE
- SignalBadge — สัญญาณ LONG / SHORT / WAIT จาก EMA50 engine
- AISummaryCard — บทวิเคราะห์จาก Claude AI

**State:** อ่านจาก Redux store (`dashboardSlice`)
- `prices` — `Record<symbol, MarketPrice>`
- `signals` — `Record<symbol, Signal>`
- `isConnected` — สถานะการเชื่อมต่อ SSE

---

### `/404` — Not Found

**File:** `pages/404.tsx`

หน้า fallback เมื่อ route ไม่ตรงกับ page ใดใน project

---

## State Management

### Redux Store (`src/modules/store/`)

ใช้ **Redux Toolkit** + **next-redux-wrapper** สำหรับ SSR compatibility

**`dashboardSlice`** — จัดการ real-time market data

```typescript
interface DashboardState {
  prices: Record<string, MarketPrice>   // ราคาล่าสุดแต่ละ symbol
  signals: Record<string, Signal>        // signal ล่าสุดแต่ละ symbol
  isConnected: boolean                   // SSE connection status
  lastUpdate: string | null              // ISO timestamp อัปเดตล่าสุด
}
```

**Actions:**

| Action | Payload | Description |
|---|---|---|
| `setPrice` | `MarketPrice` | อัปเดตราคา symbol |
| `setSignal` | `Signal` | อัปเดต signal symbol |
| `setConnected` | `boolean` | เซ็ตสถานะ SSE |

**Types:**

```typescript
interface MarketPrice {
  symbol: string
  price: string
  timestamp: string
}

interface Signal {
  symbol: string
  signal: 'LONG' | 'SHORT' | 'WAIT'
  confidence: number
  reason: string
  created_at: string
}
```

---

## Real-time Data (SSE)

**Hook:** `src/hooks/useSSE.ts`

รับข้อมูล real-time จาก `GET /events` ผ่าน **Server-Sent Events**

**Event format จาก backend:**
```json
{ "type": "price", "payload": { "symbol": "BTCUSDT", "price": "65000.00", "timestamp": "..." } }
{ "type": "signal", "payload": { "symbol": "BTCUSDT", "signal": "LONG", "confidence": 0.85, ... } }
```

**Behavior:**
- Auto-reconnect เมื่อ connection หลุด
- Dispatch `setPrice` / `setSignal` ไปยัง Redux store
- Dispatch `setConnected(false)` เมื่อ error

---

## API Client

**File:** `src/services/api.ts`

Axios instance ที่ใช้ `NEXT_PUBLIC_API_URL` เป็น baseURL

```typescript
// ตัวอย่างการใช้งาน
import api from '@/services/api'

const { data } = await api.get('/markets/latest')
const { data } = await api.get('/ai/summary/BTCUSDT')
```

---

## E2E Testing

ใช้ **Playwright** ตาม **Page Object Model** pattern

### Config (`playwright.config.ts`)

| Setting | Value |
|---|---|
| testDir | `./e2e` |
| baseURL | `http://localhost:3000` |
| Browsers | Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5) |
| webServer | `npm run dev` (auto-start) |
| CI retries | 2 |
| Traces | on first retry |
| Screenshots | on failure only |

### Test Files

| File | Description |
|---|---|
| `e2e/login.spec.ts` | Login form display, validation, redirect |
| `e2e/health-check.spec.ts` | App load, BE `/live` endpoint, page load time |

### Page Objects

| File | Locators |
|---|---|
| `e2e/pages/LoginPage.ts` | `usernameInput`, `passwordInput`, `signInButton` |

### Run Tests

```bash
# Headless (ทุก browser)
npm run test:e2e

# UI mode (เห็น browser)
npm run test:e2e:ui

# ดู HTML report
npm run test:e2e:report
```

---

## Path Aliases

กำหนดใน `tsconfig.json`:

| Alias | Path |
|---|---|
| `@/*` | `./src/*` |
| `@pages/*` | `./pages/*` |

---

## Code Style

- **ESLint** — `eslint-config-next` + `typescript-eslint`
- **Prettier** — code formatting
- Plugins: `simple-import-sort`, `unused-imports`, `tailwindcss`

```bash
npm run lint
```

---

## Architecture Overview

```
Browser
  │
  ├─ Next.js Pages Router (SSR/CSR)
  │     ├─ pages/login.tsx
  │     └─ pages/dashboard/index.tsx
  │
  ├─ Redux Store (dashboardSlice)
  │     └─ prices / signals / isConnected
  │
  ├─ useSSE hook ──────────────────────► GET /events (SSE stream)
  │                                          │
  └─ Axios (api.ts) ──────────────────► REST API (Go backend :8080)
                                             ├─ GET /markets/latest
                                             ├─ GET /signals/latest
                                             └─ GET /ai/summary/:symbol
```

---

## Related

- **Backend (Go):** `../backend/` — Fiber + PostgreSQL + Binance WebSocket + Claude API
- **Jira Project:** [TDO Board](https://iiimomoniii.atlassian.net/jira/software/projects/TDO/boards/2/timeline)
