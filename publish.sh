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

echo "Building static site..."
docker run --rm -v $(pwd):/srv/jekyll jekyll/jekyll:3.4.3 jekyll build
checkit "$?"

echo "Switching to the master branch..."
git checkout master
git pull

echo "Copying changes..."
rm -f _site/docker-compose.yml _site/README.md
cp -vaR _site/. .
checkit "$?"

echo "Cleanup..."
rm -rf _site
checkit "$?"

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

echo "Publishing finished."
echo "Please go to https://ordina-jtech.github.io/ to see the changes you made..."