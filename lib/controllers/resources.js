import { Router } from 'express';
import Resources from '../models/Resources.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const resource = await Resources.createResource(req.body);

      res.send(resource);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const resource = await Resources.getAllResources();

      res.send(resource);
    } catch (error) {
      next(error);
    }
  });
