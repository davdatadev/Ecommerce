import bcrypt from 'bcrypt';

// Para crear un hash de la contraseña
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Para validar la contraseña ingresada con la almacenada
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
