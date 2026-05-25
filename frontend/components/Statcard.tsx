type StatCardProps = {
  title: string;
  value: string | number;
  suffix?: string;
  icon?: string;
};

export default function Statcard({ title, value, suffix = "", icon }: StatCardProps) {
  const getIconColor = (title: string) => {
    if (title.includes("Income")) return "#10b981";
    if (title.includes("Expense")) return "#ef4444";
    if (title.includes("Balance")) return "#6366f1";
    if (title.includes("Budget")) return "#f59e0b";
    return "#6366f1";
  };

  const iconColor = getIconColor(title);

  return (
    <div className="stat-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <p className="text-muted">{title}</p>
          <h3 style={{ color: iconColor }}>
            {value} <span style={{ fontSize: "0.6em", color: "var(--neutral-500)" }}>{suffix}</span>
          </h3>
        </div>
        {icon && (
          <div
            style={{
              fontSize: "2.5rem",
              opacity: 0.15,
              marginLeft: "16px",
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
