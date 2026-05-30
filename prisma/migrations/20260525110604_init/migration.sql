-- CreateEnum
CREATE TYPE "CollegeType" AS ENUM ('IIT', 'NIT', 'IIIT', 'DEEMED', 'PRIVATE', 'GOVERNMENT');

-- CreateEnum
CREATE TYPE "Exam" AS ENUM ('JEE_MAIN', 'JEE_ADVANCED', 'CAT', 'NEET', 'GATE', 'XAT');

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "type" "CollegeType" NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "totalFees" INTEGER NOT NULL,
    "established" INTEGER NOT NULL,
    "overview" TEXT NOT NULL,
    "naacGrade" TEXT,
    "nirfRank" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "fees" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "degree" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Placement" (
    "id" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "averagePackage" INTEGER NOT NULL,
    "highestPackage" INTEGER NOT NULL,
    "placementRate" DOUBLE PRECISION NOT NULL,
    "topRecruiters" TEXT[],

    CONSTRAINT "Placement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "batch" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "pros" TEXT NOT NULL,
    "cons" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankCutoff" (
    "id" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "exam" "Exam" NOT NULL,
    "category" TEXT NOT NULL,
    "rankMin" INTEGER NOT NULL,
    "rankMax" INTEGER NOT NULL,
    "course" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "RankCutoff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_slug_key" ON "College"("slug");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankCutoff" ADD CONSTRAINT "RankCutoff_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
