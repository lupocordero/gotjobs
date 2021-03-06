import dotenv from "dotenv";
import { Client } from "@notionhq/client";

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
//       properties: database.properties["Job Posted"],
//     };
//   });
//   return databases;
// };

// (async () => {
//   const nData = await getData();
//   console.log(nData);
// })();

export async function getJobs(database_id) {
  const response = await notion.databases.query({
    database_id,
  });
  const jobs = response.results.map((job) => {
    return {
      id: job.id,
      name: job.properties.Name.title[0].plain_text,
      icon: job.icon.emoji,
      location: job.properties.Location.multi_select[0].name,
      created_date: job.created_time.slice(0, 9),
    };
  });
  return jobs;
}

export async function getUXJobs() {
  const UXJobs = await getJobs("583dd825-d391-4ce6-9366-48777bd15f0d");
  return UXJobs;
}

export async function getWDJobs() {
  const WDJobs = await getJobs("11df3b99-90dc-46d6-a2a1-a4d7c809e52f");
  return WDJobs;
}
