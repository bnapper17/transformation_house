export const inputClass =
  "w-full rounded-md border border-primary/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary";
export const labelClass = "block text-sm font-medium text-primary mb-1";

export function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <span className="text-secondary"> *</span>}
      </label>
      {children}
    </div>
  );
}
