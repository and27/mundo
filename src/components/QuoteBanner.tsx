// components/QuoteBanner.tsx
type QuoteBannerProps = {
  text: string;
  author?: string;
};

const QuoteBanner = ({ text, author }: QuoteBannerProps) => {
  return (
    <div className="bg-white/10 text-white text-center rounded-xl p-4 my-6 mx-auto max-w-md shadow-md backdrop-blur">
      <p className="italic text-lg">“{text}”</p>
      {author && <p className="text-sm mt-2 text-white/60">— {author}</p>}
    </div>
  );
};

export default QuoteBanner;
