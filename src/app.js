// import lib
const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger')
const path = require('path');

// TODO: Replace with Database
const things = ["Coding", "MOOC", "Eating"]

// Init func
const app = new Koa()
const route = new KoaRouter()

// middleware
app.use(json()) // prettier the json
app.use(bodyParser()); // Body Parser
app.use(route.routes()).use(route.allowedMethods());
app.use(logger())

// render page
render(app, {
  root: path.join(__dirname, 'pages'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

//routes
route.get('/', index);
route.get('/add', showAdd)
route.post('/add', add)

// index page
async function index(ctx){
  await ctx.render('index', {
    title: "Thing I Love: ",
    things: things
  });
}

// page after adding the item
async function showAdd(ctx){
  await ctx.render('add');
}

// Add item to list
async function add(ctx){
  const body = ctx.request.body;
  console.log(body)
  things.push(body.thing);
  ctx.redirect('/');
}
// api
route.get('/hello', ctx => (ctx.body = {"status": 200, "message": "Koa simple REST API"}))
route.get('/userTest/:name', ctx => (ctx.body = {"status": 200, "message": `Hello ${ctx.params.name}`}))


// start Server
app.listen(4500, () =>{
  console.log("Server listening on port 4500");
})
