const express = require('express')
const rateLimit = require('express-rate-limit')
const connectDB = require('./db/mongoose')
const noteRouter = require('./routers/note')
const userRouter = require('./routers/user')

const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

//Rate Limitter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	message: "Too many erquests form this IP, please try again after sometime"
})

app.use(express.json());
app.set("trust proxy", 1);

app.use(
  cors({
      origin : ["http://localhost:3000"],
      credentials: true,
  })
);
app.use(limiter);
app.use('/notes',noteRouter);
app.use('/auth',userRouter);

connectDB();

app.listen(port, () => {
  console.log('Server is up on port '+port)
})