import Runner from './src/Runner';

const app: Runner = new Runner();

// Example adding additional middleware
// app.addMiddleware(bodyParser.urlencoded({ extended: false }));

app.start();
