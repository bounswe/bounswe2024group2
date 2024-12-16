# Use an official Python runtime as a parent image
FROM python:3.11.6

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /annotations_backend

# Install dependencies
COPY requirements.txt /annotations_backend/
RUN pip install -r requirements.txt

# Copy the project code into the container
COPY . /annotations_backend/