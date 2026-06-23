# DevFolio – Developer Portfolio Generator

A full-stack MERN web app where developers can create a professional portfolio by filling out a form. The system saves data to MongoDB and generates a shareable public portfolio page at a unique URL.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router v6, Axios |
| Styling | CSS Variables + custom design system |
| Backend | Node.js, Express.js (RESTful API) |
| Database | MongoDB + Mongoose |
| Dev Tools | Nodemon, Morgan |

---

## Project Structure

```
portfolio-generator/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Route logic
│   ├── middleware/      # Error handler
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    └── src/
        ├── components/
        │   ├── common/    # Spinner, shared UI
        │   ├── form/      # PortfolioForm
        │   ├── layout/    # Navbar, Footer
        │   └── portfolio/ # PortfolioView
        ├── context/       # React Context
        ├── pages/         # Route pages
        ├── utils/         # API client, validation
        ├── App.js
        └── index.js
```

---

## Setup Instructions

### Prerequisites
- Node.js >= 16
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/portfolio-generator.git
cd portfolio-generator
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set your MONGO_URI
npm run dev
```

### 3. Frontend Setup (new terminal)

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if your backend runs on a different port
npm start
```

The app will open at **http://localhost:3000**

---

## Environment Variables

### Backend `.env`

```env
MONGO_URI=mongodb://localhost:27017/portfolio-generator
PORT=5000
NODE_ENV=development
```

### Frontend `.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/portfolio` | Get all published portfolios |
| `POST` | `/api/portfolio` | Create a new portfolio |
| `GET` | `/api/portfolio/:username` | Get portfolio by username |
| `PUT` | `/api/portfolio/:username` | Update portfolio |
| `DELETE` | `/api/portfolio/:username` | Delete portfolio |
| `GET` | `/api/portfolio/check/:username` | Check username availability |
| `GET` | `/api/health` | Health check |

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home / landing page |
| `/create` | Multi-section portfolio form |
| `/preview` | Preview before publishing |
| `/portfolio/:username` | Public portfolio page |
| `/edit/:username` | Edit existing portfolio |

---

## 7-Day Development Roadmap

| Day | Tasks |
|-----|-------|
| **Day 1** | Setup, project structure, MongoDB connection, Portfolio model |
| **Day 2** | Backend API (all CRUD endpoints), error handling |
| **Day 3** | React setup, Navbar/Footer, routing, API utility |
| **Day 4** | PortfolioForm component (all sections) |
| **Day 5** | PortfolioView (public page), Preview page |
| **Day 6** | Edit page, polish UI, responsive design |
| **Day 7** | Edge cases, README, testing, optional deployment |

---

## Bonus Features (Planned)

- [ ] Dark/Light theme toggle
- [ ] Portfolio view count analytics
- [ ] JWT Authentication
- [ ] Resume PDF upload (Cloudinary)
- [ ] SEO meta tags / Open Graph
- [ ] Deployment (Vercel + Render)

---

## Deployment

### Frontend (Vercel)
```bash
cd frontend && npm run build
# Deploy dist/ to Vercel
```

### Backend (Render)
- Connect your GitHub repo
- Set `MONGO_URI` environment variable
- Build command: `npm install`
- Start command: `node server.js`

---

## Screenshots

> Add screenshots of the app here after running it locally.

---

## License

MIT
