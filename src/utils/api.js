const API_URL = "http://localhost:3001";
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const apiRequest = async (url, options) => {
  const result = await fetch(url, options);

  if (!result.ok) {
    throw new Error(result.error);
  }
  const data = await result.json();

  return data;
};

export const getUsers = () => {
  return apiRequest(`${API_URL}/users`);
};

export const getBooks = () => {
  return apiRequest(`${API_URL}/books`);
};

export const getUserBooks = (userId) => {
  return apiRequest(`${API_URL}/users/${userId}/books`);
};

export const updateBook = (data, bookId) => {
  return apiRequest(`${API_URL}/books/${bookId}`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(data),
  });
};

export const createBook = (data, userId) => {
  return apiRequest(`${API_URL}/users/${userId}/books`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data),
  });
};
