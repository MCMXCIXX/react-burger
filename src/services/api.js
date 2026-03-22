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
    }).then((res) => {
        if (res.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');
            return fetch(`${BASE_URL}/auth/refreshToken}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: refreshToken }),
            }).then(checkResponse)
            .then((data) => {
                localStorage.setItem('accessToken', data.accessToken)
                localStorage.setItem('refreshToken', data.refreshToken)
                return fetch(`${BASE_URL}${endpoint}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: token }),
                        ...options.headers,
                    },
                    ...options,
                }).then(checkResponse);
            });
        }
        return checkResponse(res)
    });
};
