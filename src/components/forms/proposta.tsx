"use client";

import { useFormState } from "react-dom";
import { useFormReset } from "~/hooks/use-form-reset";
import { useToastMessage } from "~/hooks/use-toast-message";
import { create } from "~/server/actions/proposta";
import { EMPTY_FORM_STATE } from "~/utils/to-form-state";
import { FieldError } from "../shared/forms/field-error";
import { SubmitButton } from "../shared/forms/submit-button";

export default function PropostaForm() {
  const [formState, action] = useFormState(create, EMPTY_FORM_STATE);

  const noScriptFallback = useToastMessage(formState);
  const formRef = useFormReset(formState);

  return (
    <form action={action} ref={formRef}>
      <div className="flex gap-2">
        <input
          type="text"
          id="id"
          name="id"
          placeholder="PXXXX.XXXX"
          className="h-12 rounded-md border border-gray-300 text-black"
        />
        <FieldError formState={formState} name="id" />
        <SubmitButton label="Submeter" loading="Criando..." />
        {noScriptFallback}
      </div>
    </form>
  );
}
