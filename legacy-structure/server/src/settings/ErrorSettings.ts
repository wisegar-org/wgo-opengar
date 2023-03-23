import { ApolloError } from 'apollo-client';

export const formatError = (err: Error) => {
  console.log(err);
  return new ApolloError({
    errorMessage: err.message,
  });
};
