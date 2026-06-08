
import { query } from './db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { razao_social, cnpj, endereco, cidade, telefone, email } = req.body;

    await query(
      `INSERT INTO clientes (razao_social, cnpj, endereco, cidade, telefone, email)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [razao_social, cnpj, endereco, cidade, telefone, email]
    );

    return res.status(200).json({ message: 'Cliente cadastrado com sucesso' });
  }

  if (req.method === 'GET') {
    const result = await query(`SELECT * FROM clientes ORDER BY razao_social ASC`);
    return res.status(200).json(result.rows);
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
