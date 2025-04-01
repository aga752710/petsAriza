import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';
import generateMockPets from '../utils/mocking.js';
import { logger } from '../utils/logger.js';

const router = Router();

router.get('/',petsController.getAllPets);
router.post('/',petsController.createPet);
router.post('/withimage',uploader.single('image'), petsController.createPetWithImage);
router.put('/:pid',petsController.updatePet);
router.delete('/:pid',petsController.deletePet);

router.get('/loggerTest', (req, res) => {
    logger.debug('Prueba de log nivel debug');
    logger.http('Prueba de log nivel http');
    logger.info('Prueba de log nivel info');
    logger.warning('Prueba de log nivel warning');
    logger.error('Prueba de log nivel error');
    logger.fatal('Prueba de log nivel fatal');
    res.send('Logs de prueba generados');
});

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

export default router;
