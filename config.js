
import serve from 'serve';

const app = serve('build', {
  port: 3000,
  single: true
});

console.log('React app is being served at http://localhost:3000');