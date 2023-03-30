export function getGif(searchTerm) {
    return new Promise((resolve, reject) => {
      searchTerm = searchTerm.split(' ').join('+');
      let apiKey = 'PNux4jmzhaVkIycLY40HzFps3jxMwurF';
      let rand = Math.floor(Math.random() * 20);
      let request = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=20&q=${searchTerm}`;

      fetch(request)
        .then(response => response.json())
        .then(content => {
          // data, pagination, meta
          let url = content.data[rand].images.downsized.url;
          resolve(url);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }
