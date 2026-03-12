/**
 * CraftSynk Submissions Worker
 * Receives project brief submissions, stores in D1, serves admin API.
 *
 * POST  /submit            — public, receives JSON form data
 * GET   /submissions       — admin, returns list (no data blobs)
 * GET   /submissions/:id   — admin, returns full record + marks as read
 * PATCH /submissions/:id   — admin, update status / is_read
 * DELETE/submissions/:id   — admin, delete record
 *
 * Admin routes protected by ?key=ADMIN_KEY or X-API-Key header.
 * Default ADMIN_KEY is "cs-admin-2026" — override via wrangler secret.
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function authorized(request, url, env) {
  const key = url.searchParams.get('key') || request.headers.get('x-api-key');
  return key === (env.ADMIN_KEY || 'cs-admin-2026');
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // ── POST /submit ──────────────────────────────────────────────────────
      if (path === '/submit' && request.method === 'POST') {
        const data = await request.json();
        const id = crypto.randomUUID();
        const timestamp = new Date().toISOString();

        // Extract top-level fields for list queries
        const company     = (data['─ Q1 Company']      || '').trim() || 'Unknown Company';
        const email       = (data['Email']              || '').trim();
        const phone       = (data['Phone']              || '').trim();
        const budget      = (data['─ Q17 Budget']       || '').trim();
        const deliverables= (data['─ Q4b Deliverables'] || '').trim();

        await env.DB.prepare(`
          INSERT INTO submissions
            (id, timestamp, company, email, phone, budget, deliverables, status, is_read, data)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'new', 0, ?)
        `).bind(id, timestamp, company, email, phone, budget, deliverables, JSON.stringify(data)).run();

        return json({ success: true, id });
      }

      // ── Admin guard ───────────────────────────────────────────────────────
      if (!authorized(request, url, env)) {
        return json({ error: 'Unauthorized' }, 401);
      }

      // ── GET /submissions ──────────────────────────────────────────────────
      if (path === '/submissions' && request.method === 'GET') {
        const { results } = await env.DB.prepare(
          'SELECT id, timestamp, company, email, phone, budget, deliverables, status, is_read FROM submissions ORDER BY timestamp DESC'
        ).all();

        const total   = results.length;
        const unread  = results.filter(r => r.is_read === 0).length;
        const newCount = results.filter(r => r.status === 'new').length;

        return json({ submissions: results, total, unread, newCount });
      }

      // ── /submissions/:id ──────────────────────────────────────────────────
      const match = path.match(/^\/submissions\/([a-f0-9-]{36})$/);
      if (match) {
        const id = match[1];

        if (request.method === 'GET') {
          const row = await env.DB.prepare('SELECT * FROM submissions WHERE id = ?').bind(id).first();
          if (!row) return json({ error: 'Not found' }, 404);
          await env.DB.prepare('UPDATE submissions SET is_read = 1 WHERE id = ?').bind(id).run();
          row.data = JSON.parse(row.data);
          return json(row);
        }

        if (request.method === 'PATCH') {
          const body = await request.json();
          if (body.status !== undefined) {
            await env.DB.prepare('UPDATE submissions SET status = ? WHERE id = ?').bind(body.status, id).run();
          }
          if (body.is_read !== undefined) {
            await env.DB.prepare('UPDATE submissions SET is_read = ? WHERE id = ?').bind(body.is_read ? 1 : 0, id).run();
          }
          return json({ success: true });
        }

        if (request.method === 'DELETE') {
          await env.DB.prepare('DELETE FROM submissions WHERE id = ?').bind(id).run();
          return json({ success: true });
        }
      }

      return new Response('Not found', { status: 404, headers: CORS });

    } catch (err) {
      return json({ error: err.message }, 500);
    }
  },
};
