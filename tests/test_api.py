from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code in [200, 404]

def test_connection_config():
    from app.main import ConnectionConfig
    import os
    conf = ConnectionConfig()
    assert conf.MAIL_SERVER == "smtp.gmail.com"
