const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.register = async (req, res) => {
  //extração dos dados do corpo da requisição.
  const { username, email, password } = req.body;

  //Validação Simples: Verifica se todos os campos necessários foram fornecidos. Se algum campo estiver faltando, a função retorna uma resposta de erro com status HTTP 400 (Bad Request).
  if (!username || !email || !password) {
  }

  //Verifica se o usuário já existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: "Usuário já existe!" });
  }

  //Hash da Senha: Primeiro, gera um "salt" usando bcrypt.genSalt. O "salt" é um valor aleatório que é combinado com a senha original para criar a hash final, tornando as hashes de senha mais seguras. Então, usa bcrypt.hash para criar uma hash da senha fornecida pelo usuário, usando o salt gerado.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ msg: "Usuário criado com sucesso." });

  
};
