export default function StoryBlock({ story }: { story: string[] }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 space-y-4 text-neutral-800 leading-relaxed">
      {story.map((paragraph, idx) => (
        <p key={idx} className="text-md md:text-lg">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
