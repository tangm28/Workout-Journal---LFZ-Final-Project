set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public.users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.profile" (
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"sex" BINARY NOT NULL,
	"height" integer NOT NULL,
	"heightUnit" BINARY NOT NULL,
	"weight" integer NOT NULL,
	"weightUnit" BINARY NOT NULL,
	"goal" TEXT NOT NULL,
	"activity" TEXT NOT NULL,
	"userId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.oneRepMaxes" (
	"maxesId" serial NOT NULL,
	"maxesUnit" BINARY NOT NULL,
	"benchMax" DECIMAL NOT NULL,
	"squatMax" DECIMAL NOT NULL,
	"deadliftMax" DECIMAL NOT NULL,
	"ohpMax" DECIMAL NOT NULL,
	"updatedAt" TIMESTAMP NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "oneRepMaxes_pk" PRIMARY KEY ("maxesId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.exercise" (
	"exceriseId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"workoutId" DECIMAL NOT NULL,
	CONSTRAINT "exercise_pk" PRIMARY KEY ("exceriseId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.exerciseSet" (
	"setId" serial NOT NULL,
	"set" serial NOT NULL,
	"reps" integer NOT NULL,
	"weight" DECIMAL NOT NULL,
	"weightUnit" BINARY NOT NULL,
	"excerciseId" integer NOT NULL,
	CONSTRAINT "exerciseSet_pk" PRIMARY KEY ("setId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.workoutCreateYourOwn" (
	"workoutId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"dateFinished" TIMESTAMP NOT NULL,
	"templateId" integer NOT NULL,
	CONSTRAINT "workoutCreateYourOwn_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.workoutSetup" (
	"templateId" serial NOT NULL,
	"template" serial NOT NULL,
	"numOfDays" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "workoutSetup_pk" PRIMARY KEY ("templateId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.macros" (
	"macrosId" serial NOT NULL,
	"currentProtein" DECIMAL NOT NULL,
	"proteinGoal" DECIMAL NOT NULL,
	"currentCarbs" DECIMAL NOT NULL,
	"carbsGoal" DECIMAL NOT NULL,
	"currentFat" DECIMAL NOT NULL,
	"fatGoal" DECIMAL NOT NULL,
	"calories" DECIMAL NOT NULL,
	"updatedAt" TIMESTAMP NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "macros_pk" PRIMARY KEY ("macrosId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.supplements" (
	"supplementsId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"currentAmount" DECIMAL NOT NULL,
	"goalAmount" DECIMAL NOT NULL,
	"goalUnit" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "supplements_pk" PRIMARY KEY ("supplementsId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "profile" ADD CONSTRAINT "profile_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "oneRepMaxes" ADD CONSTRAINT "oneRepMaxes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "exercise" ADD CONSTRAINT "exercise_fk0" FOREIGN KEY ("workoutId") REFERENCES "workoutCreateYourOwn"("workoutId");

ALTER TABLE "exerciseSet" ADD CONSTRAINT "exerciseSet_fk0" FOREIGN KEY ("excerciseId") REFERENCES "exercise"("exceriseId");

ALTER TABLE "workoutCreateYourOwn" ADD CONSTRAINT "workoutCreateYourOwn_fk0" FOREIGN KEY ("templateId") REFERENCES "workoutSetup"("templateId");

ALTER TABLE "workoutSetup" ADD CONSTRAINT "workoutSetup_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "macros" ADD CONSTRAINT "macros_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "supplements" ADD CONSTRAINT "supplements_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
