import * as crypto from "node:crypto";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const verifySignature = async (req: Request) => {
	if (WEBHOOK_SECRET) {
		const signature = crypto
			.createHmac("sha256", WEBHOOK_SECRET)
			.update(await req.json())
			.digest("hex");
		const trusted = Buffer.from(`sha256=${signature}`, "ascii");
		const untrusted = Buffer.from(
			req.headers.get("x-hub-signature-256") || "",
			"ascii",
		);
		return crypto.timingSafeEqual(trusted, untrusted);
	}
};

export async function GET() {
	return new Response("Hello there!");
}

export async function POST(req: Request) {
	const trusted = await verifySignature(req);
	if (!trusted) {
		return new Response("Unauthorised", { status: 401 });
	}
}
