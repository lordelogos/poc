# Proof-of-concept

This is a POC for a resend client

## What it entails

Setting up a server that will enable uesrs directly use resend on their client applications (no edge functions or api routes)

## Local setup

- Clone the Repo
- `cd server && yarn dev`
- `cd package && yarn link`
- `cd client && yarn link package`

## From the client

- Open `main.js`, enter you api-key
- run `yarn dev` and send an email from the browser
