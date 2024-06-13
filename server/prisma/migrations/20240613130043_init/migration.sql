-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "progress" INTEGER NOT NULL,
    "date" VARCHAR(300) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Todo_userEmail_idx" ON "Todo"("userEmail");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
