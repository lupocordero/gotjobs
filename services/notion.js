const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// const getData = async () => {
//   const response = await notion.search({
//     filter: {
//       value: "database",
//       property: "object",
//     },
//     sort: {
//       direction: "descending",
//       timestamp: "last_edited_time",
//     },
//   });
//   // console.log(response.results[0].title[0].plain_text)
//   const databases = response.results.map((database) => {
//     console.log(database);
//     return {
//       id: database.id,
//       title: database.title[0].text.content,
//       properties: database.properties['Job Posted'],
//     };
//   });
//   return databases;
// };

// (async () => {
//   const nData = await getData();
//   console.log(nData);
// })();

module.exports = async function getJobs() {
    const databaseId = '583dd825-d391-4ce6-9366-48777bd15f0d';
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    const jobs = response.results.map((job) => {
        return {
            id: job.id,
            name: job.properties.Name.title[0].plain_text,
            icon: job.icon.emoji,
            location: job.properties.Location.multi_select[0].name,
            created_date: job.created_time.slice(0,9),
        }
    })
    return jobs
    console.log(jobs);
  };