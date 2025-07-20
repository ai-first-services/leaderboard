#!/bin/bash

# AI First Services Leaderboard Setup Script
echo "🚀 Setting up AI First Services Leaderboard..."

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run this script from the project root directory."
    exit 1
fi

# Create directories if they don't exist
echo "📁 Creating necessary directories..."
mkdir -p .github/workflows

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "⚠️  Warning: Git is not installed. Please install Git to manage version control."
else
    # Initialize git repository if not already initialized
    if [ ! -d ".git" ]; then
        echo "📦 Initializing Git repository..."
        git init
        git add .
        git commit -m "Initial commit: AI First Services Leaderboard"
        echo "✅ Git repository initialized"
    else
        echo "✅ Git repository already exists"
    fi
fi

# Check if we can open the site locally
echo "🌐 Project setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Open index.html in your browser to view the site locally"
echo "2. Create a GitHub repository and push this code:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/AI_First_Services.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo "3. Enable GitHub Pages in repository settings"
echo "4. Your site will be available at: https://YOUR_USERNAME.github.io/AI_First_Services"
echo ""
echo "🎉 Happy coding!"

# Try to open the site in the default browser (macOS/Linux)
if command -v open &> /dev/null; then
    echo "🔍 Opening site in browser..."
    open index.html
elif command -v xdg-open &> /dev/null; then
    echo "🔍 Opening site in browser..."
    xdg-open index.html
else
    echo "💡 Tip: Open index.html in your browser to view the site"
fi
