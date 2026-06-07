"use client";
export default function error() {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="p-20 bg-red-900 rounded-2xl">
        <p className="text-3xl text-center">
          There are some errors with your request please try again later
        </p>
      </div>
    </div>
  );
}
