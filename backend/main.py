from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from pydantic import BaseModel
import httpx

load_dotenv()

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:5500", # For Live Server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for simplicity, but you can restrict it to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Supabase configuration
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserCredentials(BaseModel):
    email: str
    password: str

def get_email_type(email: str):
    domain = email.split('@')[1]
    if domain == 'gmail.com':
        return 'gmail'
    elif '.edu' in domain or '.ac' in domain:
        return 'college'
    else:
        # This is a simplification. A more robust solution would check against a list of known free providers.
        return 'company'

async def is_disposable_email(email: str):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"https://disify.com/api/email/{email}")
            response.raise_for_status()
            data = response.json()
            return data.get('disposable', False)
        except httpx.RequestError as exc:
            print(f"An error occurred while requesting {exc.request.url!r}.")
            return False # Fail safe, assume not disposable
        except httpx.HTTPStatusError as exc:
            print(f"Error response {exc.response.status_code} while requesting {exc.request.url!r}.")
            return False # Fail safe, assume not disposable

@app.post("/signup")
async def signup(credentials: UserCredentials):
    if await is_disposable_email(credentials.email):
        raise HTTPException(status_code=400, detail="Disposable emails are not allowed.")

    email_type = get_email_type(credentials.email)
    # You can add logic here based on email_type if needed.
    # For now, we are just classifying it.

    try:
        user = supabase.auth.sign_up({"email": credentials.email, "password": credentials.password})
        return {"message": "Sign up successful! Please check your email for a confirmation link.", "user": user}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        user = supabase.auth.get_user(token)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

@app.get("/")
def read_root():
    return {"message": "Welcome to the NuraPath API"}

@app.get("/users/me")
def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        user = supabase.auth.sign_in_with_password({"email": form_data.username, "password": form_data.password})
        return {"access_token": user.session.access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Incorrect email or password",
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
