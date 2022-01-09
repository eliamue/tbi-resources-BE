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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const resource = await Resources.getById(id);

      res.send(resource);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, category, about, link, logo } = req.body;

      const updatedResource = await Resources.update(id, {
        title,
        category,
        about,
        link,
        logo,
      });

      res.send(updatedResource);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const resource = await Resources.delete(id);

      res.send({
        message: `You have deleted ${resource.src_name}.`,
      });
    } catch (err) {
      next(err);
    }
  });
