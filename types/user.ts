export type User = {
  id: number;
  username: string;
  email: string;

  first_name: string;
  last_name: string;

  age: number;
  birthday: string;
  job: string;

  country: string;
  city: string;
  sex: string;
  biography: string;

  lat: string | null;
  lon: string | null;
  ip: string | null;

  image: string | null;
};
