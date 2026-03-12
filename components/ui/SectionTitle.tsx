type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <h2 className="text-2xl font-bold text-primary mb-6">
      {title}
    </h2>
  );
}