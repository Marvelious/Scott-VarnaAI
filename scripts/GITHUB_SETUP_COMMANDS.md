# GitHub Setup Commands
**Run these after: `gh auth login -h github.com`**

## Step 1: Rename Main Repo to VarnaAIMaster

```bash
# Rename existing repo on GitHub
gh repo rename VarnaAIMaster --repo Marvelious/varnaai-seo

# Update local remote
cd D:/VarnaAI/Websites
git remote set-url origin https://github.com/Marvelious/VarnaAIMaster.git
```

## Step 2: Create Scott's Synced Repo

```bash
# Create Scott's repo (public for him to access)
gh repo create Scott-VarnaAI --public -d "Shared VarnaAI workspace with Scott"

# Add as second remote
cd D:/VarnaAI/Websites
git remote add scott https://github.com/Marvelious/Scott-VarnaAI.git
```

## Step 3: Create Missing App Repos

```bash
# projectmanager
gh repo create projectmanager --private -d "AI-powered project management tool"
cd D:/VarnaAI/Websites/apps/projectmanager
git remote add origin https://github.com/Marvelious/projectmanager.git
git push -u origin master

# agenticcoder
gh repo create agenticcoder --private -d "Agentic AI coding assistant platform"
cd D:/VarnaAI/Websites/apps/agenticcoder
git remote add origin https://github.com/Marvelious/agenticcoder.git
git push -u origin master

# taxapp
gh repo create taxapp --private -d "Tax calculation and planning application"
cd D:/VarnaAI/Websites/apps/taxapp
git remote add origin https://github.com/Marvelious/taxapp.git
git push -u origin master
```

## Step 4: Push Everything

```bash
# Main repo (VarnaAIMaster)
cd D:/VarnaAI/Websites
git add -A
git commit -m "Add all agents and apps to master repo"
git push origin master
git push scott master

# Individual apps with existing remotes
cd D:/VarnaAI/Websites/apps/dashboard && git push origin master
cd D:/VarnaAI/Websites/apps/fwchange && git push origin master
cd D:/VarnaAI/Websites/apps/pension && git push origin master
cd D:/VarnaAI/Websites/apps/seoagent && git push origin master
cd D:/VarnaAI/Websites/apps/varnaai && git push origin master
cd D:/VarnaAI/Websites/apps/webscrap && git push origin master
```

## Step 5: Give Scott Access

```bash
# Add Scott as collaborator to Scott-VarnaAI
gh repo edit Marvelious/Scott-VarnaAI --add-collaborator SCOTT_GITHUB_USERNAME
```

## Daily Sync Workflow

**You push:**
```bash
cd D:/VarnaAI/Websites
git add -A && git commit -m "Update from Gennadius"
git push origin master   # to VarnaAIMaster
git push scott master    # syncs to Scott
```

**Scott pushes:**
```bash
# Scott works on his clone
git add -A && git commit -m "Update from Scott"
git push origin master
```

**You pull Scott's changes:**
```bash
cd D:/VarnaAI/Websites
git pull scott master
```

## Repository Structure

```
GitHub (Marvelious account):
├── VarnaAIMaster (private)     ← Main repo, all folders
├── Scott-VarnaAI (public)      ← Synced, excludes cv/mcp-bridge/ml_models
├── projectmanager (private)    ← App repo
├── agenticcoder (private)      ← App repo
├── taxapp (private)            ← App repo
├── compliance-command-center   ← dashboard app
├── FwChange                    ← fwchange app
├── RetirementAI                ← pension app
├── seoagent                    ← seoagent app
├── varnaai-platform            ← varnaai app
└── webscrap                    ← webscrap app
```
