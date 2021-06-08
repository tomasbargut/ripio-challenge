#!/bin/bash
python manage.py migrate
gunicorn --reload challenge.wsgi --bind 0.0.0.0:8000