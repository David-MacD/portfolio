import * as crypto from "node:crypto";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const signatureHeader = "x-signature-256";

const verifySignature = async (req: Request) => {
  if (WEBHOOK_SECRET) {
    const body = await req.text();
    console.log("body :", body);
    const signature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(body)
      .digest("hex");
    const trusted = Buffer.from(`sha256=${signature}`, "ascii");
    const untrusted = Buffer.from(
      req.headers.get(signatureHeader) || "",
      "ascii"
    );

    console.log("trusted   :", `sha256=${signature}`);
    console.log("untrusted :", req.headers.get(signatureHeader));

    return (
      trusted.length === untrusted.length &&
      crypto.timingSafeEqual(trusted, untrusted)
    );
  }
  return false;
};

export async function GET() {
  return new Response("Hello there!");
}

export async function POST(req: Request) {
  const trusted = await verifySignature(req);
  if (!trusted) {
    return new Response("Unauthorised", { status: 401 });
  }
  return new Response("Authorised!", { status: 200 });
}
