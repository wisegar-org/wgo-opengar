module.exports = {
  client: {
    service: {
      name: 'opengar',
      // URL to the GraphQL API
      url: 'http://localhost:5000/graphql'
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js']
  }
};
