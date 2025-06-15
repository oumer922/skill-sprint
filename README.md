
# 🛠️ Skill Sprint

> A collaborative software integration and engineering project demonstrating modular AI integration with centralized control using a shared **Model Context Protocol (MCP)** and **Database Middleware**.

---

## 📘 Part 1 – Introduction: Software Integration and Engineering

**Software integration** is the process of combining multiple software modules into one unified system. This includes aligning APIs, managing shared data models, and ensuring seamless communication between frontend, backend, and external services. Engineering this integration requires structured coordination, role division, and well-defined protocols.

**Skill Sprint** is designed as a team project where members build separate frontend applications with unique AI assistant roles (e.g., Quiz Maker, Writing Coach, Language Helper), but all use a centralized AI service and database backend. The result is a robust, scalable architecture that reflects real-world modular system design.

---

## ⚙️ Part 2 – MCP Server with Fully Implemented Functionality (15%)

### ✅ What Is the MCP Server?

The **Model Context Protocol (MCP)** Server is a centralized Node.js API that:
- Accepts prompt requests from all frontend apps.
- Routes them to an AI provider (OpenAI, Cohere, or Gemini).
- Logs the request/response cycle in the shared database.
- Returns a formatted response for display.

### 🔁 Configurable AI Providers
You can switch the provider easily:
- `OpenAI` (default): Works with GPT-3.5/4.
- `Gemini`: Can be used via Google's AI Studio API (limited).
- `Cohere`: Works with `command-r-plus` via `/chat` endpoint.

### 🌐 Endpoint
```bash
POST http://localhost:3001/api/mcp
```

### 🔧 Example Request
```json
{
  "role": "quiz-maker",
  "prompt": "Create a 3-question quiz on World War II"
}
```

### 📦 Example Response
```json
{
  "output": "1. Who was the leader of Nazi Germany?\n2. What year did WWII begin?\n3. Name one Allied Power."
}
```

---

## 🧩 Part 3 – Apps That Use MCP / Middleware DB

Each app is an AI assistant for a specific task. All apps share the same backend server and Prisma-based DB middleware to track all prompt sessions.

| App Name         | Role                        | Functionality                                                                 |
|------------------|-----------------------------|-------------------------------------------------------------------------------|
| `code-reviewer`  | Code Reviewer               | Accepts code snippets and returns reviews/suggestions                        |
| `explainer`      | Concept Explainer           | Explains technical or abstract ideas in simple terms                         |
| `quiz-maker`     | Quiz Generator              | Generates quiz questions based on user-supplied topics                       |
| `writing-coach`  | Writing Coach               | Improves writing quality, style, and clarity                                 |
| `language-helper`| Language Assistant          | Offers grammar corrections, translations, and rewriting                      |
| `skillhub`       | Combined Role Navigator     | Lets user switch between roles from a single page with dynamic routing       |

### 🧱 Shared Middleware Features:
- All apps log to a shared SQLite/PostgreSQL database using Prisma
- Requests and responses are auto-logged with role metadata
- Shared logic lives in `packages/db` and `packages/middleware`

---

## 🧑‍💻 Group Work Breakdown

| Member             | Responsibility                                                |
|--------------------|----------------------------------------------------------------|
| Member A           | MCP Server, AI Integration Layer, Middleware DB (15%)          |
| Member B           | Code Reviewer + Concept Explainer Frontend                     |
| Member C           | Quiz Maker + Writing Coach Frontend                            |
| Member D           | Unified Role UI (`skillhub`) and navigation                    |
| Member E           | GitOps, Prisma Schema, Clerk Auth (optional), Styling          |

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
