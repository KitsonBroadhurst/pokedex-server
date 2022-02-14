const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const express = require('express')
const http = require('http')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const PokeAPI = require('./datasources/poke-api')
const FavouriteAPI = require('./datasources/favourite-api')
const authRouter = require('./routes/auth')
const passport = require('./passport/setup')
const cors = require('cors')
const Favourite = require('./models/favourites')


mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(console.log(`MongoDB connected`))
  .catch(err => console.log('mongoose error is ', err))


async function startApolloServer(typeDefs, resolvers) {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(express.urlencoded({ extended: false }))

  // Express session
  app.use(
    session({
      secret: "some secret string",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: MONGO_URI })
    })
  )

  // Passport middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // Express routes
  app.use('/', authRouter)
  app.get("/", (req, res) => res.send("Good monring sunshine!"))

  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        pokeAPI: new PokeAPI(),
        favouriteAPI: new FavouriteAPI(Favourite)
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise(resolve => httpServer.listen({port: process.env.PORT || 4000}, resolve))
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000${server.graphqlPath}
    📭  Query at https://studio.apollographql.com/dev
  `)
}

startApolloServer(typeDefs, resolvers)