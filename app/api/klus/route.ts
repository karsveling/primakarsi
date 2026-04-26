import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { insertKlus } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // — Upload foto's naar Vercel Blob ————————————————————————
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

    // — Sla klus op in Postgres ————————————————————————————
    const category  = formData.get("category") as string | undefined;
    const omschrijving = formData.get("omschrijving") as string;
    const naam      = formData.get("naam") as string;
    const telefoon  = formData.get("telefoon") as string;
    const email     = formData.get("email") as string;
    const straat    = formData.get("straat") as string;
    const huisnummer = formData.get("huisnummer") as string | undefined;
    const postcode  = formData.get("postcode") as string;
    const stad      = formData.get("stad") as string;

    const id = await insertKlus({
      category,
      omschrijving,
      fotoUrls,
      naam,
      telefoon,
      email,
      straat,
      huisnummer: huisnummer ?? undefined,
      postcode,
      stad,
    });

    // — Stuur email notificatie ————————————————————————————
    try {
      await resend.emails.send({
        from: "Primakarsi <noreply@etalage.io>",
        to: "kars@karsveling.com",
        subject: `Nieuwe klus van ${naam}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #111; border-bottom: 2px solid #f59e0b; padding-bottom: 8px;">
              🔨 Nieuwe klusaanvraag #${id}
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 130px;"><strong>Naam</strong></td>
                <td style="padding: 8px 0;">${naam}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Telefoon</strong></td>
                <td style="padding: 8px 0;">${telefoon}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Adres</strong></td>
                <td style="padding: 8px 0;">${straat} ${huisnummer || ""}, ${postcode} ${stad}</td>
              </tr>
              ${category ? `<tr>
                <td style="padding: 8px 0; color: #666;"><strong>Categorie</strong></td>
                <td style="padding: 8px 0;">${category}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Omschrijving</strong></td>
                <td style="padding: 8px 0;">${omschrijving}</td>
              </tr>
              ${fotoUrls.length > 0 ? `<tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Foto's</strong></td>
                <td style="padding: 8px 0;">${fotoUrls.map(url => `<a href="${url}">${url.split("/").pop()}</a>`).join("<br>")}</td>
              </tr>` : ""}
            </table>
          </div>
        `,
      });
    } catch (emailErr) {
      // Email mislukken mag de aanvraag niet blokkeren
      console.error("[/api/klus] email error:", emailErr);
    }

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("[/api/klus] error:", err);
    return NextResponse.json(
      { success: false, error: "Er ging iets mis. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}
