"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "~/components/shared/forms/submit-button";
import { EMPTY_FORM_STATE } from "~/utils/to-form-state";
import { useToastMessage } from "~/hooks/use-toast-message";
import { FieldError } from "~/components/shared/forms/field-error";
import { useFormReset } from "~/hooks/use-form-reset";

//actions
import { create } from "~/server/actions/espaco";

export default function EspacoForm({ edificioId }: { edificioId: string }) {
  const [formState, action] = useFormState(create, EMPTY_FORM_STATE);

  const noScriptFallback = useToastMessage(formState);
  const formRef = useFormReset(formState);

  return (
    <form action={action} ref={formRef}>
      <div className="mb-4">
        <label
          htmlFor="edificioId"
          className="mb-2 block font-bold text-gray-400"
        >
          Edificio ID
        </label>
        <input
          type="text"
          id="edificioId"
          name="edificioId"
          readOnly={true}
          defaultValue={edificioId}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="designacao"
          className="mb-2 block font-bold text-gray-400"
        >
          Designação
        </label>
        <input
          type="text"
          id="designacao"
          name="designacao"
          defaultValue={""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FieldError formState={formState} name="designacao" />
      </div>
      <div className="mb-4">
        <label
          htmlFor="descricao"
          className="mb-2 block font-bold text-gray-400"
        >
          Descrição
        </label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          defaultValue={""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FieldError formState={formState} name="descricao" />
      </div>
      <div className="mb-4">
        <label
          htmlFor="descricao"
          className="mb-2 block font-bold text-gray-400"
        >
          Pé direito
        </label>
        <input
          type="text"
          id="peDireito"
          name="peDireito"
          defaultValue={""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FieldError formState={formState} name="peDireito" />
      </div>
      <div className="mb-4">
        <label htmlFor="fotos" className="mb-2 block font-bold text-gray-400">
          Fotos
        </label>
        <input
          type="file"
          id="fotosEspaco"
          name="fotosEspaco"
          multiple={true}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <SubmitButton label="Create" loading="Creating ..." />
      {noScriptFallback}
    </form>
  );
}
