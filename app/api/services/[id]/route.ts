type ReqOptions = { params: { id: string } };

const getNumberBetween = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

export async function GET(req: Request, { params }: ReqOptions) {
  if (getNumberBetween(1, 10) > 5) {
    return new Response("Unavailable", { status: 503 });
  }
  return new Response("OK", { status: 200 });
}
