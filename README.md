# Event Flow

A CRM and client planning portal built for event DJs.

It helps DJs manage leads, bookings, client communication, planning details, contracts, invoices, and event workflows in one place.

---

## Why This App Exists

Most event DJs manage their business across too many disconnected tools, including email, spreadsheets, contracts, notes, and planning documents.

Event Flow is built to bring those workflows into one system so the booking process is easier to manage from inquiry to event completion.

The goal is to create a practical app that supports how event DJs actually run their business.

---

## What the App Covers

This app is designed to support the core workflow of an event DJ business, including:

• lead intake and inquiry tracking  
• pipeline management  
• client records  
• event planning details  
• contracts and invoices  
• client portal workflows  
• business automation

---

## Lead Intake Architecture

This app ingests inquiries from external providers rather than replacing website forms.

Example intake flow:

Website form  
↓  
External provider  
↓  
Email notification to DJ  
↓  
Webhook or API call to CRM  
↓  
Lead record created

Email notifications remain active so inquiries are never lost.

## Data Validation

Lead ingestion uses Zod to validate incoming data before writing to the database.

The API currently requires the core inquiry fields used in the Formspree intake flow:
- name
- email
- phone
- event date
- venue
- message

The `source` field is constrained to known intake values and may be omitted, in which case the backend applies a fallback.

## Intake Adapters

Event Flow uses an adapter layer to normalize incoming lead data from external providers like Formspree into a consistent internal schema.

This ensures the system remains stable and scalable as new intake sources are added.

## Tech Stack

Next.js  
TypeScript  
PostgreSQL  
Prisma  
Vitest  
React Testing Library  
Playwright

---

## Roadmap

Week 1  
CRM foundation and lead ingestion

Week 2  
Lead pipeline and authentication

Week 3  
Contracts and invoices

Week 4  
Client planning portal

Week 5  
Automation and production readiness


## Current Progress

Completed so far:

- Next.js project foundation
- PostgreSQL database setup with Neon
- Prisma schema and migrations
- Lead model
- Lead creation API route
- Admin leads page that reads from the database