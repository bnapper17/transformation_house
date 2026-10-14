export const inputClass =
  "w-full rounded-md border border-primary/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary";
export const labelClass = "block text-sm font-medium text-primary mb-1";

// Wrapping the control in the <label> associates the two without needing ids.
// Use `group` for radio sets or multi-control fields: a <label> can only
// target one control, so those get a <fieldset>/<legend> instead.
export function Field({
  label,
  required,
  group,
  children,
}: {
  label: string;
  required?: boolean;
  group?: boolean;
  children: React.ReactNode;
}) {
  const labelText = (
    <>
      {label}
      {required && <span className="text-secondary"> *</span>}
    </>
  );

  if (group) {
    return (
      <fieldset>
        <legend className={labelClass}>{labelText}</legend>
        {children}
      </fieldset>
    );
  }

  return (
    <label className="block">
      <span className={labelClass}>{labelText}</span>
      {children}
    </label>
  );
}
