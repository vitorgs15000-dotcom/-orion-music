type CoverArtProps = {
  variant: string;
  imageUrl?: string;
  className?: string;
};

export function CoverArt({ variant, imageUrl, className = "" }: CoverArtProps) {
  if (imageUrl) {
    return (
      <div
        aria-hidden="true"
        className={`cover-art ${className}`}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5, 7, 18, 0.05), rgba(5, 7, 18, 0.38)), url(${imageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      />
    );
  }

  return <div className={`cover-art ${variant} ${className}`} aria-hidden="true" />;
}
