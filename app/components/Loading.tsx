export default function Loading({ width }: { width: number }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        style={{ width: `${width}px`, height: `${width}px` }}
        className=" border-8 border-gray-100 border-t-pink-500 rounded-full animate-spin"
      />
    </div>
  );
}
