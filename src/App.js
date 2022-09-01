import logo from './logo.svg';
import { useQuery, gql, useMutation } from '@apollo/client';

import './App.css';

const GET_LOCATIONS = gql`
query MyQuery {
  _helloworld_products {
    id
    name
    price
    description
    image_url
    filename
    hash
  }
}
`;

const ADD_TODO = gql`
  mutation MyMutation($name: String!, $description: String!, $price: String!, $filename: String!, $hash: String!, $image_url: String! ) {
    insert__helloworld_products_one(object: {name: $name, description: $description, price: $price, filename: $filename, hash: $hash, image_url: $image_url }){
      id
      name
    }
  }
`;



function AddTodo() {
  let input;
  const [insert__helloworld_products_one, { data, loading, error }] = useMutation(ADD_TODO);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          insert__helloworld_products_one({ variables: { name: input.value, 
                                                         description: "So cool!",
                                                         price: "0.09",
                                                         filename: "emojis.zip",
                                                         hash: "12345", 
                                                         image_url: "https://cloudflare-ipfs.com/ipfs/QmPGFVBc2ynRfgA1z9M3oZVN8hBySVfHthdBKgFDBSjiRd"
                                                        } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  
  console.log("mydata", data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data._helloworld_products.map(({ id, name, price, description, image_url, filename }) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" alt="image" src={`${image_url}`} />
      <br />
      <b>{description}</b>
      <p>Price: {price}</p>
      <p>filename: {filename}</p>
      <br />
    </div>
  ));

}

function App() {

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br/>
      <AddTodo />
      <DisplayLocations />
    </div>
  );
}

export default App;
