
import { query } from './db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      cliente_id,
      projeto_id,
      atendente_id,
      hora_inicio,
      hora_fim,
      horas_apontadas,
      atividades
    } = req.body;

    await query(
      `INSERT INTO ordens_servico 
        (cliente_id, projeto_id, atendente_id, hora_inicio, hora_fim, horas_apontadas, atividades)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        cliente_id,
        projeto_id,
        atendente_id,
        hora_inicio,
        hora_fim,
        horas_apontadas,
        atividades
      ]
    );

    return res.status(200).json({ message: 'OS registrada com sucesso' });
  }

  if (req.method === 'GET') {
    const result = await query(`
      SELECT os.*, 
             c.razao_social AS cliente,
             p.nome AS projeto,
             u.nome AS atendente
      FROM ordens_servico os
      LEFT JOIN clientes c ON c.id = os.cliente_id
      LEFT JOIN projetos p ON p.id = os.projeto_id
      LEFT JOIN users u ON u.id = os.atendente_id
      ORDER BY os.id DESC
    `);

    return res.status(200).json(result.rows);
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
