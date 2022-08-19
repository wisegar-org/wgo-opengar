export interface NumberDictionary {
  [key: number]: string;
}

export interface StringDictionary {
  [key: string]: string;
}

export interface ObjectDictionary {
  [key: string]: ObjectDictionary | StringDictionary | NumberDictionary | any;
}
