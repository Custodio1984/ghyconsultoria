
import { query } from './db.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, email, senha, nivel } = req.body;

    const hash = await bcrypt.hash(senha, 10);

    await query(
      `INSERT INTO users (nome, email, senha, nivel) VALUES ($1, $2, $3, $4)`,
      [nome, email, hash, nivel]
    );

    return res.status(200).json({ message: 'Usuário criado com sucesso' });
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
