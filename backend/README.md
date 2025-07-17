# How to run backend
## First time steps
> Starting from root project folder, using command prompt
1. download .env file from backend documentation in google docs
2. 'python -m venv venv' to create a virtual environment named venv
3. 'venv\Scripts\activate' to enter the virtual environment
4. 'cd backend' to select backend folder
5. 'pip install -r requirements.txt' to install dependencies
6. 'python manage.py makemigrations' and then 'python manage.py migrate' to initialize database migrations
7. 'python manage.py runserver' to run the backend server locally