# Experiment 2.1: Spring Boot & React Integration SPA
# AVAILABLE AT: https://coderjangra.github.io/FS-Exp-4/

## Aim
To develop the frontend of a RESTful application demonstrating layered architecture and database integration. This React Single Page Application (SPA) acts as the client for a Spring Boot backend, showcasing exception handling, API versioning, and Data Transfer Object (DTO) validation.

## Objective
1. **Create REST Controllers with DTOs and Validation:** The React client simulates posting DTOs and handles `@Valid` validation exceptions returned by the API (e.g. 400 Bad Request).
2. **Integrate JPA/Hibernate with MySQL:** The UI displays and manages entities (Employees) retrieved from the database via REST endpoints.
3. **Implement Exception Handling & API Versioning:** The client provides a toggle to switch between `v1` and `v2` API responses and properly catches/displays `GlobalExceptionHandler` payloads.

## Features
- **Unique Dark Glassmorphism Theme:** Designed from scratch using Material UI, leveraging `backdrop-filter: blur`, neon gradients, and translucent cards.
- **Mock API Service:** Includes a delay-based mock backend (`api.js`) that accurately simulates network latency, JSON mapping discrepancies across API versions, and Spring Boot error payloads.
- **Routing:** Utilizes `react-router-dom` to implement a multi-view SPA containing a Dashboard, an Employee Directory, and API Documentation placeholders.

## Installation
1. Navigate to the project directory: `cd fs4`
2. Install dependencies: `npm install`
3. Start the Vite server: `npm run dev`

## Learning Outcomes
- Demonstrated how to consume versioned REST APIs.
- Mastered handling complex validation error structures from a Spring Boot backend in a React frontend.
- Built a highly aesthetic, responsive dashboard using Material UI layout components.
