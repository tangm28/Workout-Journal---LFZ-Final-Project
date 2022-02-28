set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "profiles" (
  "profileId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"sex" TEXT NOT NULL,
	"height" DECIMAL NOT NULL,
	"heightUnit" TEXT NOT NULL,
	"weight" DECIMAL NOT NULL,
	"weightUnit" TEXT NOT NULL,
	"goal" TEXT NOT NULL,
	"activity" TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL default now(),
	"userId" integer NOT NULL,
  CONSTRAINT "profiles_pk" PRIMARY KEY ("profileId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "oneRepMaxes" (
	"maxesId" serial NOT NULL,
	"maxesUnit" TEXT NOT NULL,
	"benchMax" DECIMAL NOT NULL,
	"squatMax" DECIMAL NOT NULL,
	"deadliftMax" DECIMAL NOT NULL,
	"ohpMax" DECIMAL NOT NULL,
	"updatedAt" TIMESTAMPTZ NOT NULL default now(),
	"userId" integer NOT NULL,
	CONSTRAINT "oneRepMaxes_pk" PRIMARY KEY ("maxesId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "exercises" (
	"exerciseId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"workoutId" integer NOT NULL,
	CONSTRAINT "exercises_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "exerciseSets" (
	"setId" serial NOT NULL,
	"set" integer NOT NULL,
	"reps" integer NOT NULL,
	"weight" DECIMAL NOT NULL,
	"weightUnit" TEXT NOT NULL,
	"exerciseId" integer NOT NULL,
	CONSTRAINT "exerciseSets_pk" PRIMARY KEY ("setId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "workoutCreateYourOwn" (
	"workoutId" serial NOT NULL,
	"name" TEXT NOT NULL DEFAULT '',
	"dateFinished" TIMESTAMP default null,
	"templateId" integer NOT NULL,
	CONSTRAINT "workoutCreateYourOwn_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "workoutSetups" (
	"templateId" serial NOT NULL,
	"template" TEXT NOT NULL,
	"numOfDays" integer NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL default now(),
	"userId" integer NOT NULL,
	CONSTRAINT "workoutSetups_pk" PRIMARY KEY ("templateId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "macros" (
	"macrosId" serial NOT NULL,
	"currentProtein" DECIMAL NOT NULL,
	"proteinGoal" DECIMAL NOT NULL,
	"currentCarbs" DECIMAL NOT NULL,
	"carbsGoal" DECIMAL NOT NULL,
	"currentFat" DECIMAL NOT NULL,
	"fatGoal" DECIMAL NOT NULL,
	"calories" DECIMAL NOT NULL,
	"updatedAt" TIMESTAMPTZ NOT NULL default now(),
	"userId" integer NOT NULL,
	CONSTRAINT "macros_pk" PRIMARY KEY ("macrosId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "supplements" (
	"supplementId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"currentAmount" DECIMAL NOT NULL,
	"goalAmount" DECIMAL NOT NULL,
	"goalUnit" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "supplements_pk" PRIMARY KEY ("supplementId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "profiles" ADD CONSTRAINT "profile_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "oneRepMaxes" ADD CONSTRAINT "oneRepMaxes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk0" FOREIGN KEY ("workoutId") REFERENCES "workoutCreateYourOwn"("workoutId");
ALTER TABLE "exerciseSets" ADD CONSTRAINT "exerciseSets_fk0" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exerciseId");
ALTER TABLE "workoutCreateYourOwn" ADD CONSTRAINT "workoutCreateYourOwn_fk0" FOREIGN KEY ("templateId") REFERENCES "workoutSetups"("templateId");
ALTER TABLE "workoutSetups" ADD CONSTRAINT "workoutSetups_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "macros" ADD CONSTRAINT "macros_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "supplements" ADD CONSTRAINT "supplements_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
