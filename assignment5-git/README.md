# Assignment 5 — Git and GitHub\n\n**Student:** Prathamesh Baban Apsunde  \n**Department:** Information Technology · MVPS’s KBT College of Engineering, Nashik

## 1. Create a local repository
Open Terminal and move into your project folder:
```bash
cd path/to/your-project
git init
git add .
git commit -m "Initial commit"
```

## 2. Create a GitHub repository
1. Sign in at https://github.com
2. Click **New repository**.
3. Enter a repository name and create it. If your local project already has files, do not initialize the GitHub repository with a README.

## 3. Connect and push
Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your own values:
```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## If `origin` already exists
```bash
git remote -v
git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## Later updates
```bash
git add .
git commit -m "Update project"
git push
```
Never upload passwords, API keys, database credentials, or `.env` files.
