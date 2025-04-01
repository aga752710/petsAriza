const tiposMascota = ['Perro', 'Gato', 'Pájaro', 'Conejo', 'Hamster'];

const generateMockPets = (num) => {
    if (!Number.isInteger(num) || num < 0) {
        throw new Error('El número de mascotas debe ser un entero positivo');
    }

    const pets = [];
    for (let i = 0; i < num; i++) {
        pets.push({
            id: i + 1,
            nombre: `Mascota${i + 1}`,
            edad: Math.floor(Math.random() * 15),
            tipo: tiposMascota[Math.floor(Math.random() * tiposMascota.length)],
            adoptado: Math.random() > 0.5,
            propietario: null
        });
    }
    return pets;
};

export default generateMockPets;