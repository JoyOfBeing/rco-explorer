const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL

export async function POST(request) {
  if (!SLACK_WEBHOOK) {
    return Response.json({ error: 'No webhook configured' }, { status: 500 })
  }

  const { data } = await request.json()

  const text = [
    `*New RCO Diagnostic Lead*`,
    `> *Name:* ${data.name || 'Anonymous'}`,
    `> *Email:* ${data.email}`,
    data.org ? `> *Org:* ${data.org}` : null,
    data.guiding_question ? `> *Guiding Question:* ${data.guiding_question}` : null,
    `> *Score:* ${data.score}`,
  ].filter(Boolean).join('\n')

  await fetch(SLACK_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })

  return Response.json({ ok: true })
}
