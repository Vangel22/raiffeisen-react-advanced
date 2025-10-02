import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const ADD_COUNTRY = gql`
  mutation AddCountry($code: String!, $name: String!, $emoji: String!) {
    addCountry(code: $code, name: $name, emoji: $emoji) {
      code
      name
      emoji
    }
  }
`;

export const AddCountryForm = () => {
  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [emoji, setEmoji] = useState();

  const [addCountry, { data, loading, error }] = useMutation(ADD_COUNTRY);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    addCountry({
      variables: { code, name, emoji },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <input
        placeholder="Code"
        value={code}
        onChange={(e: any) => setCode(e.target.value)}
      />
      <input
        placeholder="Emoji"
        value={emoji}
        onChange={(e: any) => setEmoji(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
