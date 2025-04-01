import bcrypt from 'bcrypt';

const generateMockUsers = (num) => {
    if (!Number.isInteger(num) || num < 0) {
        throw new Error('El número de usuarios debe ser un entero positivo');
    }

    const hashedPassword = bcrypt.hashSync('coder123', 10);
    const users = [];

    for (let i = 0; i < num; i++) {
        users.push({
            first_name: `Usuario${i + 1}`,
            last_name: `Apellido${i + 1}`,
            email: `usuario${i + 1}@mail.com`,
            password: hashedPassword,
            role: Math.random() > 0.5 ? 'user' : 'admin',
            pets: []
        });
    }

    return users;
};

export default generateMockUsers;