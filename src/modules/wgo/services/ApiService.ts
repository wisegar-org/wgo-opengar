import { normalize, join } from 'path';
import { readJsonSync, existsSync } from 'fs-extra';
import { GetWebRootKey } from '../settings/ConfigService';

export class ApiService {
  public getApiVersion() {
    let path = __filename.split('src\\services');
    if (path.length === 0) {
      path = __filename.split('services');
    }
    const packagePath = normalize(join(GetWebRootKey(), 'package.json'));
    if (existsSync(packagePath)) {
      const packageJson = readJsonSync(packagePath);
      return packageJson.version;
    }
    return process.env.API_VERSION || 'unknown version';
  }
}
