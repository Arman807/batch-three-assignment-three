"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    port: process.env.PORT,
    db_url: process.env.DB_URL
};
