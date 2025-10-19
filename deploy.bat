@echo off
echo 🚀 Google Student Ambassador Website - Netlify Deployment
echo.
echo Choose your deployment method:
echo 1. Open Netlify website for drag & drop deployment
echo 2. Show Git commands for GitHub integration
echo 3. Install and use Netlify CLI
echo 4. Show project files location
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Opening Netlify website...
    start https://app.netlify.com/drop
    echo.
    echo Instructions:
    echo 1. Drag and drop this entire folder to the deployment area
    echo 2. Your site will be live instantly!
    echo 3. You can customize the domain name after deployment
) else if "%choice%"=="2" (
    echo.
    echo Git Commands for GitHub Integration:
    echo.
    echo 1. Create a new repository on GitHub
    echo 2. Run these commands in this directory:
    echo.
    echo    git remote add origin https://github.com/udayrastogi0531/GoogleStudentAmbassador.git
    echo    git branch -M main
    echo    git push -u origin main
    echo.
    echo 3. Go to netlify.com, click "New site from Git"
    echo 4. Select your GitHub repository
    echo 5. Deploy settings will be auto-detected
) else if "%choice%"=="3" (
    echo.
    echo Installing Netlify CLI...
    npm install -g netlify-cli
    echo.
    echo Logging in to Netlify...
    netlify login
    echo.
    echo Deploying your site...
    netlify deploy --prod --dir .
) else if "%choice%"=="4" (
    echo.
    echo Your project is located at: %CD%
    echo.
    echo Files ready for deployment:
    dir /b
    echo.
    echo You can zip this folder and drag it to netlify.com/drop
) else (
    echo Invalid choice. Please run the script again.
)

echo.
pause