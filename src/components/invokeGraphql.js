import API from '@aws-amplify/api'

API.configure({
  'aws_appsync_graphqlEndpoint': '[INSERT-URL]',
  'aws_appsync_region': 'eu-west-1',
  'aws_appsync_authenticationType': 'API_KEY',
  'aws_appsync_apiKey': '[INSERT-KEY]',
})

const invokeGraphql = (query, variables) => {
  return API.graphql({ query, variables });
}

invokeGraphql.toString = () => "invokeGraphql";

export default invokeGraphql;
