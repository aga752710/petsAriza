import { Router } from 'express';
import generateMockPets from '../utils/mocking.js';
import generateMockUsers from '../utils/mockingUsers.js';
import { UserModel } from '../dao/models/user.model.js';
import { PetModel } from '../dao/models/pet.model.js';
import { logger } from '../utils/logger.js';

const router = Router();


router.get('/mockingpets', (req, res) => {
    try {
        const mockPets = generateMockPets(100);
        logger.info('Mascotas mock generadas exitosamente');
        res.status(200).json(mockPets);
    } catch (error) {
        logger.error(`Error al generar mascotas mock: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});


router.get('/mockingusers', (req, res) => {
    try {
        const mockUsers = generateMockUsers(50);
        logger.info('Usuarios mock generados exitosamente');
        res.status(200).json(mockUsers);
    } catch (error) {
        logger.error(`Error al generar usuarios mock: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});


router.post('/generateData', async (req, res) => {
    try {
        
        if (!req.body || typeof req.body.users === 'undefined' || typeof req.body.pets === 'undefined') {
            return res.status(400).json({ 
                error: 'Se requieren los parámetros users y pets en el body' 
            });
        }

        const { users, pets } = req.body;

        
        if (!Number.isInteger(users) || !Number.isInteger(pets) || users < 0 || pets < 0) {
            return res.status(400).json({ 
                error: 'Los parámetros users y pets deben ser números enteros positivos' 
            });
        }

        
        const mockUsers = generateMockUsers(users);
        const mockPets = generateMockPets(pets);

        await UserModel.insertMany(mockUsers);
        await PetModel.insertMany(mockPets);

        logger.info(`Datos generados: ${users} usuarios y ${pets} mascotas`);
        
        res.status(201).json({
            status: 'success',
            message: 'Datos generados e insertados correctamente',
            generated: {
                users,
                pets
            }
        });
    } catch (error) {
        logger.error(`Error al generar datos: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

export default router;