
import { query } from './db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cliente_id, nome, descricao, horas_contratadas } = req.body;

    await query(
      `INSERT INTO projetos (cliente_id, nome, descricao, horas_contratadas)
       VALUES ($1, $2, $3, $4)`,
      [cliente_id, nome, descricao, horas_contratadas]
    );

    return res.status(200).json({ message: 'Projeto criado com sucesso' });
  }

  if (req.method === 'GET') {
    const result = await query(`
      SELECT p.*, c.razao_social 
      FROM projetos p
      LEFT JOIN clientes c ON c.id = p.cliente_id
      ORDER BY p.nome ASC
    `);

    return res.status(200).json(result.rows);
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
