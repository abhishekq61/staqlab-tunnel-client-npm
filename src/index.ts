#!/usr/bin/env node
import userHome from 'user-home';
import * as fs from "fs";
import * as  os from 'os';
import {exec} from "child_process";
import * as unzip from "unzip";
import StaqlabTunnelClient from "./StaqlabTunnelClient";


new StaqlabTunnelClient(null).init();
