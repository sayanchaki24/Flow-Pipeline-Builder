# Flow Pipeline Builder

A modular, full-stack visual pipeline builder designed for creating and validating node-based directed graphs and AI workflows. Built with **React**, **React Flow**, **Zustand**, and **FastAPI**.

![React](https://img.shields.io/badge/Frontend-React%20%7C%20React%20Flow-61DAFB?logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python-009688?logo=fastapi&logoColor=white)
![Zustand](https://img.shields.io/badge/State-Zustand-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📌 Overview

Flow Pipeline Builder lets users build directed workflow graphs by dragging and dropping computational nodes onto an interactive canvas, linking them with edges, configuring variables, and verifying pipeline topology. 

Once constructed, the pipeline can be submitted to a FastAPI backend that calculates graph metrics and runs cycle detection to determine if the pipeline is a valid **Directed Acyclic Graph (DAG)**.

---

## ✨ Features

- **Interactive Workflow Canvas**: Powered by React Flow with snap-to-grid, pan/zoom controls, interactive mini-map, and custom connection lines.
- **Modular Node Abstraction (`BaseNode`)**: Unified architecture for all nodes ensuring consistent styling, theme adaptation, delete actions, and dynamic handle alignment.
- **Smart Text Node (`TextNode`)**:
  - Automatically resizes textarea height and node width dynamically as the user types.
  - Automatically detects JavaScript variables wrapped in `{{ variableName }}` syntax and dynamically spawns corresponding input handles on the left.
- **Diverse Built-in Node Types**:
  - **Core Nodes**: `Input`, `Output`, `LLM`, `Text`.
  - **Custom Extension Nodes**: `Filter`, `Transform`, `Merge`, `Router`, `Fetch`.
- **State Management**: Zustand store handling nodes, edges, connections, dynamic field updates, node removals, and theme toggling.
- **Theme Support**: Seamless Dark Mode and Light Mode toggle across the toolbar, canvas, and nodes.
- **Backend Graph & DAG Validation**:
  - Calculates total node count (`num_nodes`) and edge count (`num_edges`).
  - Implements a depth-first search (DFS) recursion stack algorithm to detect cycles and verify DAG compliance.

---

## 📁 Project Structure

```text
Flow-Pipeline-Builder/
├── backend/
│   ├── main.py                  # FastAPI application with /pipelines/parse endpoint
│   └── requirements.txt         # Python dependencies (FastAPI, Uvicorn)
├── frontend/
│   ├── public/                  # Static assets and index.html
│   ├── src/
│   │   ├── nodes/               # Node component definitions
│   │   │   ├── BaseNode.js      # Reusable node wrapper
│   │   │   ├── textNode.js      # Text node with variable extraction
│   │   │   ├── inputNode.js     # Input node
│   │   │   ├── outputNode.js    # Output node
│   │   │   ├── llmNode.js       # LLM node
│   │   │   ├── filterNode.js    # Filter node
│   │   │   ├── transformNode.js # Transform node
│   │   │   ├── mergeNode.js     # Merge node
│   │   │   ├── routerNode.js    # Router node
│   │   │   └── fetchNode.js     # Fetch node
│   │   ├── App.js               # Root application layout
│   │   ├── draggableNode.js     # Drag-and-drop toolbar item wrapper
│   │   ├── store.js             # Global Zustand state
│   │   ├── submit.js            # Pipeline submission and response alert
│   │   ├── toolbar.js           # Top toolbar with draggable nodes & theme toggle
│   │   └── ui.js                # React Flow canvas setup and drop handlers
│   └── package.json             # Frontend dependencies & build scripts
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start & Installation

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v16+ or v18+ recommended) & **npm**
- **Python** (v3.8+) & **pip**
- **Git**

---

### 1. Clone the Repository

```bash
git clone https://github.com/sayanchaki24/Flow-Pipeline-Builder.git
cd Flow-Pipeline-Builder
```

---

### 2. Backend Setup (FastAPI)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. (Recommended) Create and activate a virtual environment:
   - **Windows:**
     ```powershell
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```

   The backend will start at: `http://127.0.0.1:8000`  
   * API documentation available at: `http://127.0.0.1:8000/docs`

---

### 3. Frontend Setup (React)

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The app will automatically launch in your browser at: `http://localhost:3000`

---

## ⚙️ Environment Variables

The frontend can be configured to point to any deployed or local backend via an environment variable.

Create a `.env` file inside the `frontend/` directory (optional for local development):

```env
REACT_APP_BACKEND_URL=http://127.0.0.1:8000
```

If omitted, it defaults to `http://127.0.0.1:8000`. When deploying to production, set this to your hosted backend URL.

---

## 📖 Usage Guide

1. **Add Nodes**:
   - Drag any node from the top toolbar (`Input`, `LLM`, `Output`, `Text`, `Filter`, `Transform`, `Merge`, `Router`, `Fetch`) and drop it onto the canvas.
2. **Connect Nodes**:
   - Click and drag from any output handle (right side) to any compatible input handle (left side).
3. **Use Dynamic Text Variables**:
   - In any `Text` node, enter text containing double curly braces, such as `{{ input_data }}` or `{{ prompt }}`.
   - The node will dynamically generate new input handles corresponding to each variable name on the left side of the node.
4. **Submit & Validate Pipeline**:
   - Click the **Submit Pipeline** button at the bottom of the page.
   - An alert dialog will display:
     - Total number of nodes (`num_nodes`)
     - Total number of edges (`num_edges`)
     - DAG verification result (`is_dag: true/false`)

---

## 🌐 Deployment

### Frontend (Vercel)
1. Import the repository on [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Framework Preset: **Create React App**.
4. In **Environment Variables**, add:
   - `REACT_APP_BACKEND_URL`: URL of your deployed backend (e.g. `https://your-backend.onrender.com`).
5. Click **Deploy**.

### Backend (Render / Railway)
1. Create a new Web Service on [Render](https://render.com) or [Railway](https://railway.app).
2. Point to the repository with **Root Directory**: `backend`.
3. Set **Runtime**: `Python 3`.
4. Set **Build Command**: `pip install -r requirements.txt`.
5. Set **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React Flow 11, Zustand, CSS
- **Backend**: Python 3, FastAPI, Uvicorn
- **Deployment**: Vercel (Frontend), Render / Railway (Backend)
