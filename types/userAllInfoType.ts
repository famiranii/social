import { ReportType } from "./reportType";

export type UserAllInfo = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;

  age: number | null;
  birthday: string;

  biography: string;

  city: string;
  country: string;

  job: string;
  sex: string;

  ip: string | null;
  lat: number | null;
  lon: number | null;

  hobbies: string[];

  followers: number;
  following: number;
  logs: unknown[];
  reports: ReportType[];

  like_count: number;
};

type FollowerType = {
  username: string;
};
