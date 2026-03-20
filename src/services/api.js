const BASE_URL = 'http://localhost:4000';

const checkResponse = (res) => {
    if (res.ok) return res.json();
    return res.json().then((err) => Promise.reject(err));
};

export const request = (endpoint, options = {}) => {
    const token = localStorage.getItem('accessToken');
    return fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: token }),
            ...options.headers,
        },
        ...options,
    }).then(checkResponse);
};
