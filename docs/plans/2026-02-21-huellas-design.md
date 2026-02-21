# Huellas Humanitarias - Project Design 

**Date:** 2026-02-21
**Topic:** Core Platform MVP Design

## Overview
Huellas Humanitarias is a solidarity-focused e-commerce platform selling shoes. The core business proposition is a "buy 2, donate 1" model, where for every two pairs of shoes sold, one pair is donated to victims of displacement. 

This document outlines the architecture and MVP scope for the platform.

## Architecture & Tech Stack
**Stack:** Full-Stack Next.js (Option 2)
- **Frontend:** React (within Next.js), Server-Side Rendering (SSR) for optimal SEO and performance. Styling via TailwindCSS.
- **Backend:** Next.js API Routes (Serverless functions/Node.js environment).
- **Database:** MySQL, interacting via an ORM (like Prisma or Sequelize) to ensure type safety and easy migrations.
- **Hosting:** Hostinger Business Web Hosting. The Next.js application will be deployed using Hostinger's Node.js application manager, connecting to the local Hostinger MySQL database.

## Core Features (MVP Scope)

### 1. Public E-Commerce (Shopper Experience)
- **Product Catalog:** List of available shoes with images, descriptions, sizes, and stock.
- **Shopping Cart & Checkout:** Standard cart functionality. 
- *Note on Payments:* The initial MVP will use a simulated checkout process (e.g., "Cash on Delivery" or "Manual Bank Transfer") to abstract out the payment gateway until one is formally selected (like Stripe or PayPal).
- **Impact Counter:** A real-time (or near real-time) counter visible on the home page displaying the total number of shoes donated to date.

### 2. User Accounts & Fidelity
- **Authentication:** Standard email/password login (potentially using NextAuth.js).
- **User Dashboard:** Users can view their order history and current order status.
- **Impact Tracking:** Users can see their individual contribution (e.g., "Thanks to your purchases, 3 pairs of shoes have been donated").
- **Loyalty Program (Basic):** A points or tier system based on purchases to encourage recurring buyers.

### 3. Corporate / Administrative Portal
- **Dashboard:** Overview of sales, revenue, and pending donations.
- **Order Management:** Ability to update order statuses (Processing, Shipped, Delivered).
- **Donation Tracking:** Dedicated section to manage the "Donated Shoes" pool. When sales reach milestones (multiples of 2), the system allocates a donated pair to be tracked and fulfilled.

## Data Models (High-Level)
- **User:** id, email, password_hash, role (CUSTOMER, ADMIN), loyalty_points.
- **Product:** id, name, description, price, stock, image_url.
- **Order:** id, user_id, total_amount, status, payment_method.
- **OrderItem:** id, order_id, product_id, quantity, size.
- **DonationImpact:** id, total_pairs_donated, last_updated.

## Development Constraints & Risks
- **Deployment:** Hostinger's shared Node.js environment can sometimes be strict regarding port bindings and background processes. The Next.js build (`next start`) needs to be properly configured to run on the port assigned by Hostinger's Passenger server.
- **Image Hosting:** Images will initially be stored in the public folder or the database (if lightweight), but a cloud storage solution (like AWS S3 or Cloudinary) is recommended post-MVP to save Hostinger disk space.
