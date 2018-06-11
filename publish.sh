#!/usr/bin/env bash

die() {
   echo "This process probably finished with an error."
   echo "Stopping further processing"
   exit 1
}

checkit() {
   if [ "$1" != "0" ]; then
       die
   fi
}

echo "Switching to the master branch for cleanup..."
git checkout master
checkit "$?"
git pull
checkit "$?"

find . -not -path '*/\.*' -delete
checkit "$?"
git add .
checkit "$?"
git commit -m "Cleaning the current master branch at: $(date +"%Y-%m-%d %H:%M:%S")"
checkit "$?"

echo "Switching to 'source' branch for build."
git checkout source
checkit "$?"

echo "Building static site..."
docker run --rm -v $(pwd):/srv/jekyll jekyll/jekyll:3.4.3 jekyll build
checkit "$?"

echo "Switching to the master branch to deploy new static site..."
git checkout master
checkit "$?"

echo "Copying changes..."
rm -f _site/docker-compose.yml
cp -aR _site/. .
checkit "$?"

echo "Cleanup..."
rm -rf _site
checkit "$?"

echo "Creating readme..."
README=$(
cat > README.md <<-EOF
# JTech Blog

This site is generated so please do not edit.

Change to the 'source' branch if you need to edit the contents of this site.
EOF
)

echo "Committing changes..."
git add .
checkit "$?"
git commit -m "Deploying static site at: $(date +"%Y-%m-%d %H:%M:%S")"
checkit "$?"

echo "Publishing changes..."
git push
checkit "$?"

echo "Readying for new blog posts..."
git checkout source
checkit "$?"

echo "Publishing finished. Site should be available within a couple of minutes."
echo "Please go to https://ordina-jtech.github.io/ to see the changes you made..."