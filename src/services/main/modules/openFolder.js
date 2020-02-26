import {dialog} from 'electron';

export default function (args) {
  return new Promise(resolve => {
	console.log('should relaunch', args);
	dialog.showOpenDialog({
	  title: '打开文件夹',
	  properties: ['openDirectory']
	}, function (fileName) {
	  resolve({success: true, data: fileName});
	});
  });
};
