function checkResponse(response) {
  if (response.statusText === 'OK') {
    return response;
  }

  throw new Error(`Произошла ошибка: ${response.status}`);
}

export { checkResponse };
