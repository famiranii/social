import BiggerPersonalCard from "./BiggerPersonalCard";
import ImageCard from "./ImageCard";

export default function PersonalGallery() {
  return (
    <div className="h-[calc(100vh-72px)] flex items-center px-8 gap-20">
      <div>
        <BiggerPersonalCard />
      </div>

      <div className="h-full flex-1 py-8">
        <div className="h-full overflow-y-auto flex flex-wrap gap-4">
          {[...Array(60)].map((_, i) => (
            <ImageCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
