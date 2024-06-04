import EdificioForm from "~/components/forms/edificio";

export default function EdificioNovo({
  params,
}: {
  params: { propostaId: string };
}) {
  return <EdificioForm propostaId={params.propostaId} />;
}
