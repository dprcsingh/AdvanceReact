import { gql, useLazyQuery, useQuery } from '@apollo/client';

const GET_DATA = gql`
    query GetData {
        getData {
            name
            city
            id
        }
    }
`;
const GET_DATA_BY_ID = gql`
    query GetDataById($id: Int!) {
        getDataById(id: $id) {
            name
            city
            id
        }
    }
`;

const Test = () => {
    // const { data: abc } = useQuery(query);
    const [getData, { error, data, loading }] = useLazyQuery(GET_DATA);
    const [getDataId] = useLazyQuery(GET_DATA_BY_ID);

    const handleClick = () => {
        getData();
    };

    const getDataById = () => {
        getDataId({
            variables: {
                id: 123,
            },
        });
    };

    if (loading) return <h1>Loading.......</h1>;

    return (
        <>
            <h1>Hello</h1>
            <button onClick={handleClick}>Get Data</button>
            <button onClick={getDataById}>Get Data By Id</button>
        </>
    );
};

export default Test;
