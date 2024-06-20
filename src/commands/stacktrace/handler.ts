import chalk from 'chalk';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SourceMapConsumer } from 'source-map';
import StackTracey from 'stacktracey';
import { StacktraceCommandArgv } from "./types";

function wrapStackString(stack: string) {
  const error = new Error();
  error.stack = stack;
  return error;
}

function resolvePath(input: string) {
  if (path.isAbsolute(input)) {
    return input;
  }

  return path.resolve(process.cwd(), input);
}

export async function handler(argv: StacktraceCommandArgv) {
  const inputPath = resolvePath(argv.input);
  const sourceMapPath = resolvePath(argv.sourceMap);
  const sourceMap = (await readFile(sourceMapPath)).toString('utf-8');
  const traces = (await readFile(inputPath)).toString('utf-8').split('\n\n').map(t => t.trim());

  await SourceMapConsumer.with(sourceMap, null, (consumer) => {
    let i = 1;

    for (const trace of traces) {
      console.log(`🗒️ ${chalk.bold(`Stack trace #${i}`)} ==================\n`);
      console.log(`📖 ${chalk.bold('With source map:')}\n\n${chalk.bold(trace.slice(0, trace.indexOf('\n')))}`);

      const parsedTrace = new StackTracey(trace);

      for (const parsedTraceLine of parsedTrace.items) {
        const { column, line } = parsedTraceLine;

        if (!column || !line) {
          console.log(
            `\t⁉️ at ${chalk.bold(parsedTraceLine.callee)} ${parsedTraceLine.file}:${parsedTraceLine.line}:${parsedTraceLine.column}`
          );
          continue;
        }

        const original = consumer.originalPositionFor({
          column,
          line
        });
        console.log(
          `\tat ${chalk.bold(original.name || parsedTraceLine.callee)} ${original.source || parsedTraceLine.file}:${original.line || parsedTraceLine.line}:${original.column || parsedTraceLine.column}`
        );
      }

      console.log(`\n📙 ${chalk.bold('Original:')}\n\n ${parsedTrace.clean().asTable()}\n\n`)
      i++;
    }
  });
}