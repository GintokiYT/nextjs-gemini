-- CreateTable
CREATE TABLE "UnansweredQuestions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "UnansweredQuestions_pkey" PRIMARY KEY ("id")
);
