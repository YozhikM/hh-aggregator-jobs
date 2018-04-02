/* @flow */

const { format, addMonths } = require('date-fns');
const { Job } = require('.');

async function removeExpiredJobs() {
  const newDateString = format(addMonths(new Date(), -1), 'YYYY-MM-DD');

  await Job.deleteMany({
    published_at: { $lt: newDateString },
  });
}

module.exports = removeExpiredJobs;
