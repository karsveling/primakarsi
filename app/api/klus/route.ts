import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { insertKlus } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // ── Upload foto's naar Vercel Blob ────────────────────────────────────
    const fotoFiles = formData.getAll("fotos") as File[];
    const fotoUrls: string[] = [];

    for (const file of fotoFiles) {
      if (file.size > 0) {
        const blob = await put(`klussen/${Date.now()}-${file.name}`, file, {
          access: "public",
        });
        fotoUrls.push(blob.url);
      }
    }

    // ── Sla klus op in Postgres ───────────────────────────────────────────
    const id = await insertKlus({
      category: formData.get("category") as string | undefined,
      omschrijving: formData.get("omschrijving") as string,
      fotoUrls,
      naam: formData.get("naam") as string,
      telefoon: formData.get("telefoon") as string,
      email: formData.get("email") as string,
      straat: formData.get("straat") as string,
      huisnummer: formData.get("huisnummer") as string | undefined,
      postcode: formData.get("postcode") as string,
      stad: formData.get("stad") as string,
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("[/api/klus] error:", err);
    return NextResponse.json(
      { success: false, error: "Er ging iets mis. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}
