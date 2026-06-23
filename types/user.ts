export type User = {
  id: number;
  username: string;
  email: string;

  first_name: string;
  last_name: string;

  age: number | null;
  birthday: string | null;
  job: string | null;

  country: string;
  city: string;
  sex: string | null;
  biography: string;

  lat: string | null;
  lon: string | null;
  ip: string | null;

  image: string | null;
};
