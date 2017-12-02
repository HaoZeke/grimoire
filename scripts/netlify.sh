#!/usr/bin/env bash
set -e # halt script on error

zip -r website.zip dist

curl -H "Content-Type: application/zip" \
     -H "Authorization: Bearer $NETLIFY_TOKEN" \
     --data-binary "@website.zip" \
     https://api.netlify.com/api/v1/sites/$NETLIFY_API_ID/deploys