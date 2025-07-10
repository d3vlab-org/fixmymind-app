import { useEffect, useState } from 'react';

export default function GoogleRedirectHandler() {
    const [status, setStatus] = useState('Oczekiwanie na token...');

    useEffect(() => {
        const hashParams = new URLSearchParams(window.location.hash.slice(1)); // usuń #
        const id_token = hashParams.get('id_token');

        if (id_token && window.opener) {
            window.opener.postMessage({
                source: 'fixmymind-google-auth',
                id_token,
            }, '*');
            setStatus('✅ Token wysłany. Zamykam...');
            setTimeout(() => window.close(), 500);
        } else {
            setStatus('❌ Brak tokena lub brak okna nadrzędnego.');
        }
    }, []);

    return (
        <div style={{
            color: '#fff',
            backgroundColor: '#111',
            padding: 32,
            fontFamily: 'sans-serif',
            textAlign: 'center',
        }}>
            <h2>FixMyMind</h2>
            <p>{status}</p>
        </div>
    );
}