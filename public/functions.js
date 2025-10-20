const env = {
  SERVER_URL: 'http://localhost:3000',
}

export const createIframe = (url, options = {}) => {
  const iframe = document.createElement('iframe');

  const coreAttributes = {
    border: 0,
    height: '450px',
    src: url,
    style: 'border-radius:10px; overflow:hidden;',
    width: '700px',
  };

  for (const attribute in coreAttributes) {
    iframe[attribute] = coreAttributes[attribute];
  }

  for (const option in options) {
    iframe[option] = options[option];
  }

  return iframe;
}

export const getApplePodcastElements = async (url) => {
  const splitURL = url.split('/');
  const podcastId = splitURL[splitURL.length - 1].replace(/[a-zA-Z]/g, '');

  const serverResponse = await fetch(`${env.SERVER_URL}/apple-podcasts/${podcastId}`);
  const serverData = await serverResponse.json();  

  const { author, title, description, items } = serverData;
  
  const container = document.createElement('div');

  const titleElement = document.createElement('p');
  titleElement.innerText = title;

  const authorElement = document.createElement('p');
  authorElement.innerText = author;

  const descriptionElement = document.createElement('p');
  descriptionElement.innerText = description;

  container.appendChild(authorElement);
  container.appendChild(titleElement);
  container.appendChild(descriptionElement);

  let index = 0;
  while (index < 20) {
    const podcastItem = items[index];

    // console.log(podcastItem)

    const { title, pubDate, link, enclosure, itunes } = podcastItem;
    const { image, summary } = itunes;
    
    const wrapper = document.createElement('div');
    const wrapperId = `apple-podcast-element-${index}`;
    wrapper.id = wrapperId;

    const thumbnailElement = document.createElement('img');
    thumbnailElement.alt=``
    thumbnailElement.innerHTML = `Thumbnail for ${title}`;
    thumbnailElement.src=image;
    thumbnailElement.height=100;
    thumbnailElement.width=100;

    const titleElement = document.createElement('h2');
    titleElement.innerHTML = title;

    const summaryElement = document.createElement('p');
    summaryElement.innerText = summary;

    const pubDateElement = document.createElement('p');
    pubDateElement.innerText = pubDate;

    const audioElement = document.createElement('audio');
    audioElement.src = enclosure.url;
    audioElement.controls = true;

    const linkElement = document.createElement('a');
    linkElement.innerHTML = `<a target="_blank" href="${link}">Podcast Link</a>`;

    const elements = [titleElement, thumbnailElement, summaryElement, pubDateElement, audioElement, linkElement];
    elements.forEach((element) => wrapper.appendChild(element));

    container.appendChild(wrapper);

    index++;
  }

  return container;
}