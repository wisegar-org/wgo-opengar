export * from './services/LabelService';

import dotenv from 'dotenv';
import AccountEntity from './database/entities/AccountEntity';
import BillEntity from './database/entities/BillEntity';
import BillProductRelationEntity from './database/entities/BillProductRelationEntity';
import CollaboratorEntity from './database/entities/CollaboratorEntity';
import ExpenseEntity from './database/entities/ExpenseEntity';
import IncomeEntity from './database/entities/IncomeEntity';
import IssueEntity from './database/entities/IssueEntity';
import LabelEntity from './database/entities/LabelEntity';
import MilestoneEntity from './database/entities/MilestoneEntity';
import OrganizationDataEntity from './database/entities/OrganizationDataEntity';
import ProductEntity from './database/entities/ProductEntity';
import ProjectEntity from './database/entities/ProjectEntity';
import RepositoryEntity from './database/entities/RepositoryEntity';
import TransactionEntity from './database/entities/TransactionEntity';
dotenv.config({
  path: '.env',
});

export { InitializeRouter as InitializeGithubRouter } from './router';
export const FINANCE_MODULE = 'finance';

export const getFinanceEntities = () => {
  return [
    AccountEntity,
    CollaboratorEntity,
    ExpenseEntity,
    IncomeEntity,
    IssueEntity,
    LabelEntity,
    MilestoneEntity,
    OrganizationDataEntity,
    ProjectEntity,
    RepositoryEntity,
    TransactionEntity,
    ProductEntity,
    BillEntity,
    BillProductRelationEntity,
  ] as any[];
};
