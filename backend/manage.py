#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

import time
import mysql.connector
import os
from django.core.management import execute_from_command_line
from django.db import connection, OperationalError


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    while True:
        try:
            # Try to connect to the database
            from django.db import connection
            connection.ensure_connection()
            print("Db is ready")
            break
        except OperationalError:
            print("Database not ready yet. Waiting...")
            time.sleep(5)

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
   main()


