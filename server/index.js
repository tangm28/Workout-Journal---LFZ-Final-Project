require('dotenv/config');
const argon2 = require('argon2');
const ClientError = require('./client-error');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.use(errorMiddleware);

app.post('/api/auth/register', (req, res, next) => {
  const { username, password, passwordConfirmation } = req.body;

  if (!username || !password || !passwordConfirmation) {
    throw new ClientError(400, 'username, password, and passwordConfirmation are required fields');
  }
  if (password.length < 8) {
    throw new ClientError(401, 'password length needs to be 8 or more');
  }
  if (password !== passwordConfirmation) {
    throw new ClientError(401, 'password and passwordConfirmation does not match');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "password")
        values ($1, $2)
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/log-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "password"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId } = user;
      return argon2
        .verify(user.password, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.post('/api/account/create-profile', (req, res, next) => {
  const {
    firstName, lastName, sex,
    heightPrimary, heightSecondary, userHeightUnit,
    userWeight, userWeightUnit,
    goal, activityLevel, userId
  } = req.body;
  if (!firstName || !lastName || !sex ||
    !heightPrimary || !heightSecondary || !userHeightUnit ||
    !userWeight || !userWeightUnit ||
    !goal || !activityLevel) {
    throw new ClientError(400, 'all fields need to be completed');
  }
  if (Number(heightPrimary) < 0 || Number(heightSecondary) < 0 || Number(userWeight) < 0) {
    throw new ClientError(401, 'please enter valid positive number');
  }
  const sql = `
        insert into "profiles" (
          "firstName", "lastName" , "sex",
          "height", "heightUnit", "weight", "weightUnit",
          "goal", "activity", "userId"
          )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )
        returning *
      `;
  let height = 0;
  if (userHeightUnit === 'ft') {
    height = Number(heightPrimary) + (Number(heightSecondary) / 12);
  } else {
    height = Number(heightPrimary) + (Number(heightSecondary) / 100);
  }
  const params = [
    firstName, lastName, sex,
    height, userHeightUnit, userWeight, userWeightUnit,
    goal, activityLevel, userId
  ];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));

});

app.post('/api/account/create-maxes', (req, res, next) => {
  const {
    benchMax, squatMax, deadliftMax, ohpMax,
    maxesUnit, userId
  } = req.body;
  if (!benchMax || !squatMax || !deadliftMax || !ohpMax ||
    !maxesUnit || !userId) {
    throw new ClientError(400, 'all fields need to be completed');
  }
  if (Number(benchMax) < 0 || Number(squatMax) < 0 ||
    Number(deadliftMax) < 0 || Number(ohpMax) < 0) {
    throw new ClientError(401, 'please enter valid positive number');
  }

  const sql = `
        insert into "oneRepMaxes" (
          "benchMax", "squatMax", "deadliftMax", "ohpMax",
          "maxesUnit", "userId"
          )
        values ($1, $2, $3, $4, $5, $6 )
        returning *
      `;
  const params = [
    benchMax, squatMax, deadliftMax, ohpMax,
    maxesUnit, userId
  ];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));

});

app.get('/api/account/get-maxes/:id', (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    throw new ClientError(400, 'all fields need to be completed');
  }

  const sql = `
      select "benchMax", "squatMax", "deadliftMax", "ohpMax", "maxesUnit"
        from "oneRepMaxes"
       where "userId" = $1
    order by "updatedAt" desc
    limit 1
      `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));

});

app.post('/api/workout/create-workout', (req, res, next) => {
  const {
    template, numOfDays, userId
  } = req.body;

  if (!template || !numOfDays) {
    throw new ClientError(400, 'all fields need to be completed');
  }
  const sql = `
        insert into "workoutSetups" (
          "template", "numOfDays", "userId"
          )
        values ($1, $2, $3)
        returning *
      `;
  const params = [
    template, Number(numOfDays), Number(userId)
  ];
  db.query(sql, params)
    .then(result => {
      const [workout] = result.rows;
      res.status(201).json(workout);
    })
    .catch(err => next(err));

});

app.post('/api/workout/create-your-own', (req, res, next) => {
  const {
    workoutName, templateId
  } = req.body;

  if (!workoutName || !templateId) {
    throw new ClientError(400, 'all fields need to be completed');
  }
  const sql = `
        insert into "workoutCreateYourOwn" (
          "name", "templateId"
          )
        values ($1, $2)
        returning *
      `;
  const params = workoutName === 'empty'
    ? ['', Number(templateId)]
    : [workoutName, Number(templateId)];
  db.query(sql, params)
    .then(result => {
      const [day] = result.rows;
      res.status(201).json(day);
    })
    .catch(err => next(err));

});

app.post('/api/workout/create-exercise', (req, res, next) => {
  const {
    exerciseName, workoutId
  } = req.body;

  if (!exerciseName || !workoutId) {
    throw new ClientError(400, 'all fields need to be completed');
  }
  const sql = `
        insert into "exercises" (
          "name", "workoutId"
          )
        values ($1, $2)
        returning *
      `;
  const params = [exerciseName, Number(workoutId)];
  db.query(sql, params)
    .then(result => {
      const [day] = result.rows;
      res.status(201).json(day);
    })
    .catch(err => next(err));

});

app.get('/api/workout/get-workout/:id', (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    throw new ClientError(400, 'all fields need to be completed');
  }

  const sql = `
      select "userId", "templateId", "workoutId", "exerciseId",
             "template", "numOfDays",
             "cyo"."name" as "workoutDayName", "e"."name" as "exerciseName",
             "dateFinished"
        from "workoutSetups"
        join "workoutCreateYourOwn" as "cyo" using ("templateId")
         join "exercises" as "e" using ("workoutId")
        where "createdAt" =
              (SELECT max("createdAt")
                 from "workoutSetups")
              and "userId" = $1
      `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));

});

app.get('/api/workout/get-workout-test/:id', (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    throw new ClientError(400, 'all fields need to be completed');
  }

  const sql = `
      select *
           from "workoutSetups"
          where "userId" = $1
       order by "createdAt" desc
      `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      // res.status(201).json(result.rows[0]);
      const nextSql = `
      select "templateId", "workoutId", "exerciseId",
             "w"."name" as "workoutDay", "e"."name" as "exerciseName",
             "dateFinished"
        from "workoutCreateYourOwn" as "w"
        join "exercises" as "e" using ("workoutId")
       where "templateId" = $1
      `;
      const nextParams = [result.rows[0].templateId];
      db.query(nextSql, nextParams)
        .then(result => {
          const tempWorkout = [];
          let day = {};
          let exercise = [];
          let dayName = '';
          const testArray = [];
          const workout = result.rows;
          for (let i = 0; i < workout.length; i++) {
            // res.status(201).json(result[i]);
            testArray.push(workout[i]);
            if (dayName !== workout[i].workoutDay) {
              if (exercise.length > 0) {
                day = {
                  workoutName: dayName,
                  exercise: exercise
                };
                tempWorkout.push(day);
                day = {};
                exercise = [];
              }
              dayName = workout[i].workoutDay;
            }
            if (dayName === workout[i].workoutDay) {
              exercise.push(workout[i]);
            }
            if (i === workout.length - 1) {
              day = {
                workoutName: dayName,
                exercise: exercise
              };
              tempWorkout.push(day);
            }
          }
          res.status(201).json(tempWorkout);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));

});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
