import { createEmailMedia1651972762300 } from './1651972762300-createEmailMedia';
import { createEmailHistory1651974663732 } from './1651974663732-createEmailHistory';
import { createEmailMediaRelation1651975332815 } from './1651975332815-createEmailMediaRelation';
import { removeUniqueContentID1655304993610 } from './1655304993610-removeUniqueContentID';
import { createEmployees1657550848007 } from './1657550848007-createEmployees';
import { updateEmployees1657747113758 } from './1657747113758-updateEmployees';

export const getSwisspayMigrations = () => {
  return [
    createEmailMedia1651972762300,
    createEmailHistory1651974663732,
    createEmailMediaRelation1651975332815,
    removeUniqueContentID1655304993610,
    createEmployees1657550848007,
    updateEmployees1657747113758,
  ];
};
