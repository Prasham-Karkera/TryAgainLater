-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Easy', 'Medium', 'Hard');

-- CreateTable
CREATE TABLE "Platform" (
    "platform_id" SERIAL NOT NULL,
    "platform_name" TEXT NOT NULL,
    "platform_url" TEXT NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("platform_id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "topic_id" SERIAL NOT NULL,
    "topic_name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("topic_id")
);

-- CreateTable
CREATE TABLE "Question" (
    "question_id" SERIAL NOT NULL,
    "platform_id" INTEGER NOT NULL,
    "external_question_id" TEXT NOT NULL,
    "question_title" TEXT NOT NULL,
    "difficulty" "Difficulty",
    "problem_url" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "QuestionTopic" (
    "question_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,

    CONSTRAINT "QuestionTopic_pkey" PRIMARY KEY ("question_id","topic_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "current_streak" INTEGER NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "total_questions_solved" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserPlatformHandle" (
    "user_id" INTEGER NOT NULL,
    "platform_id" INTEGER NOT NULL,
    "platform_handle" TEXT NOT NULL,

    CONSTRAINT "UserPlatformHandle_pkey" PRIMARY KEY ("user_id","platform_id")
);

-- CreateTable
CREATE TABLE "UserSolvedQuestion" (
    "user_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "solved_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_taken" INTEGER,

    CONSTRAINT "UserSolvedQuestion_pkey" PRIMARY KEY ("user_id","question_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_topic_name_key" ON "Topic"("topic_name");

-- CreateIndex
CREATE UNIQUE INDEX "Question_platform_id_external_question_id_key" ON "Question"("platform_id", "external_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platform"("platform_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTopic" ADD CONSTRAINT "QuestionTopic_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTopic" ADD CONSTRAINT "QuestionTopic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("topic_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlatformHandle" ADD CONSTRAINT "UserPlatformHandle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlatformHandle" ADD CONSTRAINT "UserPlatformHandle_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platform"("platform_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSolvedQuestion" ADD CONSTRAINT "UserSolvedQuestion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSolvedQuestion" ADD CONSTRAINT "UserSolvedQuestion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;
