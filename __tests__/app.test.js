const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('tbi-resources-BE routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('creates a new resource', async () => {
    const resource = {
      title: 'Dark Reader',
      category: 'Accessibility',
      src_description:
        'Dark Reader is an open-source browser extension that allows you to switch any website into dark mode, and gives you the ability to fully configure the theme to your preferences.',
      link: 'https://darkreader.org/',
      logo: 'https://repository-images.githubusercontent.com/26682105/4d22e080-070e-11eb-8930-c69a17260e45',
    };

    const res = await request(app).post('/api/v1/resources').send(resource);

    expect(res.body).toEqual({
      id: '1',
      ...resource,
    });
  });
});
