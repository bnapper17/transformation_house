import { HONEYPOT_FIELD } from "@/lib/honeypot";

// Kept off-screen rather than display:none, since some bots skip hidden
// inputs. aria-hidden and tabIndex keep it away from keyboard and
// screen-reader users; autoComplete stops browsers filling it in.
export default function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
