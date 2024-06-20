import { CommandModule } from 'yargs';
import { builder } from './argv';
import { handler } from './handler';
import { StacktraceCommandArgv } from './types';

const command = 'stacktrace';
const describe = 'Re-map input stack traces with passed source map';

export const commandModule: CommandModule<{}, StacktraceCommandArgv> = {
  handler,
  builder,
  command,
  describe
}
