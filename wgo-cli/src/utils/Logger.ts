/**
 * Terminal-kit
 * https://github.com/cronvel/terminal-kit/blob/HEAD/doc/low-level.md#ref.styles
 */
import { terminal } from "terminal-kit";

export const Logger = {
  TitleVerLine: (messsage: string, version: string) => {
    terminal.bold
      .yellow(messsage)
      .yellow(" - ")
      .bold.yellow(version)
      .yellow("\n\n");
    terminal.styleReset();
  },
  TitleLine: (messsage: string) => {
    terminal.bold.yellow(messsage).yellow("\n");
    terminal.styleReset();
  },
  CmdLine: (messsage: string, callback?: () => void) => {
    if (!callback) {
      terminal.bold.yellow(`[wgo] ${messsage}`).yellow("\n");
      terminal.styleReset();
      return;
    }
    terminal.bold.yellow(`[wgo] ${messsage}`).yellow("\n");
    try {
      callback();
      terminal.bold.green(`[wgo] ${messsage} [OK]\n`);
    } catch {
      terminal.yellow(`\n`);
    } finally {
      terminal.styleReset();
    }
  },
  SimpleLine: (messsage: string) => {
    terminal.yellow(`${messsage}\n`);
    terminal.styleReset();
  },
  Line: (messsage: string, callback?: () => void) => {
    if (!callback) {
      terminal.yellow(`[wgo] ${messsage}\n`);
      terminal.styleReset();
      return;
    }
    terminal.yellow(`[wgo] ${messsage}\n`);
    try {
      callback();
      terminal.green(`[wgo] ${messsage} [OK]\n`);
    } catch {
      terminal.yellow(`\n`);
    } finally {
      terminal.styleReset();
    }
  },
  Error: (messsage: string, fatal?: boolean) => {
    if (fatal) {
      terminal.red.error(`[wgo-fatal-error] ${messsage}\n`);
    } else {
      terminal.red.error(`[wgo-error] ${messsage}\n`);
    }
    terminal.styleReset();
    if (fatal) process.exit(-1);
  },
};
