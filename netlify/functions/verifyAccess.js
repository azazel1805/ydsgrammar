exports.handler = async function (event) {

  const body = JSON.parse(event.body || "{}")
  const code = body.code

  if (!code) {
    return {
      statusCode: 400,
      body: "Missing code"
    }
  }

  if (code === process.env.AI_SECRET_CODE) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  }

  return {
    statusCode: 403,
    body: "Invalid code"
  }

}
