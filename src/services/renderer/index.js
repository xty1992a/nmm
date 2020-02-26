import {ipcRenderer} from 'electron';

export const notice = (event, args) => new Promise(resolve => {
  ipcRenderer.on(event + '-reply', (event, result) => {
	resolve(result);
  });

  ipcRenderer.send(event, args);
});
