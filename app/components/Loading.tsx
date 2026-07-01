export default function Loading({ width }: { width: number }) {
  return (
    <div className="flex justify-center items-center">
      <div
        style={{ width: `${width}px`, height: `${width}px` }}
        className=" border-8 border-gray-100 border-t-gray-500 rounded-full animate-spin"
      />
    </div>
  );
}
