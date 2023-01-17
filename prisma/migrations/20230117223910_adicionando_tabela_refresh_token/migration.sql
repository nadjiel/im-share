-- CreateTable
CREATE TABLE "refresh_token" (
    "token" TEXT NOT NULL,
    "expires" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
