
const BASE_URL = 'http://localhost:4000'; // или тот порт, на котором у тебя бэкенд
localStorage.setItem('accessToken', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWIwMzlmOTgxNTA2ZGFlMGY1ZmQxNjEiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3NzMxNTY4NTcsImV4cCI6MTc3MzE2MDQ1N30.KgPn1uOq2iUiPNhr4ryRtmUdLnSKVsPUQkyrs-c1jWM`);
const checkResponse = (res) => {
    if (res.ok) return res.json();
    return res.json().then((err) => Promise.reject(err));
};

export const request = (endpoint, options = {}) => {
    const token = localStorage.getItem('accessToken');
    return fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: token }), // если токен есть – добавляем
            ...options.headers,
        },
        ...options,
    }).then(checkResponse);
};
