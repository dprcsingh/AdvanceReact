import { config } from 'dotenv';

config();

const envVars = process.env;

const configuration = Object.freeze({
    graphql_url: `${envVars.REACT_APP_GRAPH_URL}/graphql`,
});

export default configuration;
