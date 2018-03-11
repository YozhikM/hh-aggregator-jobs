/* @flow */

const mongoose = require('mongoose');
const fetch = require('node-fetch');
const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

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

const Job = mongoose.model('Job', JobSchema);

const customizationOptions = {};
const JobTC = composeWithMongoose(Job, customizationOptions);

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
  const { id } = job || {};

  const description = await upsertDesc(job);

  const isRepeat = await Job.findOne({ id }).exec();

  const newJob = new Job({ ...job, area, description });

  if (isRepeat && isRepeat.id === id) {
    return null;
  }
  await Job.insertMany(newJob, err => {
    if (err) console.error(err);
  });

  return job;
}

async function getFetchData(page, area) {
  const response = await fetch(
    `https://api.hh.ru/vacancies?text=react+OR+frontend+OR+graphql&area=${area}&per_page=10&page=${page}&order_by=publication_time`
  );
  const result = await response.json();

  return result;
}

const areas = [160, 3, 4, 88, 66, 76, 1255, 1438, 1586, 2114, 2019];

async function connectToDB() {
  areas.forEach(async area => {
    let page = 1;
    const result = [];
    const fetchData = await getFetchData(page, area);
    page += 1;
    result.push(...fetchData.items);

    if (fetchData.pages >= page) {
      for (let i = 0; i <= fetchData.pages + 1; i++) {
        // eslint-disable-next-line no-await-in-loop
        const data = await getFetchData(page, area);
        result.push(...data.items);
        page += 1;
      }
    }

    if (!result) return;
    result.forEach(async job => {
      await upsertToDB(job, area);
    });
  });
}

module.exports = { connectToDB, graphqlSchema };
