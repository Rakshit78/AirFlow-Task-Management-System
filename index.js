const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

const addToTasks = { taskId: 4, text: 'Review code', priority: 1 };

const app = express();
app.use(cors());
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
// /tasks/add?taskId=4&text=Review%20code&priority=1

app.get('/tasks/add', (req, res) => {
  let { taskId, text, priority } = req.query;
  const result = [...tasks, { taskId, text, priority }];
  res.json({ tasks: result });
});

app.get('/tasks', (req, res) => {
  res.status(200).json({ tasks: tasks });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  const result = tasks.sort((a, b) => a.priority - b.priority);
  res.status(200).json({ tasks: result });
});

// /tasks/edit-priority?taskId=1&priority=1

app.get('/tasks/edit-priority', (req, res) => {
  const { taskId, priority } = req.query;
  const result = tasks.map((res) => {
    if (res.taskId == taskId) {
      return { ...res, priority: priority };
    } else {
      return res;
    }
  });
  res.status(200).json({ tasks: result });
});
// /tasks/edit-text?taskId=3&text=Update%20documentation
app.get('/tasks/edit-text', (req, res) => {
  const { taskId, text } = req.query;
  let result = tasks.map((res) => {
    if (res.taskId == taskId) {
      return { ...res, text: text };
    } else {
      return res;
    }
  });
  res.status(200).send({ tasks: result });
});

app.get('/tasks/delete', (req, res) => {
  const { taskId } = req.query;
  const result = tasks.filter((res) => res.taskId != taskId);
  res.status(200).json({ tasks: result });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  const { priority } = req.query;
  const result = tasks.filter((res) => res.priority == priority);
  res.send({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
