type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {children}
    </div>
  );
}