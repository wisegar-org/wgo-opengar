// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AGVPollsStateInterface {}

function state(): AGVPollsStateInterface {
  return {};
}

export default state;
export const AGVPollStateModule = state;
