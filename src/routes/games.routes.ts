import { Router } from 'express';

import { createGameController, deleteGameController, listGamesController, unsubscribeGameController,} from '../controllers/games.controller';
import adminMiddleware from '../middlewares/admin.midleware';
import { authMiddleware } from '../middlewares/auth.midleware';

const gamesRouter = Router();

gamesRouter.post('', authMiddleware, adminMiddleware, createGameController);
gamesRouter.get('', authMiddleware, listGamesController);
gamesRouter.patch('/:id');
gamesRouter.patch('/unsubscribe/:id', authMiddleware, unsubscribeGameController);
gamesRouter.delete('/:id', authMiddleware, adminMiddleware, deleteGameController);
gamesRouter.get('/:id/games');

export default gamesRouter;
