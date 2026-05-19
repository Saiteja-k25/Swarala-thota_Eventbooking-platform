# Swarala Thota — Event Booking Platform

A premium, production-grade event ticket booking web application built for **Swarala Thota**, Hyderabad. The platform covers the complete attendee journey — from event discovery and ticket selection to payment and confirmation — wrapped in a visually rich, mobile-first interface.

**Live Site:** [swaralathota.com](https://swaralathota.com) · [swaralathotawebsite.pages.dev](https://swaralathotawebsite.pages.dev)

---

## Overview

Swarala Thota is a multi-page vanilla web application designed around the "musical garden" theme of the event brand. The frontend communicates with a serverless Cloudflare Workers backend via a clean REST API layer, handling authentication, payments, and ticket management without any frontend framework overhead.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom, no framework) |
| Scripting | Vanilla JavaScript (ES6+) |
| Animation | GSAP 3.12 + ScrollTrigger |
| Smooth Scroll | Lenis 1.0.42 |
| Authentication | Firebase (Google OAuth) |
| Payments | Cashfree JS SDK |
| Backend | Cloudflare Workers (serverless) |
| Database | Cloudflare D1 (SQLite) |
| Object Storage | Cloudflare R2 |
| Deployment | Cloudflare Pages (frontend) + Cloudflare Workers (backend) |

---

## Project Structure

```
swarala-thota/
├── assets/
│   └── logo_en.png
├── css/
│   └── style.css
├── js/
│   ├── auth.js          ← Firebase auth + middleware orchestration
│   ├── main.js          ← GSAP animations + Lenis scroll
│   ├── admin.js         ← Admin panel logic
│   ├── booking.js       ← Cashfree payment session flow
│   ├── event.js         ← Single event detail view
│   ├── events.js        ← Event listing + dynamic rendering
│   ├── mytickets.js     ← User ticket dashboard
│   └── profile.js       ← User profile view
├── index.html           ← Landing page
├── events.html          ← Event listing
├── event.html           ← Single event detail
├── booking.html         ← Ticket checkout
├── mytickets.html       ← User ticket dashboard
├── admin.html           ← Admin panel
├── profile.html         ← User profile
├── privacy.html         ← Privacy policy
├── terms.html           ← Terms of use
└── vercel.json          ← Deployment config
```

---

## Features

**User-Facing**
- Interactive landing page with GSAP-driven hero animations and CSS particle effects
- Event listing page with dynamic card rendering from backend API
- Ticket booking flow with Cashfree JS SDK inline checkout
- Google Sign-In via Firebase Authentication
- My Tickets dashboard with QR code generation per booking
- Responsive, mobile-first design across all pages

**Admin**
- Secure admin panel with role-based access (checked server-side)
- View and filter all bookings with pagination
- Create new events with image upload to Cloudflare R2
- QR scanner for validating attendee tickets at the event entrance

**Performance**
- DOMContentLoaded: ~543ms on cold start
- Total page load: ~590ms
- ~85% cache hit rate on repeat visits
- No frontend framework — minimal bundle, fast on mobile networks

---

## Pages

| Page | Description |
|---|---|
| `index.html` | Landing page — hero, about, vibe marquee, footer |
| `events.html` | Lists all events fetched from `/api/events` |
| `event.html` | Single event detail view |
| `booking.html` | Ticket selection + Cashfree checkout |
| `mytickets.html` | Auth-protected user ticket dashboard |
| `admin.html` | Admin booking management + QR verification |
| `profile.html` | User profile page |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of use |

---

## Backend & API

The backend runs entirely on **Cloudflare Workers** with **Cloudflare D1** as the database and **Cloudflare R2** for image storage. The frontend communicates with it via the following endpoints:

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/firebase-config` | GET | Fetch Firebase keys at runtime |
| `/api/users` | POST | Register user; get admin flag |
| `/api/events` | GET | List all events |
| `/api/event?id={id}` | GET | Single event details |
| `/cdn/:key` | GET | Serve event banner from R2 |
| `/api/create-order` | POST | Initiate Cashfree payment session |
| `/api/order-status` | GET | Poll payment confirmation |
| `/api/bookings/user` | GET | Fetch user's approved tickets |
| `/api/upload` | POST | Upload event banner to R2 |
| `/api/admin/bookings` | GET | Admin — view all bookings |
| `/api/verify-qr` | POST | Validate QR at event entrance |

**Security highlights:**
- Firebase keys never hardcoded — fetched at runtime from the backend
- Cashfree webhook verification using HMAC SHA-256 signature
- Admin routes protected server-side via admins table check
- CORS configured globally on the Worker

---

## Design System

| Token | Value |
|---|---|
| Background | `#0D2016` (deep forest green) |
| Primary Accent | `#C8A84B` (gold) |
| Localisation | English + Telugu script (సారల తోట) |

---

## Developer

**Kurapati Sai Teja**
Frontend Development · Middleware Integration · Backend Architecture

- GitHub: [github.com/Saiteja-k25](https://github.com/Saiteja-k25)
- LinkedIn: [linkedin.com/in/kurapati-saiteja-06343724b](https://www.linkedin.com/in/kurapati-saiteja-06343724b/)
- Email: kurapatisaitejas@gmail.com

---

*Swarala Thota · Hyderabad · 2026*
