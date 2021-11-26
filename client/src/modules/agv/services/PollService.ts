import { IPoll } from '../models/Poll';

export class PollService {
  public getPollConfig(): Promise<IPoll> {
    return new Promise((resolve, reject) => {
      void fetch(`${location.origin}/data/poll.json`)
        .then(response => response.json())
        .then((data: unknown) => {
          if (!data) reject();
          resolve(data as IPoll);
        });
    });
  }
  public getPollHtml(): Promise<string> {
    return new Promise((resolve, reject) => {
      void fetch(`${location.origin}/data/poll.html`)
        .then(response => response.text())
        .then((data: string) => {
          if (!data) reject();
          resolve(data);
        });
    });
  }
}
