"""Anam Zahid — portfolio site. FastAPI + SQLAlchemy, deployed on Render."""

import os
from datetime import datetime, timezone

from fastapi import FastAPI, Form, Request, HTTPException
from fastapi.responses import RedirectResponse, PlainTextResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import Column, DateTime, Integer, String, Text, create_engine
from sqlalchemy.orm import Session, declarative_base

# --- database -------------------------------------------------------------
# Render Postgres gives postgres:// URLs; SQLAlchemy 2.x needs postgresql://
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./db.sqlite3")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)
Base = declarative_base()


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    email = Column(String(120), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


Base.metadata.create_all(engine)

# --- app ------------------------------------------------------------------
app = FastAPI(title="Anam Zahid — Portfolio", docs_url=None, redoc_url=None)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# React build (frontend/dist) — served at / with Vite assets under /assets
DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend", "dist")
DIST_INDEX = os.path.join(DIST_DIR, "index.html")
if os.path.isdir(os.path.join(DIST_DIR, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST_DIR, "assets")), name="assets")

# Protects /admin/contacts. Set in Render dashboard (or render.yaml generates one).
ADMIN_KEY = os.environ.get("ADMIN_KEY", "")


@app.get("/")
def home(request: Request):
    if os.path.isfile(DIST_INDEX):
        return FileResponse(DIST_INDEX, headers={"Cache-Control": "no-cache"})
    return templates.TemplateResponse(request, "index.html")  # fallback: old Jinja page


@app.post("/contact")
def contact(request: Request, name: str = Form(...), email: str = Form(...), message: str = Form(...)):
    name, email, message = name.strip()[:80], email.strip()[:120], message.strip()[:4000]
    ok = bool(name and email and message)
    if ok:
        with Session(engine) as session:
            session.add(ContactMessage(name=name, email=email, message=message))
            session.commit()
    if "application/json" in request.headers.get("accept", ""):
        return JSONResponse({"ok": ok})
    return RedirectResponse(f"/?sent={1 if ok else 0}#contact", status_code=303)


@app.get("/admin/contacts")
def admin_contacts(request: Request, key: str = ""):
    if not ADMIN_KEY or key != ADMIN_KEY:
        raise HTTPException(status_code=404)
    with Session(engine) as session:
        rows = (
            session.query(ContactMessage)
            .order_by(ContactMessage.created_at.desc())
            .limit(500)
            .all()
        )
    return templates.TemplateResponse(request, "admin_contacts.html", {"rows": rows})


@app.get("/healthz")
def healthz():
    return PlainTextResponse("ok")
