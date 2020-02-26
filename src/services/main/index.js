import {ipcMain} from 'electron';

const req = require.context("./modules/", false, /\.js$/);

const modules = req.keys().reduce((map, it) => {
  const key = it.replace(/\.\/(.*)\.js/, '$1');
  return {
	...map, [key]: (args) => new Promise(async resolve => {
	  try {
		const module = await import( './modules/' + key);
		resolve(await module.default(args));
	  } catch (e) {
		resolve({success: false, message: 'load ' + key + ' fail!'});
	  }
	})
  };
}, {});

Object.keys(modules).forEach(key => {
  console.log('listen ', key);
  ipcMain.on(key, async (event, args) => {
	const result = await modules[key](args);
	console.log(result);
	event.sender.send(key + '-reply', result);
  });
});
