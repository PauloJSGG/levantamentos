import EspacoForm from "~/components/forms/espaco";

export default function EspacoNovo({
  params,
}: {
  params: { edificioId: string };
}) {
  return <EspacoForm edificioId={params.edificioId} />;
}
