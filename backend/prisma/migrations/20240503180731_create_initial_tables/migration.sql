-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('image', 'video', 'audio', 'zip', 'document');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('active', 'inative', 'pending');

-- CreateTable
CREATE TABLE "level" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rule" (
    "id" BIGSERIAL NOT NULL,
    "level_id" BIGINT NOT NULL,
    "object" VARCHAR(50) NOT NULL,
    "can_create" BOOLEAN NOT NULL,
    "can_update" BOOLEAN NOT NULL,
    "can_delete" BOOLEAN NOT NULL,
    "can_view" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file" (
    "id" BIGSERIAL NOT NULL,
    "type" "FileType" NOT NULL,
    "filename" VARCHAR(150) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "extension" VARCHAR(30) NOT NULL,
    "mime" VARCHAR(50) NOT NULL,
    "url" VARCHAR(250) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_group" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "admin_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "status" "StatusType" NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "level_id" BIGINT NOT NULL,
    "image_id" BIGINT,
    "admin_group_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- AddForeignKey
ALTER TABLE "rule" ADD CONSTRAINT "rule_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_admin_group_id_fkey" FOREIGN KEY ("admin_group_id") REFERENCES "admin_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
