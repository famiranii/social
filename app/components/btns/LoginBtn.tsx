import Loading from "../Loading";

type Props = {
  children: React.ReactNode;
  loading?: boolean;
};

export default function LoginBtn({ children, loading }: Props) {
  return (
    <button
      disabled={loading}
      className="cursor-pointer w-11/12 border h-12 rounded-lg bg-linear-to-r from-blue-500 via-pink-500 to-purple-500 disabled:opacity-60 flex items-center justify-center"
    >
      {loading ? <Loading width={30} /> : children}
    </button>
  );
}
