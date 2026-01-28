interface FacilityCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const FacilityCard = ({ title, description, imageUrl }: FacilityCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="w-full aspect-video rounded-xl bg-cover bg-center shadow-sm bg-muted"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
        role="img"
        aria-label={title}
      />
      <div>
        <p className="font-bold text-lg text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default FacilityCard;
