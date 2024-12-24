export type User = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  picture: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
};

export type FetchUser = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    medium: string;
  };
  location: {
    country: string;
    city: string;
    street: {
      name: string;
      number: string;
    };
  };
  login: {
    uuid: string;
  };
};

export type Field = {
  label: string;
  id: string;
  placeholder: string;
};
