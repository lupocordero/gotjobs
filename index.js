const dotenv = require('dotenv').config();
const { Client } = require('@notionhq/client')

// Init client

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

const getJobs = async () => {
    const response = await notion.search({
      filter: {
        'value': 'database',
        'property': 'object'
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time',
      },
    });
    console.log(response.results[0].title[0].plain_text)
}

getJobs()
