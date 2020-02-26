export default function (args) {
  return new Promise(resolve => {
	console.log('should relaunch', args);
	resolve({success: true, message: 'relaunch success'});
  });
};
