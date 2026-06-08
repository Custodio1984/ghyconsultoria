
import { query } from './db.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, senha } = req.body;

    const result = await query(
      `SELECT * FROM users WHERE email = $1 AND ativo = TRUE`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(senha, user.senha);

    if (!valid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    return res.status(200).json({
      id: user.id,
      nome: user.nome,
      nivel: user.nivel
    });
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
