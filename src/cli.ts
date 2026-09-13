import { runCli } from './infrastructure/cli.js';
import { compose } from './composition.js';
const {play,close}=compose();
try {process.exitCode=await runCli(process.argv.slice(2),play,console.log);}
finally {await close();}
