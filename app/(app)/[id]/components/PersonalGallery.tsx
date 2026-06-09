import BiggerPersonalCard from "./BiggerPersonalCard";
import ImageCard from "./ImageCard";

export default function PersonalGallery() {
  return (
    <div className="md:h-[calc(100vh-72px)] flex flex-col md:flex-row items-center px-8 md:gap-20">
      <div>
        <BiggerPersonalCard />
      </div>

      <div className="h-full flex-1 py-8">
        <div className="h-full md:overflow-y-auto flex flex-wrap gap-4 justify-center">
          {[...Array(60)].map((_, i) => (
            <ImageCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
