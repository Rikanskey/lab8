import express from 'express';
import body_parser from 'body-parser'
import puppeteer from 'puppeteer'

import appSrc from './app.js';

const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE"
}
const port = 8081

const app = appSrc(express, CORS, body_parser, puppeteer)

app.listen(port, () => console.log(`Server running: ${port}`));

