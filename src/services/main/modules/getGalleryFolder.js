import openFolder from './openFolder';
import path from 'path';
import fs from 'fs';
import {promisify} from 'util';

export default function () {
  return new Promise(async resolve => {
	const dataPath = p => path.resolve(process.cwd(), './data/', p);
	try {
	  const data = await promisify(fs.readFile)(dataPath('galleryFolder.json', 'utf8'));
	  resolve({success: true, data: JSON.parse(data)});
	} catch (e) {
	  resolve({success: false, message: e.message || '读取失败！'});
	}
  });
}
