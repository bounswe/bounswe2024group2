# Running the Backend Locally

To run the backend in your local machine, follow the steps below:

1. **Set up Virtual Environment**: Create a virtual environment using Python 3:

    ```bash
    python3 -m venv venv
    ```

2. **Activate Virtual Environment**: Activate the virtual environment:

    ```bash
    source venv/bin/activate
    ```

3. **Navigate to Backend Directory**: Change directory to the project's backend directory:

    ```bash
    cd backend/project
    ```

4. **Build Docker Images**: Build Docker images using Docker Compose:

    ```bash
    docker-compose build
    ```

5. **Start Docker Containers**: Start Docker containers in detached mode:

    ```bash
    docker-compose up -d
    ```

6. **Run Django Server**: Run the Django development server:

    ```bash
    python manage.py runserver
    ```
