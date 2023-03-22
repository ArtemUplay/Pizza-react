function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Произошла ошибка: ${response.status}`);
}

export { checkResponse };
