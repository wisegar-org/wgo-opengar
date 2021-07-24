import { normalize, join } from 'path';
import { readJsonSync, existsSync } from 'fs-extra';

export class ApiService {
  public getApiVersion() {
    let path = __filename.split('src\\services');
    if (path.length === 0) {
      path = __filename.split('services');
    }
    const packagePath = normalize(join(path[0], 'package.json'));
    if (existsSync(packagePath)) {
      const packageJson = readJsonSync(packagePath);
      return packageJson.version;
    }
    return process.env.API_VERSION || 'unknown version';
  }
}
