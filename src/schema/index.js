/* @flow */

const mongoose = require('mongoose');
const fetch = require('node-fetch');
const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const chalk = require('chalk');

const JobSchema = mongoose.Schema({
  name: String,
  id: String,
  salary: {
    from: Number,
    to: Number,
    gross: Boolean,
    currency: String,
  },
  snippet: {
    requirement: String,
    responsibility: String,
  },
  area: String,
  created_at: String,
  published_at: String,
  employer: {
    name: String,
    alternate_url: String,
  },
  address: {
    city: String,
    id: String,
    metro: {
      station_name: String,
    },
  },
  description: String,
});

JobSchema.index({ published_at: 1 });
JobSchema.index({ created_at: 1 });

const Job = mongoose.model('Job', JobSchema);

const customizationOptions = {};
const JobTC = composeWithMongoose(Job, customizationOptions);

JobTC.wrapResolver('pagination', resolver =>
  resolver.addFilterArg({
    name: 'q',
    type: 'String',
    description: 'Search by query',
    query: (rawQuery, value) => {
      // eslint-disable-next-line no-param-reassign
      rawQuery.$or = [
        { description: { $regex: new RegExp(value, 'ig') } },
        { name: { $regex: new RegExp(value, 'ig') } },
      ];
    },
  })
);

schemaComposer.rootQuery().addFields({
  jobById: JobTC.getResolver('findById'),
  jobByIds: JobTC.getResolver('findByIds'),
  jobOne: JobTC.getResolver('findOne'),
  jobMany: JobTC.getResolver('findMany'),
  jobCount: JobTC.getResolver('count'),
  jobConnection: JobTC.getResolver('connection'),
  jobPagination: JobTC.getResolver('pagination'),
});

schemaComposer.rootMutation().addFields({
  jobCreate: JobTC.getResolver('createOne'),
  jobUpdateById: JobTC.getResolver('updateById'),
  jobUpdateOne: JobTC.getResolver('updateOne'),
  jobUpdateMany: JobTC.getResolver('updateMany'),
  jobRemoveById: JobTC.getResolver('removeById'),
  jobRemoveOne: JobTC.getResolver('removeOne'),
  jobRemoveMany: JobTC.getResolver('removeMany'),
});

const graphqlSchema = schemaComposer.buildSchema();

async function upsertDesc(job) {
  const { id } = job || {};

  // const hasDesc = await Job.find({ id, description: { $ne: null } });

  const response = await fetch(`https://api.hh.ru/vacancies/${id}`);
  const result = await response.json();

  return result.description;
}

async function upsertToDB(job, area) {
  const description = await upsertDesc(job);

  const newJob = new Job({ ...job, area, description });

  await Job.insertMany(newJob, err => {
    if (err) console.error(err);
  });

  return job;
}

async function getFetchData(page, area) {
  const response = await fetch(
    `https://api.hh.ru/vacancies?text=frontend+OR+node+OR+javascript&area=${area}&per_page=10&page=${page}&order_by=publication_time`
  );
  const result = await response.json();

  return result;
}

const areas = [
  { id: 160, value: 'Almaty' },
  { id: 3, value: 'Yekaterinburg' },
  { id: 4, value: 'Novosibirsk' },
  { id: 88, value: 'Kazan' },
  { id: 66, value: 'Nizhny Novgorod' },
  { id: 76, value: 'Rostov-on-Don' },
  { id: 1255, value: 'Tomsk' },
  { id: 1438, value: 'Krasnodar' },
  { id: 1586, value: 'Samara' },
  { id: 2114, value: 'Crimea' },
  { id: 2019, value: 'for the Moscow Ring Road' },
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

    console.log(chalk.blue(`Recorded ${logs.length} for ${value}`));
  });
}

module.exports = { parseToDB, graphqlSchema };
