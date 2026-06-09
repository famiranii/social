import PersonalCard from "../components/Home/PersonalCard";
import { getUsers } from "../components/lib/api";

export default async function Home() {
  // const data = await getUsers();
  // console.log(data);

  return (
    <div className=" font-sans p-8">
      <div className="flex flex-wrap gap-6 justify-center">
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
        <PersonalCard />
      </div>
    </div>
  );
}
