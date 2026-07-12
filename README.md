# Pulse Monitor

A modern, self-hosted uptime monitoring platform built with **Next.js**, **Prisma**, **PostgreSQL**, **Redis**, **BullMQ**, and **Socket.IO**.

Pulse Monitor continuously checks your endpoints, evaluates custom success criteria, sends real-time updates, and notifies users via email whenever a monitor changes status.

---

## Features

### Monitor Management

* Create, update, pause, and delete monitors.
* Configure monitoring intervals.
* Support for multiple HTTP methods.
* Track response status, response time, and availability.

### Custom Success Criteria

Define your own conditions to determine whether a monitor is healthy.

Supported criteria:

* HTTP Status Code
* Response Time
* JSON Response Body (using JSON Path)

Supported operators:

* Equals
* Not Equals
* Greater Than
* Greater Than or Equal
* Less Than
* Less Than or Equal

A monitor is considered **UP** only if **all assigned success criteria pass**.

---

### Real-Time Updates

Receive instant updates using Socket.IO.

Real-time events include:

* Monitor status updates
* Notifications

Redis Pub/Sub ensures updates are delivered across multiple application instances.

---

### Background Processing

Powered by BullMQ.

Background jobs include:

* Periodic monitor checks
* Email notifications

Features:

* Retry with exponential backoff
* Idempotent jobs
* Dead Letter Queue (DLQ)
* Scheduled replay of failed email jobs

---

### Email Notifications

Automatically send emails whenever a monitor changes status.

Notifications include:

* Monitor name
* URL
* HTTP method
* Current status
* Timestamp

---

### Dashboard

Monitor your infrastructure with an intuitive dashboard.

Highlights:

* Total monitors
* Active incidents
* Monitor health
* Average response time
* Response time history
* Recent notifications

---

### Caching

Redis is used to cache frequently accessed resources.

Cached resources:

* Monitor details
* Success Criteria
* Notifications (first page)

Automatic cache invalidation keeps data fresh.

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* ShadCN UI
* Recharts

### Backend

* Next.js Route Handlers
* Server Actions
* Prisma ORM
* PostgreSQL

### Real-Time

* Socket.IO
* Redis Pub/Sub

### Background Jobs

* BullMQ
* Redis

### Authentication

* Auth.js (NextAuth)

### Email

* SendGrid

### Validation

* Zod

---

## Architecture

```text
                    Client
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
   Next.js App                 Socket.IO Server
        │                             │
        │                             │
        ▼                             ▼
      Prisma                    Redis Pub/Sub
        │                             │
        ▼                             ▼
   PostgreSQL                Multiple App Servers
        │
        ▼
     BullMQ
        │
 ┌──────┴────────┐
 ▼               ▼
Monitor Worker   Email Worker
                     │
                     ▼
              Email DLQ Worker
```

---

## Project Structure

```text
src
├── app
├── components
├── services
├── repositories
├── workers
├── queues
├── socket
├── lib
├── hooks
├── types
├── utils
└── generated
```

---

## Background Job Flow

```text
Monitor Scheduler
        │
        ▼
 Monitor Queue
        │
        ▼
 Monitor Worker
        │
        ▼
 Perform Health Check
        │
        ▼
 Save Check Result
        │
        ▼
 Update Monitor Status
        │
        ▼
 Publish Socket Event
        │
        ▼
 Queue Email Notification
        │
        ▼
 Email Worker
        │
   Success / Failure
        │
        ▼
 Dead Letter Queue (DLQ)
```

---

## Dead Letter Queue (DLQ)

Failed email jobs are retried automatically.

Flow:

1. Email Queue
2. Retry (3 attempts)
3. Move to DLQ
4. Wait before replay
5. Replay to Email Queue
6. Repeat until maximum DLQ retries are reached

This prevents temporary failures from permanently losing notifications.

---

## Caching Strategy

| Resource                   | Cache |
| -------------------------- | ----- |
| Monitor Details            | ✅     |
| Success Criteria           | ✅     |
| Notifications (First Page) | ✅     |

Redis is used for fast lookups and reduced database load.

---

## Real-Time Events

Current Socket.IO events:

* `MONITOR_UPDATED`
* `NOTIFICATION_CREATED`

Users automatically receive updates without refreshing the page.

---

## Environment Variables

Create a `.env` file with the following variables mentioned in example.env

---

## Running the Project

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Start socket

```bash
npm run socket
```

Start workers

```bash
npm run worker
```

---

## Future Enhancements

* SSL Certificate Monitoring
* Domain Expiry Monitoring
* SMS Notifications

---

## License

This project is developed for learning and portfolio purposes.
