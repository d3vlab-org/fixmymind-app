import {API_URL} from "./auth/config";

export async function fetchSuggestedTests(token) {
    const res = await fetch(`${API_URL}/tests/suggest`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return res.json();
}

export async function fetchTestQuestions(testId, token) {
    const res = await fetch(`${API_URL}/tests/${testId}/questions`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return res.json();
}