type StatCardProps = {
  title: string;
  value: string | number;
  suffix?: string;
};

export default function Statcard({ title, value, suffix = "" }: StatCardProps) {
  return (
    <div className="stat-card">
      <p className="text-muted">{title}</p>
      <h3>
        {value} {suffix}
      </h3>
    </div>
  );
}