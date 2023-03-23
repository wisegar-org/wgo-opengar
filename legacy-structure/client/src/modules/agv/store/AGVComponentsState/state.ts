export interface AGVComponentsStateInterface {
  menuOpen: boolean;
}

function state(): AGVComponentsStateInterface {
  return {
    menuOpen: false
  };
}

export default state;
export const AGVComponentStateModule = state;
