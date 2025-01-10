const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json()); // Substitui bodyParser.json()

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: '1421',
  database: 'new_app_db'
});

// Testa a conexão com o banco
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1); // Encerra o servidor em caso de falha na conexão
  } else {
    console.log('Conexão com o banco de dados bem-sucedida!');
  }
});

// Rota para o cadastro
app.post('/signup', (req, res) => {
  const { fullname, email_address, user_password } = req.body;

  // Log para verificar se os dados estão chegando corretamente
  console.log('Dados recebidos no signup:', req.body);

  // Certifique-se de que user_password não está vazio ou undefined
  if (!user_password) {
    console.error('Password is missing in the request body');
    return res.status(400).send('Password is required');
  }

  const hashedPassword = bcrypt.hashSync(user_password, 10);

  const sql = 'INSERT INTO customers (fullname, email_address, user_password) VALUES (?, ?, ?)';
  db.query(sql, [fullname, email_address, hashedPassword], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    } else {
      res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
    }
  });
});

// Rota para login
app.post('/login', (req, res) => {
  const { email_address, user_password } = req.body;

  // Log para verificar se os dados estão chegando corretamente
  console.log('Dados recebidos no login:', req.body);

  const sql = 'SELECT * FROM customers WHERE email_address = ?';
  db.query(sql, [email_address], (err, result) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
    if (result.length === 0) {
      console.error('Usuário não encontrado');
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const user = result[0];
    if (bcrypt.compareSync(user_password, user.user_password)) {
      return res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      return res.status(400).json({ message: 'Senha incorreta' });
    }
  });
});

// Iniciando o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
