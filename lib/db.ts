import { sql } from "@vercel/postgres";

export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS klussen (
      id          SERIAL PRIMARY KEY,
      category    TEXT,
      omschrijving TEXT NOT NULL,
      foto_urls   TEXT[],
      naam        TEXT NOT NULL,
      telefoon    TEXT NOT NULL,
      email       TEXT NOT NULL,
      straat      TEXT NOT NULL,
      huisnummer  TEXT,
      postcode    TEXT NOT NULL,
      stad        TEXT NOT NULL,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

export interface KlusData {
  category?: string;
  omschrijving: string;
  fotoUrls?: string[];
  naam: string;
  telefoon: string;
  email: string;
  straat: string;
  huisnummer?: string;
  postcode: string;
  stad: string;
}

export async function insertKlus(data: KlusData) {
  await ensureTable();
  const result = await sql`
    INSERT INTO klussen
      (category, omschrijving, foto_urls, naam, telefoon, email, straat, huisnummer, postcode, stad)
    VALUES
      (${data.category ?? null},
       ${data.omschrijving},
       ${data.fotoUrls ? JSON.stringify(data.fotoUrls) : null}::text[],
       ${data.naam},
       ${data.telefoon},
       ${data.email},
       ${data.straat},
       ${data.huisnummer ?? null},
       ${data.postcode},
       ${data.stad})
    RETURNING id;
  `;
  return result.rows[0].id as number;
}
