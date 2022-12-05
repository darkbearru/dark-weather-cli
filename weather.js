#!/usr/bin/env node
import process from 'process';
import {getArgs} from "./helpers/args.js";

const initCLI = () => {
    const args = getArgs(process.argv);
    console.log(args);
    if (args.s) {

    }
    if (args.t) {

    }
    if (args.h) {

    }
}

initCLI();