export const ServerAuthenticator = async (userContext: any, roles: any) => {
  console.log('authenticator userContext: ', userContext);
  console.log('authenticator roles: ', roles);

  const {
    context: { user },
  } = userContext;
  // TODO: Logica del authorizacion
  return true;
};
