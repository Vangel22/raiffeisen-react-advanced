import { gql, useQuery } from "@apollo/client";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      emoji
      code
      currency
    }
  }
`;

export const CountriesList = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return (
    <div>
      {data.countries.map((country: any) => (
        <li>
          {country.emoji} {country.name} {country.code} {country.currency}
        </li>
      ))}
    </div>
  );
};
