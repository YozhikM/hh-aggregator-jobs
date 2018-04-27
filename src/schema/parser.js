/* @flow */

const fetch = require('node-fetch');
const chalk = require('chalk');
const initDB = require('../mongo');
const { Job } = require('.');
const removeExpiredJobs = require('./removeExpired');

initDB();

async function upsertDesc(job) {
  const { id } = job || {};

  const response = await fetch(`https://api.hh.ru/vacancies/${id}`);
  const { schedule, description, experience, employment, address } = await response.json();
  const { lat, lng } = address || {};

  return { description, schedule, experience, employment, lat, lng };
}

async function upsertToDB(job, area) {
  const { description, schedule, employment, experience, lat, lng } = await upsertDesc(job);

  const newJob = new Job({
    ...job,
    area,
    description,
    schedule,
    employment,
    experience,
    coords: { lat, lng },
  });

  await Job.insertMany(newJob, err => {
    if (err) console.error(err);
  });

  return job;
}

async function getFetchData(page, area) {
  const response = await fetch(
    `https://api.hh.ru/vacancies?text=frontend+javascript&area=${area}&per_page=10&page=${page}&order_by=publication_time`
  );
  const result = await response.json();

  return result;
}

const areas = [
  { id: 3, value: 'Yekaterinburg' },
  { id: 4, value: 'Novosibirsk' },
  { id: 66, value: 'Nizhny Novgorod' },
  { id: 76, value: 'Rostov-on-Don' },
  { id: 88, value: 'Kazan' },
  { id: 159, value: 'Astana' },
  { id: 160, value: 'Almaty' },
  { id: 1255, value: 'Tomsk' },
  { id: 1438, value: 'Krasnodar' },
  { id: 1586, value: 'Samara' },
  { id: 2019, value: 'for the Moscow Ring Road' },
  { id: 2114, value: 'Crimea' },
];

async function parseToDB() {
  areas.forEach(async area => {
    const { id, value } = area || {};
    const logs = [];

    let page = 1;
    const result = [];
    const fetchData = await getFetchData(page, id);
    page += 1;
    result.push(...fetchData.items);

    if (fetchData.pages >= page) {
      for (let i = 0; i < fetchData.pages; i++) {
        // eslint-disable-next-line no-await-in-loop
        const data = await getFetchData(page, id);
        result.push(...data.items);
        page += 1;
      }
    }

    if (!result) return;

    for (let i = 0; i < result.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const isRepeat = await Job.findOne({ id: result[i].id }).exec();
      if (!isRepeat) {
        // eslint-disable-next-line no-await-in-loop
        const upsertedJob = await upsertToDB(result[i], id);
        logs.push(upsertedJob);
      }
    }

    console.log(chalk.magenta(`Recorded ${logs.length} for ${value}`));
  });
  removeExpiredJobs();
}

parseToDB();
