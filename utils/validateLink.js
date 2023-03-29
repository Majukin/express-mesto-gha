const validateLink = (link) => {
  const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[\w\-._~:/?#[\]@!$&'()*+,;=]#/g;
  return reg.test(link);
};

module.exports = { validateLink };
