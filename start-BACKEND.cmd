@echo off
cd backend

echo 📦 Installation des dépendances...
call npm install express dotenv pg express-session

echo ✅ Lancement du serveur...
call node server.js
