const axios = require("axios");

async function getData(number) {
  try {
    const { data: user } = await axios(`https://jsonplaceholder.typicode.com/users/${number}`);
    const { data: posts } = await axios(`https://jsonplaceholder.typicode.com/posts?userId=${number}`);

    return { user, posts };
  } catch (error) {
    console.log("bir hata oluştu: ", error);
  }
}

module.exports = getData;
