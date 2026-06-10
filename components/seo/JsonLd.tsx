type Props = {
  data: Record<string, unknown>[];
};

export function JsonLd({ data }: Props) {
  return (
    <>
      {data.map((graph, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}
