# Anam Zahid — Portfolio

Personal portfolio of **Anam Zahid**, Python Full-Stack Developer (3+ years) — Django · FastAPI · React · PostgreSQL · AWS.

Live FastAPI app deployed on Render. The contact form stores messages in a database, readable from a private admin page.

## Stack

- **Backend:** FastAPI + SQLAlchemy (SQLite locally, `DATABASE_URL` Postgres in production)
- **Frontend:** Jinja2 template + vanilla CSS/JS — dark teal developer theme, typing effect, scroll-reveal animations, fully responsive
- **Server:** uvicorn

## Routes

| Route | What it does |
|---|---|
| `GET /` | The portfolio page |
| `POST /contact` | Saves a contact-form message, redirects back with a success toast |
| `GET /admin/contacts?key=<ADMIN_KEY>` | Private list of received messages |
| `GET /healthz` | Health check |

## Run locally

```bash
cd portfolio
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
# open http://127.0.0.1:8000
```

## Deploy on Render

Push this repo to GitHub — the existing Render service (`my-flask-portfolio`) auto-deploys from `main`.
`render.yaml` defines everything: build (`pip install -r requirements.txt`), start
(`uvicorn main:app --host 0.0.0.0 --port $PORT`), and an auto-generated `ADMIN_KEY`.

For a fresh service instead: Render dashboard → **New → Web Service** → connect the repo →
it picks up `render.yaml` automatically.

### Notes

- **Messages database:** on Render's free tier the SQLite file is wiped on each deploy/restart.
  To keep messages permanently, create a free Render Postgres instance and set its URL as the
  `DATABASE_URL` env var on the service — the app switches to it automatically.
- **Reading messages:** visit `/admin/contacts?key=...` with the `ADMIN_KEY` value shown in the
  service's Environment tab.

## Updating content

- **Resume:** replace `static/assets/Anam_Zahid_Resume.pdf`
- **Experience / projects / skills:** edit the matching section in `templates/index.html`
- **Accent color:** change `--accent` in `static/css/style.css`
