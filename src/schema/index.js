/* @flow */

const mongoose = require('mongoose');
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
  // $FlowFixMe
  address: {
    city: String,
    id: String,
    metro: {
      station_name: String,
    },
  },
  description: String,
  schedule: {
    id: String,
    name: String,
  },
  experience: {
    id: String,
    name: String,
  },
  employment: {
    id: String,
    name: String,
  },
  coords: {
    lat: Number,
    lng: Number,
  },
  key_skills: Array,
});

JobSchema.index({ published_at: 1 });
JobSchema.index({ created_at: 1 });
JobSchema.index({ salary: 1 });

const Job = mongoose.model('Job', JobSchema);

const customizationOptions = {};
const JobTC = composeWithMongoose(Job, customizationOptions);

JobTC.wrapResolver('pagination', resolver =>
  resolver
    .addFilterArg({
      name: 'q',
      type: 'String',
      description: 'Search by query',
      query: (rawQuery, value) => {
        // eslint-disable-next-line no-param-reassign
        rawQuery.$or = [
          { description: { $regex: new RegExp(value, 'ig') } },
          { name: { $regex: new RegExp(value, 'ig') } },
          { employer: { name: { $regex: new RegExp(value, 'ig') } } },
        ];
      },
    })
    .addFilterArg({
      name: 'salaryNotExist',
      type: 'Boolean',
      description: 'Filter by salary existing',
      query: (rawQuery, value) => {
        // eslint-disable-next-line no-param-reassign
        rawQuery.salary = { $exists: value };
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

module.exports = { graphqlSchema, Job };
