import openFolder from './openFolder';
import path from 'path';
import fs from 'fs';
import {promisify} from 'util';

export default function () {
  return new Promise(async resolve => {
	const result = await openFolder();
	console.log(result);
	if (!result.success) return resolve(result);
	const dataPath = p => path.resolve(process.cwd(), './data/', p);
	try {
	  const old = JSON.parse(await promisify(fs.readFile)(dataPath('galleryFolder.json', 'utf8')));
	  const data = [...old, ...result.data];
	  await promisify(fs.writeFile)(dataPath('galleryFolder.json'), JSON.stringify(data), 'utf8');
	  console.log('write galleryFolder.json');
	  resolve({success: true, data});
	} catch (e) {
	  resolve({success: false, message: e.message || '写入失败！'});
	}
  });
}
