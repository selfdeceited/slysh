export const replacer = () => {
  var replace = {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    "process.env.devMode": JSON.stringify(process.env.devMode),
    "process.env.storeUri": JSON.stringify(process.env.storeUri),
    "process.env.apiKey": JSON.stringify(process.env.apiKey),
  };
  console.log(replace);
  return replace;
};
