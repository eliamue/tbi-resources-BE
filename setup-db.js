import pool from './lib/utils/pool.js';
import setup from './data/setup.js';

setup(pool)
  .catch((err) => console.error(err))
  .finally(() => process.exit());
