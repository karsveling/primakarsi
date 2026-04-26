import { sql } from "@vercel/postgres";

export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS klussen (
      id           SERIAL PRIMARY KEY,
      category     TEXT,
      omschrijving TEXT NOT NULL,
      foto_urls    JSONB DEFAULT '[]'::jsonb,
      naam         TEXT NOT NULL,
      telefoon     TEXT NOT NULL,
      email        TEXT NOT NULL,
      straat       TEXT NOT NULL,
      huisnummer   TEXT,
      postcode     TEXT NOT NULL,
      stad         TEXT NOT NULL,
      created_at   TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  // Migrate foto_urls from TEXT[] to JSONB if the table was created with old schema
  try {
    await sql`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name='klussen' AND column_name='foto_urls' AND udt_name='_text'
        ) THEN
          ALTER TABLE klussen ALTER COLUMN foto_urls TYPE JSONB USING to_jsonb(foto_urls);
        END IF;
      END $$;
    `;
  } catch (_) {
    // ignore migration errors
  }
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
  const fotoUrlsJson = JSON.stringify(data.fotoUrls ?? []);
  const result = await sql`
    INSERT INTO klussen
      (category, omschrijving, foto_urls, naam, telefoon, email, straat, huisnummer, postcode, stad)
    VALUES
      (${data.category ?? null},
       ${data.omschrijving},
       ${fotoUrlsJson}::jsonb,
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
