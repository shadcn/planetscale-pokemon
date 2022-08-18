import { connect } from "@planetscale/database"

export const config = {
  runtime: "experimental-edge",
}

export default async function handler(req: Request) {
  const conn = connect({
    url: process.env["DATABASE_URL"],
  })
  const results = await conn.execute(
    "SELECT * FROM pokemon ORDER BY id LIMIT 0,150"
  )

  const json = JSON.stringify(results.rows)

  return new Response(json, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "access-control-allow-origin": "*",
    },
  })
}
