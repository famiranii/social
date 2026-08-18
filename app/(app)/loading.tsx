import Loading from "../components/Loading";


export default function loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loading width={60}/>
    </div>
  );
}
