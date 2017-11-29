#!/bin/bash

set -o errexit -o nounset

rev=$(git rev-parse --short HEAD)

cd dist
#rm -rf .git

git init
git config user.name "Semaphore CI"
git config user.email "bot@nomail.io"

git remote add upstream "git:$GITHUB_TOKEN@github.com:HaoZeke/grimoire.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages
rm -rf .git