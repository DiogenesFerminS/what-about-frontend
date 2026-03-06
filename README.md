# WHAT-ABOUT Client

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

Frontend client for **WHAT-ABOUT**, a modern social network built with **Next.js 16 (App Router)**. This project focuses on performance, security, and a seamless user experience using Server Actions and Optimistic UI.

| | |
| :---: | :---: |
|![PERFORMANCE](https://res.cloudinary.com/dqclkzb8r/image/upload/v1770773547/ligthhouse_otxbxs.png)| ![PROFILE](https://res.cloudinary.com/dqclkzb8r/image/upload/v1770776955/profile_d6hrtf.png) |

> 🔗 **Backend Repository:** [https://github.com/DiogenesFerminS/what-about-backend]

## INDICE 
1. [ENVS](#envs)
2. [Steps To Start The Project](#steps-to-start-the-project)
3. [Technologies Libreries](#technologies-libreries)
4. [Technical Specifications](#technical-specifications)
    - [Http-Client](#http-client)
    - [Authentication](#authentication)
    - [Form Handling](#form-handling)
    - [Style](#styles)
    - [Directory Structure](#directory-structure)
5. [Other Images](#other-images)


## ENVS

Create a `.env.local` file in the root directory

| Variable | Type | Description |
| :--- | --- | :--- |
| NEXT_PUBLIC_BACKEND_URL | String | Backend url |

## STEPS TO START THE PROJECT

1. Clone the repository
2. Install dependencies ```npm install```
3. Create the .env.local file and assign the environment variables
4. Run the backend
5. Start the development server ``` npm run dev ```

## TECHNOLOGIES LIBRERIES

* Next v16.1.6
* React v19.2.4
* React-hook-form
* React-intersection-observer
* Rich-text-area
* Zod
* TailwindCss
* Shadcn / Radix-UI

## TECHNICAL SPECIFICATIONS

### HTTP CLIENT
This project implements a Server-Side First approach with zero client-side fetching. To ensure maximum security and performance, all data interactions are handled via Server Actions. I adopted a Service Pattern to organize requests by feature, located in /src/services/. Additionally, I built a custom HTTP Client (housed in the same directory) to abstract logic, reduce boilerplate, and simplify the codebase.

### AUTHENTICATION
Authentication utilizes HTTP-Only JWTs, ensuring tokens are accessible solely on the server side. Upon login, the system issues a short-lived auth-token (15 min) and a long-lived refresh-token (7 days), both stored in cookies. To maintain the session, we employ a dual strategy involving a Custom HTTP Client and a Proxy Middleware. The HTTP Client handles reactive refreshing: if a request fails with a 401 Unauthorized error, it automatically calls the refresh endpoint to update the cookies. Conversely, the Proxy Middleware proactively guards protected routes; if it detects a missing auth-token but finds a valid refresh-token, it refreshes the session and updates the cookies before granting access.

### FORM HANDLING
For form management, I implemented React Hook Form paired with the Zod resolver. I chose Zod to maintain schema homogeneity with the backend, ensuring a unified validation strategy across the entire stack. Visually, I utilized Shadcn UI form components. Additionally, for specific text inputs, I integrated a Rich-text-area library to enable dynamic tagging, where typing # followed by a word automatically converts it into a tag.

| | |
| :---: | :---: |
| ![Login](https://res.cloudinary.com/dqclkzb8r/image/upload/v1770773547/register_zxwgyn.png) | ![Register](https://res.cloudinary.com/dqclkzb8r/image/upload/v1770773547/register_zxwgyn.png) |

### STYLES
For styling, I utilized Tailwind CSS v4, Tailwind Typography, and shadcn/ui. Additionally, I implemented custom animations, which I hand-coded directly in the globals.css file

### DIRECTORY STRUCTURE
* actions → Contains all Server Actions, organized by feature.
* app → Houses the application routes, layouts, and global styles (globals.css).
* components → UI components. These are grouped by the specific page they are used in, except for:
* common: General-purpose shared components.
* ui: Shadcn UI primitive components.
* context → React Context definitions and Global Providers.
* helpers → Shared utility functions and common helpers.
* hooks → Custom React hooks and Shadcn-specific hooks.
* interfaces → TypeScript interfaces, grouped by feature.
* lib → Shadcn UI configuration and utility functions.
* schemas → Zod schemas used for form validation and their inferred DTOs for type safety.
* services → API service layer handling endpoint requests, organized by feature.
* proxy → Middleware logic for protecting private routes.

## OTHER IMAGES

| | |
| :---: | :---: |
| ![REPOST-FEED](https://res.cloudinary.com/dqclkzb8r/image/upload/v1770776956/repost-post_ugonbt.png) | ![REPOST-FORM](https://res.cloudinary.com/dqclkzb8r/image/upload/v1770776955/repost_exuyl5.png) |
