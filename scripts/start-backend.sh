#!/bin/bash

# Start the Laravel backend server for development

BACKEND_DIR="/Users/jd/fixmymind/fixmymind-backend"

echo "Starting FixMyMind backend server..."

# Check if backend directory exists
if [ ! -d "$BACKEND_DIR" ]; then
    echo "Error: Backend directory not found at $BACKEND_DIR"
    exit 1
fi

# Navigate to backend directory
cd "$BACKEND_DIR"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Error: .env file not found. Please configure your environment."
    exit 1
fi

# Start the Laravel development server
echo "Starting Laravel server on http://localhost:8000"
php artisan serve --port=8000
