# My Shopping List

A full-stack shopping list manager built with React, TypeScript and Redux Toolkit Query. Users can create multiple shopping lists, add items with categories, images and notes, share lists via link and manage their profile - all wrapped in a clean, custom-designed interface.

---

## Table of Content

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Authentication notes](#authentication-notes)

---

## Features

### Authentication
- Email/password login and registration
- JWT-based session handling, persisted to `localStorage`
- Protected routes - unauthenticated users are redirected to login
- Public-only routes - authenticated users can't access login/register

### Shopping Lists
- Create, rename and delete shopping lists
- Search lists by name
- Sort lists by name (A-Z / Z-A) or date created (newest /  oldest)
- Empty-state illustration when no lists exist
- Card-based grid layout

### List Items
- Add, edit and delete items within a list
- Each item supports a name, quantity, category, optional notes and an optional image
- Search items withing lists by name
- Sort items by name, category or date added
- Read-only shared view for lists opened via a shared link
- Copy-to-clipboard "Share" link generation

### Categories
- Per-user custom categories, created inline while adding an item
- Duplicate detection (case-insensitive) reuses an existing category instead of creating a new one
- Categories persist and populate the dropdown for future items

### Profile
- View and edit personal information (name, surname, email, phone)
- Uplaod/change a profile photo directly from the avatar
- Change password with current-password verification
- Toggle notifications
- Log out

---

## Screenshots

### Login

![login page]()

### Registration

![registration page]()

### List Creation

![list creation]()

### Managig Items in a List

~[list management]()

### Adding an items

![adding item]()

### Profile

![profile]()

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React + TypeScript |
| Routing | React Router |
| State management | Redux Toolkit |
| Data fetching / caching | RTK query (`createApi`, fecthBaseQuery) |
| Forms | React Hook Form |
| validation | Zod |
| notifications | React Toastify |
| styling | CSS Modules |
| Backend | `json-server` +   `json-server-auth`|

---

## Project Structure

---

to be continued

---

## Getting Started

### Prerequisites

- Node.js
- npm

### Frontend installations

---

  bash

  npm install
  
  Create a `.ens' file (or configures `src/config.tsx` with your base API base URL:)`

---

API_URL=http://localhost:3001

Run the app

---
  bash
  
  npm run dev

---

> **Deploying to vercel or similar?** Environment variables must be set in your hosting providers's dashboard and the project **redeploy** afterwards


## Authentication notes

- Tokens are short-lived (development default: 1 player). Once expired, API requests will return `401 Unauthorized`; logging out and back in issues a a free token
- On successful profile and avatar updates, the returned user object is written back then into Redux `localStorage` automatically, so UI elements reflecting the current user (avatar, profile header, avatar) update immediately without a page resresh


---
