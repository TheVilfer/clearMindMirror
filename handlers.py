from aiogram import Router, types
from aiogram.filters import Command
import requests
import os

router = Router()

def forward_to_api(text: str):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('api_key')}"
    }
    data = {
        "model": "",
        "prompt": text,
        "max_tokens": 100        
    }
    response = requests.post(config.API_URL, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return f"Error: {response.status_code}, {response.text}"

@router.message(Command("start"))
async def send_welcome(message: types.Message):
    await message.answer("Welcome! How can I assist you today?")

@router.message()
async def handle_message(message: types.Message):
    if (message != '/start'):
        while True:
            user_message = message.text

            if user_message.lower() == '/stop':
                break 

            #api_response = forward_to_api(user_message)
            
            await message.answer('api_response')
            
            message = await message.bot.wait_for('message')
