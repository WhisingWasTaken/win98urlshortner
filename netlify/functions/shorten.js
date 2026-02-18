export async function handler(event) {
  const { url, service } = event.queryStringParameters;

  if (!url || !service) {
    return {
      statusCode: 400,
      body: "Missing parameters: url and service are required."
    };
  }

  let apiUrl = "";
  if (service === "tinyurl") {
    apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
  } else if (service === "isgd") {
    apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
  } else if (service === "vgd") {
    apiUrl = `https://v.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
  } else {
    return {
      statusCode: 400,
      body: "Unsupported service"
    };
  }

  try {
    const response = await fetch(apiUrl);
    const text = await response.text();
    return {
      statusCode: 200,
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Error contacting shortening service"
    };
  }
}

