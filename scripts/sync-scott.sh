#!/bin/bash
# Sync script for VarnaAIMaster <-> Scott-VarnaAI
# Run from D:\VarnaAI\Websites

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== VarnaAI Sync Script ===${NC}"

# Pull latest from master
echo -e "${YELLOW}Pulling from VarnaAIMaster...${NC}"
git pull origin master

# Push to master
echo -e "${YELLOW}Pushing to VarnaAIMaster...${NC}"
git push origin master

# Sync to Scott's repo (if remote exists)
if git remote | grep -q "scott"; then
    echo -e "${YELLOW}Syncing to Scott's repo...${NC}"
    git push scott master
else
    echo -e "${YELLOW}Scott remote not configured. Add with:${NC}"
    echo "git remote add scott https://github.com/Marvelious/Scott-VarnaAI.git"
fi

echo -e "${GREEN}=== Sync Complete ===${NC}"
