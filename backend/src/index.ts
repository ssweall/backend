import express from 'express';
const app = express();
const port = 3000;
app.get('/', (_, res) => {
  res.status(200).send('OK');
});
app.listen(port, () => console.log(`Runnning port ${port}`));
