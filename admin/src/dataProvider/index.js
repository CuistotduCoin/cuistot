import buildApolloClient from 'ra-data-graphql-simple';

export default () => {
    const getGqlResource = resource => {
        switch (resource) {
            case 'customers':
                return 'Customer';

            case 'categories':
                return 'Category';

            case 'commands':
                return 'Command';

            case 'products':
                return 'Product';

            case 'reviews':
                return 'Review';

            default:
                throw new Error(`Unknown resource ${resource}`);
        }
    };

    return buildApolloClient({
        clientOptions: {
            uri: 'https://ozfok56hsjbllolkx7pplkqkyi.appsync-api.eu-west-1.amazonaws.com/graphql',
        },
    }).then(dataProvider => (type, resource, params) =>
        dataProvider(type, getGqlResource(resource), params)
    );
};
