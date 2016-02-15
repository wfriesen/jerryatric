import { Router } from 'express';
import fetch from '../core/fetch';
import escapeElastic from 'elasticsearch-sanitize';

const router = new Router();

router.get('/', async (req, res, next) => {
  const q = encodeURIComponent(escapeElastic(req.query.q));
  if (q.length === 0) {
    res.status(200).send({ results: [] });
  } else {
    try {
      const searchUrl = 'http://localhost:9200/jerryatric/_search?q=text:' + q;
      const response = await fetch(searchUrl);
      const content = await response.json();
      const results = content.hits.hits.map(function getResultObject(hit) {
        return hit._source;
      });
      res.status(200).send({ results });
    } catch (err) {
      next(err);
    }
  }
});

export default router;
