# 🛠️ Skill Sprint

> A collaborative software integration and engineering project that brings together multiple AI-powered frontend apps under one unified system using a shared **Model Context Protocol (MCP)** and **Database Middleware**.

---

## 📘 Introduction: Software Integration & Engineering

**Skill Sprint** demonstrates how modern software components—including backend APIs, frontend UIs, authentication, and role-based logic—can be effectively integrated into a modular monorepo architecture. This project is designed to simulate a real-world, team-based software development sprint, where:
- Multiple developers work on isolated apps with unique responsibilities.
- A central AI server (MCP) handles requests from all apps via a shared protocol.
- A common database records all prompt and response data across roles.

---

## ⚙️ Architecture Overview

- **Monorepo:** Powered by `pnpm` workspaces with `apps/` and `packages/` structure.
- **Frontend Apps:** Role-specific UIs built using Next.js, Tailwind CSS, and shadcn/ui.
- **MCP Server:** Handles all AI API communication (OpenAI, Gemini, or Cohere).
- **Middleware & DB:** Shared Prisma-based logic for logging user prompts/responses.
- **Auth:** Integrated with Clerk for user authentication (not yet deployed).

---

## 🧠 MCP Server

The **MCP (Model Context Protocol)** server is responsible for:

- Receiving requests from any frontend app (e.g., quiz-maker, explainer).
- Passing the user's prompt and role metadata to an AI API (OpenAI, Gemini, etc.).
- Returning the generated output in a consistent format.
- Logging each request/response to the shared database.

### ✅ Current API Provider
- **Cohere** 
📍 Server runs at: `http://localhost:3001`

---

## 🧩 Apps That Use MCP

Each app has its own unique role and interface, but all communicate with the same MCP server and DB middleware.

| App Name         | Role                        | Description                                                |
|------------------|-----------------------------|------------------------------------------------------------|
| code-reviewer    | Code Reviewer               | Reviews code snippets and provides improvement suggestions.|
| explainer        | Concept Explainer           | Breaks down technical topics into simple explanations.     |
| quiz-maker       | Quiz Generator              | Creates short quizzes based on provided topics.            |
| writing-coach    | Writing Coach               | Helps improve writing structure and clarity.               |
| language-helper  | Language Helper             | Provides grammar correction, rewriting, and translation.   |
---

## 🧱 Middleware & DB Logging

All apps log their prompts and responses using:
- **Prisma ORM**
- Shared DB schema in `packages/db`
- Logging handled automatically via shared middleware.

---

## 🚀 How to Run the Project

### 1. Install all dependencies
```bash
pnpm install
```

### 2. Run MCP Server
```bash
pnpm --filter mcp-server dev
```

### 3. Run a Frontend App (e.g., quiz-maker)
```bash
pnpm --filter quiz-maker dev
```

### 4. Run Unified App (`skillhub`) for all roles
```bash
pnpm --filter skillhub dev
```

---

## 📜 Example Reference Project

This architecture is inspired by real integrations like:

**🖼️ ImageGen Telegram Bot**  
GitHub: [https://github.com/diagomike/integrate-ai-imagebot](https://github.com/diagomike/integrate-ai-imagebot)  
It uses a single AI backend with Telegram frontend and database logging.

---

## 📄 License

MIT License – For educational and development purposes.
