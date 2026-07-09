# Shiv Wealth

A wealth platform prototype for HNI clients (₹5–50 crore): one screen that shows whether your money is working for you — and what to change.

Clickable Next.js demo with three views: **Investor**, **Advisor (IPS)**, and **Relationship Manager**. Mock data only — no bank APIs, no secrets required.

---

## The problem

HNI clients are time-poor and financially literate. Their wealth sits across banks, brokers, mutual funds, and real estate — but nobody shows the full picture.

- Aggregators show holdings, not decisions
- Traditional RMs advise once a year, manually
- Full-service advisors don't scale

**Shiv Wealth** combines a client dashboard + RM tools + a conversational Investment Policy Statement (IPS) so the client sees financial health in real time, and the RM + platform do the work.

---

## What you'll see in the demo

| Route | Who | What happens |
|-------|-----|--------------|
| `/` | Investor | Efficiency score, goal progress, wealth breakdown, RM recommendations |
| `/actions` | Investor | Actions since last visit |
| `/advisor` | Investor + Advisor | Conversational IPS builder + IPS summary |
| `/rm` | Relationship Manager | Client book, recommendations, action bar |

---

## Product principles

1. **One screen clarity** — client knows if money is working for them or against them
2. **Efficiency (backward) + Outcome (forward)** — how well you've managed so far, and probability of hitting life goals
3. **Trust before transactions** — IPS and recommendations feel like a trusted advisor, not a chatbot form
4. **RM scales with the platform** — same intelligence powers client and RM views

---

## Tech stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + Framer Motion + shadcn/ui
- Mock adapters for Account Aggregator, CIBIL, MF Central (`src/lib/adapters/`)
- Seeded demo data in `src/data/`

---

## Run locally

```bash
git clone https://github.com/ankitnakra1986/shiv-wealth.git
cd shiv-wealth
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build check
```

---

## Project structure

```
src/app/           # Investor, advisor, and RM routes
src/components/    # Dashboard, RM, advisor UI
src/data/          # Mock investor, goals, IPS, RM book
src/lib/adapters/  # Stubbed AA / CIBIL / MF Central interfaces
src/types/         # Domain types
```

---

## Why I built this

I wanted a working answer to: *can a wealth product show an HNI client — in one glance — whether they are on track for the goals that matter, and give the RM a system that scales beyond annual reviews?*

This prototype explores that loop: efficiency + outcome scores, goal baskets, conversational IPS, and an RM view that acts on the same data.

---

## Built by

**Ankit Nakra** — Product & AI Leader  
[LinkedIn](https://linkedin.com/in/ankitnakra) · [GitHub](https://github.com/ankitnakra1986)

---

*Prototype / product exploration. Illustrative data. Not a licensed advisory product.*
