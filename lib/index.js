#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StaqlabTunnelClient_1 = __importDefault(require("./StaqlabTunnelClient"));
new StaqlabTunnelClient_1.default(null).init();
