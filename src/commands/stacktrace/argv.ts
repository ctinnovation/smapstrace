import yargs from "yargs";
import { StacktraceCommandArgv } from "./types";

export function builder(yargs: yargs.Argv<{}>): yargs.Argv<StacktraceCommandArgv> {
  return yargs
    .example(
      '$0 stacktrace --input ./input --sourceMap ./out.js.map',
      'Re-map input stack traces with passed source map'
    )
    .string('input')
    .describe('input', 'Input file containing stack traces to re-map')
    .string('sourceMap')
    .describe('sourceMap', 'Source map file')
    .demandOption('input')
    .demandOption('sourceMap')
    .help();
}