import PersonalCard from "../components/Home/PersonalCard";
import { getUsers } from "../components/lib/api";

export default async function Home() {
  const data = await getUsers();
  console.log(data);

  return (
    <div className=" font-sans">
      <div className="p-8 flex flex-wrap">
        <PersonalCard />
      </div>
    </div>
  );
}
