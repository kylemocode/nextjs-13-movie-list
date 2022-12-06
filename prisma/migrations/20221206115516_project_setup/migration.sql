-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "genre" TEXT,
    "studio" TEXT,
    "user_rating" INTEGER,
    "profitability" DOUBLE PRECISION,
    "rotten_tomatoes" INTEGER,
    "worldwide_gross" DOUBLE PRECISION,
    "year" INTEGER,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "author" TEXT,
    "content" TEXT,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
