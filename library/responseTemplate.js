module.exports = function responseHandler(
  reqstatus,
  reqstatusCode,
  reqmessage,
  reqresult
) {
  let statusText;
  let message = reqmessage; // Default to reqmessage, can be overwritten below

  switch (reqstatusCode) {
    case 400:
      statusText = "HTTP 400 Bad Request";
      message = reqmessage ? reqmessage : "Invalid request, missing required headers.";
      break;
    case 401:
      statusText = "HTTP 401 Unauthorized";
      message = "Invalid request, access token is invalid.";
      break;
    case 403:
      statusText = "HTTP 403 Forbidden";
      message = "Invalid request, missing authorization headers.";
      break;
    case 404:
      statusText = "HTTP 404 Not Found";
      message = reqmessage ? reqmessage : "Resource not found.";
      break;
    case 415:
      statusText = "HTTP 415 Unsupported Media Type";
      message = "Invalid request, JSON is not valid.";
      break;
    case 422:
      statusText = "HTTP 422 Unprocessable Entity";
      message = reqmessage
        ? reqmessage
        : "Invalid request, missing required parameters.";
      break;
    case 200:
      statusText = "HTTP 200 OK";
      break;
    case 201:
      statusText = "HTTP 201 Created";
      break;
    case 204:
      statusText = "HTTP 204 No Content";
      break;
    case 406:
      statusText = "HTTP 406 Not Acceptable";
      break;
    case 500:
      statusText = "HTTP 500 Internal Server Error";
      message = "There was an error in processing your request.";
      break;
    default:
      statusText = "Invalid Status Code";
      message = "The status code is rejected by the server.";
  }

  let json_result = {
    status: reqstatus,
    statusCode: reqstatusCode,
    statusText: statusText,
    message: message,
    data: reqresult || null, // Only include result if it's present
  };

  return json_result;
};
