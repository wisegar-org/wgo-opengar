import { SeoResponseGql } from 'src/graphql';

export interface SeoStateInterface {
  seo: SeoResponseGql;
}

const state = (): SeoStateInterface => {
  return {
    seo: <SeoResponseGql>{}
  };
};

export default state;
