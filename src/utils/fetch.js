export default async (url, options) => {
  const request = Object.assign(
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    },
    options
  );

  if (request.body && typeof request.body !== "string") {
    request.body = JSON.stringify(request.body);
  }

  const response = await fetch(url, request);

  let result = await response.text();

  result = result ? JSON.parse(result) : null;

  return result;
};
