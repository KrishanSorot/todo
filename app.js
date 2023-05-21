const express = require("express");
const app = express();
app.use(express.json());

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "todoApplication.db");

let db = null;

const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Initialization Done");
    });
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

initializeDBandServer();

app.get("/todos/", async (request, response) => {
  const { status, priority, category, search_q } = request.query;
  let gettodosQuery;
  if (
    status !== undefined &&
    priority === undefined &&
    category === undefined &&
    search_q === undefined
  ) {
    gettodosQuery = `select * from todo where 
        status = '${status}'`;
  }

  if (
    status === undefined &&
    priority !== undefined &&
    category === undefined &&
    search_q === undefined
  ) {
    gettodosQuery = `select * from todo where 
        priority = '${priority}'`;
  }

  if (
    status === undefined &&
    priority === undefined &&
    category !== undefined &&
    search_q === undefined
  ) {
    gettodosQuery = `select * from todo where 
        category = '${category}'`;
  }

  if (
    status === undefined &&
    priority === undefined &&
    category === undefined &&
    search_q !== undefined
  ) {
    gettodosQuery = `select * from todo where 
        todo like '%${search_q}%'`;
  }

  if (
    status !== undefined &&
    priority !== undefined &&
    category === undefined &&
    search_q === undefined
  ) {
    gettodosQuery = `select * from todo where 
        status = '${status}'
        AND priority = '${priority}'`;
  }

  if (
    status !== undefined &&
    priority === undefined &&
    category !== undefined &&
    search_q === undefined
  ) {
    gettodosQuery = `select * from todo where 
        status = '${status}'
        and category = '${category}'`;
  }

  if (
    status !== undefined &&
    priority === undefined &&
    category === undefined &&
    search_q !== undefined
  ) {
    gettodosQuery = `select * from todo where 
        status = '${status}'
        and todo like '%${search_q}%'`;
  }

  if (
    status === undefined &&
    priority !== undefined &&
    category !== undefined &&
    search_q === undefined
  ) {
    gettodosQuery = `select * from todo where 
        priority = '${priority}'
        and category = '${category}'`;
  }

  if (
    status === undefined &&
    priority !== undefined &&
    category === undefined &&
    search_q !== undefined
  ) {
    gettodosQuery = `select * from todo where 
        priority = '${priority}'
        and todo like '%${search_q}%'`;
  }

  if (
    status === undefined &&
    priority === undefined &&
    category !== undefined &&
    search_q !== undefined
  ) {
    gettodosQuery = `select * from todo where 
        category = '${category}'
        and todo like '%${search_q}%'`;
  }

  if (
    status !== undefined &&
    priority !== undefined &&
    category !== undefined &&
    search_q === undefined
  ) {
    gettodosQuery = `select * from todo where 
        status = '${status}'
        and priority = '${priority}'
        and category = '${category}'`;
  }

  if (
    status !== undefined &&
    priority !== undefined &&
    category === undefined &&
    search_q !== undefined
  ) {
    gettodosQuery = `select * from todo where 
        status = '${status}'
        and priority = '${priority}'
        and todo like '%${search_q}%'`;
  }

  if (
    status !== undefined &&
    priority === undefined &&
    category !== undefined &&
    search_q !== undefined
  ) {
    gettodosQuery = `select * from todo where 
        status = '${status}'
        and todo like '%${search_q}%'
        and category = '${category}'`;
  }

  if (
    status === undefined &&
    priority !== undefined &&
    category !== undefined &&
    search_q !== undefined
  ) {
    gettodosQuery = `select * from todo where 
        todo like '%${search_q}%'
        and priority = '${priority}'
        and category = '${category}'`;
  }

  if (
    status !== undefined &&
    priority !== undefined &&
    category !== undefined &&
    search_q !== undefined
  ) {
    gettodosQuery = `select * from todo where 
        status = '${status}'
        and todo like '%${search_q}%'
        and priority = '${priority}'
        and category = '${category}'`;
  }

  if (
    status === undefined &&
    priority === undefined &&
    category === undefined &&
    search_q === undefined
  ) {
    gettodosQuery = `select * from todo`;
  }

  const gettodo = await db.all(gettodosQuery);
  response.send(gettodo);
});

app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const gettodoQuery = `select * from todo where id = ${todoId}`;
  const gettodofinal = await db.get(gettodoQuery);
  response.send(gettodofinal);
});

app.get("/agenda/", async (request, response) => {
  const { date } = request.query;
  const getsingleQuery = `select * from todo where due_date like '%${date}%'`;
  const getsingletodo = await db.get(getsingleQuery);
  response.send(getsingletodo);
});

app.post("/todos/", async (request, response) => {
  const { id, todo, priority, status, category, dueDate } = request.body;
  const posttodoQuery = `
    INSERT INTO todo
    (id, todo, priority, status, category, due_date)
    VALUES (${id}, '${todo}', '${priority}', '${status}', '${category}', '${dueDate}')
    `;
  const posttodoList = await db.run(posttodoQuery);
  response.send("Todo Successfully Added");
});

app.put("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const { status, priority, category, todo, dueDate } = request.body;
  if (
    status !== undefined &&
    priority === undefined &&
    category === undefined &&
    todo === undefined &&
    dueDate === undefined
  ) {
    const mysqlQuery = `update todo set status = '${status}' where id = ${todoId}`;
    const getmysqlQuery = await db.run(mysqlQuery);
    response.send("Status Updated");
  }

  if (
    status === undefined &&
    priority !== undefined &&
    category === undefined &&
    todo === undefined &&
    dueDate === undefined
  ) {
    const mysqlQuery = `update todo set priority = '${priority}' where id = ${todoId}`;
    const getmysqlQuery = await db.run(mysqlQuery);
    response.send("Priority Updated");
  }

  if (
    status === undefined &&
    priority === undefined &&
    category !== undefined &&
    todo === undefined &&
    dueDate === undefined
  ) {
    const mysqlQuery = `update todo set category = '${category}' where id = ${todoId}`;
    const getmysqlQuery = await db.run(mysqlQuery);
    response.send("Category Updated");
  }

  if (
    status !== undefined &&
    priority === undefined &&
    category === undefined &&
    todo === undefined &&
    dueDate === undefined
  ) {
    const mysqlQuery = `update todo set status = '${status}' where id = ${todoId}`;
    const getmysqlQuery = await db.run(mysqlQuery);
    response.send("Status Updated");
  }

  if (
    status === undefined &&
    priority === undefined &&
    category === undefined &&
    todo !== undefined &&
    dueDate === undefined
  ) {
    const mysqlQuery = `update todo set todo = '${todo}' where id = ${todoId}`;
    const getmysqlQuery = await db.run(mysqlQuery);
    response.send("Todo Updated");
  }

  if (
    status === undefined &&
    priority === undefined &&
    category === undefined &&
    todo === undefined &&
    dueDate !== undefined
  ) {
    const mysqlQuery = `update todo set due_date = '${dueDate}' where id = ${todoId}`;
    const getmysqlQuery = await db.run(mysqlQuery);
    response.send("Due Date Updated");
  }
});

app.delete("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const deletetodoQuery = `delete from todo where id = ${todoId}`;
  const getdeletetodo = await db.run(deletetodoQuery);
  response.send("Todo Deleted");
});
module.exports = app;
