@echo off
setlocal
cd /d "%~dp0"

set PROJECT_DIR=%~dp0UniversityHub
set PYTHON_EXE=%~dp0venv\Scripts\python.exe

if not exist "%PYTHON_EXE%" (
  echo Virtual environment not found at %PYTHON_EXE%
  exit /b 1
)

cd /d "%PROJECT_DIR%"
echo Installing Python dependencies from requirements.txt...
"%PYTHON_EXE%" -m pip install -r requirements.txt

echo Starting Django development server...
"%PYTHON_EXE%" manage.py runserver
