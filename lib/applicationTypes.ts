export type YN = "" | "Y" | "N";

export type DependentEntry = { id: string; age: string };
export type MedicationEntry = { id: string; name: string };

export interface ApplicationFormState {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  zipCode: string;
  dob: string;
  gender: "" | "M" | "F";
  maritalStatus: "" | "Single" | "Married";
  hasDependents: YN;
  dependentsCount: string;
  dependentAges: DependentEntry[];
  drugAlcoholHistory: string;
  longestClean: string;
  onProbation: YN;
  probationOfficerName: string;
  probationOfficerPhone: string;
  onMedication: YN;
  medications: MedicationEntry[];
  psychiatricCare: YN;
  validLicense: YN;
}
