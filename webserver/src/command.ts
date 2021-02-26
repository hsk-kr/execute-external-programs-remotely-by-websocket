import { exec } from 'child_process';

/**
 * It opens an external program depends on the command
 * @param command command string
 */
export const openProgram = (command: string) => {
  switch (command) {
    case 'open browser':
      console.log('Open Browser');
      exec('start https://google.com/');
      break;
    case 'open command prompt':
      console.log('Open Command Prompt');
      exec('start cmd');
      break;
    case 'open task manager':
      console.log('Open Task Manager');
      exec('taskmgr');
      break;
  }
};
