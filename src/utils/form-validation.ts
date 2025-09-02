import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type InputProps = {
  placeholder?: string;
};

export const formValidation: Record<
  string,
  RegisterOptions & { inputProps?: InputProps }
> = {
  firstName: {
    required: { value: true, message: "Firstname required" },
    minLength: { value: 2, message: "Min 2 characters" },
  },
  lastName: {
    required: { value: true, message: "Lastname required" },
    minLength: { value: 2, message: "Min 2 characters" },
  },
  username: {
    required: { value: true, message: "Username required" },
    minLength: { value: 3, message: "Min 3 characters" },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers, and underscores",
    },
  },
  email: {
    required: { value: true, message: "E-Mail required" },
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid E-Mail" },
  },
  password: {
    required: { value: true, message: "Password required" },
    minLength: { value: 6, message: "Min 6 characters" },
  },
  phone: {
    required: { value: false, message: "Phone required" },
    pattern: {
      value: /^\+?[1-9]\d{1,14}$/,
      message: "Invalid phone number",
    },
    inputProps: {
      placeholder: "+1234567890",
    },
  },
  title: {
    required: { value: true, message: "Title required" },
    minLength: { value: 3, message: "Min 3 characters" },
  },
  description: {
    required: { value: false, message: "Description required" },
    minLength: { value: 3, message: "Min 3 characters" },
  },
  location: {
    required: { value: false, message: "Location required" },
    minLength: { value: 3, message: "Min 3 characters" },
  },
  startDate: {
    required: { value: true, message: "Start date required" },
    validate: (value: string) => {
      if (!value) return "Start date required";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "Invalid start date";
      return true;
    },
  },
  endDate: {
    required: { value: true, message: "End date required" },
    validate: (value: string, formValues: Record<string, unknown>) => {
      if (!value) return "End date required";
      const endDate = new Date(value);
      if (Number.isNaN(endDate.getTime())) return "Invalid end date";

      if (formValues.startDate && typeof formValues.startDate === "string") {
        const startDate = new Date(formValues.startDate);
        if (endDate <= startDate) {
          return "End date must be after start date";
        }
      }
      return true;
    },
  },
};

type FormValidation = typeof formValidation;

export function withDefaultRules<
  T extends FieldValues,
  K extends Path<T> & keyof FormValidation
>(register: UseFormRegister<T>, key: K) {
  return {
    ...register(key, formValidation[key] as RegisterOptions<T, K> | undefined),
    ...(formValidation[key].inputProps || {}),
  };
}
