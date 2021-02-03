function response(res, status, body) {
  if (status < 400) {
    return res.status(status).send({ success: true, ...body });
  }
  return res.status(status).send({ success: false, ...body });
}

module.exports = { response };
