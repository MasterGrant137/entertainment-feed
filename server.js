import express from 'express';
import dotenv from 'dotenv';
import Parser from "rss-parser";

dotenv.config();

const app = express();
const { APPLE_PODCAST_API_URL, SERVER_URL } = process.env;

app.use(express.static('public'));

app.get('/', (clientRequest, serverResponse) => {
  serverResponse.send(`Server is running at ${SERVER_URL}`);
});

app.get('/apple-podcasts/:id', async (clientRequest, serverResponse) => {
  const rssParser = async (feedUrl, config) => {
    const parser = new Parser(config);
    const feed = await parser.parseURL(feedUrl);
    return feed;
  }

  const podcastId = clientRequest.params.id;
  const appleApiResponse = await fetch(`${APPLE_PODCAST_API_URL}?id=${podcastId}`);
  const appleApiData = await appleApiResponse.json();
  
  const feedUrl = appleApiData.results[0].feedUrl;
  const config = { 
    customFields: { 
      item: ['itunes']
    }
  };

  const podcastData = await rssParser(feedUrl, config);
  serverResponse.json(podcastData); 
});

app.listen(3000, () => console.log(`💻 Server running here: ${SERVER_URL}.`));