#!/usr/bin/env node
import yargs from 'yargs';
import { commandModule } from './commands/stacktrace';
import { StacktraceCommandArgv } from './commands/stacktrace/types';

const { argv } = yargs
  .command<StacktraceCommandArgv>(commandModule)
  .demandCommand();

export default argv;