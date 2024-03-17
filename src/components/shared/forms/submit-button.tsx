"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
  loading: React.ReactNode;
};

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      {pending ? loading : label}
    </button>
  );
};

export { SubmitButton };
