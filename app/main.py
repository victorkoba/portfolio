from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactSchema(BaseModel):
    name: str
    email: EmailStr
    subject: str
    msg: str

conf = ConnectionConfig(
    MAIL_USERNAME = os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD"),
    MAIL_FROM = os.getenv("MAIL_FROM"),
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True
)

@app.post("/send-email")
async def send_email(contact: ContactSchema):
    html = f"""
    <p><b>Nome:</b> {contact.name}</p>
    <p><b>Email:</b> {contact.email}</p>
    <p><b>Assunto:</b> {contact.subject}</p>
    <p><b>Mensagem:</b> {contact.msg}</p>
    """

    message = MessageSchema(
        subject=f"Novo contato do Portfolio: {contact.subject}",
        recipients=[os.getenv("MAIL_FROM")],
        body=html,
        subtype="html"
    )

    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        return {"message": "E-mail enviado com sucesso!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))