import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Initialize Pusher and Laravel Echo
let echo = null;

export const initEcho = () => {
  if (echo) return echo;

  window.Pusher = Pusher;
  
  echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.EXPO_PUBLIC_PUSHER_APP_KEY || 'app-key',
    cluster: process.env.EXPO_PUBLIC_PUSHER_APP_CLUSTER || 'eu',
    forceTLS: true,
  });

  return echo;
};

export const getEcho = () => {
  if (!echo) {
    return initEcho();
  }
  return echo;
};

export default {
  initEcho,
  getEcho,
};