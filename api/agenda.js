
import { query } from './db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { atendente_id, cliente_id, projeto_id, data, hora, status } = req.body;

    await query(
      `INSERT INTO agenda (atendente_id, cliente_id, projeto_id, data, hora, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [atendente_id, cliente_id, projeto_id, data, hora, status]
    );

    return res.status(200).json({ message: 'Agenda registrada com sucesso' });
  }

  if (req.method === 'GET') {
    const result = await query(`
      SELECT a.*, 
             u.nome AS atendente,
             c.razao_social AS cliente,
             p.nome AS projeto
      FROM agenda a
      LEFT JOIN users u ON u.id = a.atendente_id
      LEFT JOIN clientes c ON c.id = a.cliente_id
      LEFT JOIN projetos p ON p.id = a.projeto_id
      ORDER BY a.data ASC, a.hora ASC
    `);

    return res.status(200).json(result.rows);
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
