import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Resources from '../lib/models/Resources.js';

describe('tbi-resources-BE routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('Creates a new tbi resource', async () => {
    const resource = {
      title: 'Dark Reader',
      category: 'Accessibility',
      about:
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

  it('gets all resources', async () => {
    const resource1 = await Resources.createResource({
      title: 'Dark Reader',
      category: 'Accessibility',
      about:
        'Dark Reader is an open-source browser extension that allows you to switch any website into dark mode, and gives you the ability to fully configure the theme to your preferences.',
      link: 'https://darkreader.org/',
      logo: 'https://repository-images.githubusercontent.com/26682105/4d22e080-070e-11eb-8930-c69a17260e45',
    });

    const resource2 = await Resources.createResource({
      title: 'f.lux',
      category: 'Accessibility',
      about:
        'F.lux is eye-care software that adapts the color of your computer display based on the time of day, for reducing eye-strain. Color filtering can also be applied always, regardless of time of day.',
      link: 'https://justgetflux.com/',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/F.lux_logo.svg/1200px-F.lux_logo.svg.png',
    });

    const resource3 = await Resources.createResource({
      title: 'Brain Injury Alliance',
      category: 'Advocacy',
      about:
        'The mission of the Brain Injury Alliance is to raise awareness and enhance the quality of life for all people affected by brain injury. State chapter of BIA provide resource facilitation, education, outreach, events, case management, and many other resources for living with TBI.',
      link: 'https://usbia.org/',
      logo: 'https://usbia.org/wp-content/uploads/2015/10/USBIA-Logo.png',
    });

    const res = await request(app).get('/api/v1/resources');

    expect(res.body).toEqual([
      resource1,
      resource2,
      resource3
    ]);
  });

  it('gets one resource by id', async () => {
    const resource = await Resources.createResource({
      title: 'Brain Injury Alliance',
      category: 'Advocacy',
      about:
        'The mission of the Brain Injury Alliance is to raise awareness and enhance the quality of life for all people affected by brain injury. State chapter of BIA provide resource facilitation, education, outreach, events, case management, and many other resources for living with TBI.',
      link: 'https://usbia.org/',
      logo: 'https://usbia.org/wp-content/uploads/2015/10/USBIA-Logo.png',
    });

    const res = await request(app).get(`/api/v1/resources/${resource.id}`);

    expect(res.body).toEqual(resource);
  });

  it('updates a resource', async () => {
    const resource = await Resources.createResource({
      title: 'Brain Injury Alliance',
      category: 'Advocacy',
      about:
        'The mission of the Brain Injury Alliance is to raise awareness and enhance the quality of life for all people affected by brain injury. State chapter of BIA provide resource facilitation, education, outreach, events, case management, and many other resources for living with TBI.',
      link: 'https://usbia.org/',
      logo: 'https://usbia.org/wp-content/uploads/2015/10/USBIA-Logo.png',
    });

    const res = await request(app)
      .put(`/api/v1/resources/${resource.id}`)
      .send({
        title: 'Minnesota Brain Injury Alliance',
        category: 'Advocacy',
        about:
          'The mission of the Brain Injury Alliance is to raise awareness and enhance the quality of life for all people affected by brain injury. Minnesota of BIA provide resource facilitation, education, outreach, events, case management, and many other resources for living with TBI.',
        link: 'https://www.braininjurymn.org/',
        logo: 'https://www.braininjurymn.org/assets/graphics/mnbia-logo.gif',
      });
    expect(res.body).toEqual({
      ...resource,
      title: 'Minnesota Brain Injury Alliance',
      about:
        'The mission of the Brain Injury Alliance is to raise awareness and enhance the quality of life for all people affected by brain injury. Minnesota of BIA provide resource facilitation, education, outreach, events, case management, and many other resources for living with TBI.',
      link: 'https://www.braininjurymn.org/',
      logo: 'https://www.braininjurymn.org/assets/graphics/mnbia-logo.gif',
    });
  });

    it('deletes a specific existing resource', async () => {
      const resource = await Resources.createResource({
        title: 'Minnesota Brain Injury Alliance',
        category: 'Advocacy',
        about:
          'The mission of the Brain Injury Alliance is to raise awareness and enhance the quality of life for all people affected by brain injury. Minnesota of BIA provide resource facilitation, education, outreach, events, case management, and many other resources for living with TBI.',
        link: 'https://www.braininjurymn.org/',
        logo: 'https://www.braininjurymn.org/assets/graphics/mnbia-logo.gif',
      });

      const res = await request(app).delete(`/api/v1/resources/${resource.id}`);

      expect(res.body).toEqual({
        message: `You have deleted ${resource.src_name}.`,
      });
    });
});
