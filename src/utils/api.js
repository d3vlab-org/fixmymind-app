const API_URL = 'https://api.fixmymind.org/api'; // dopasuj do środowiska

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