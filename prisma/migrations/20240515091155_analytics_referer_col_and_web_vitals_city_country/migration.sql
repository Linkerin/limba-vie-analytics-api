-- AlterTable
ALTER TABLE "analytics" ADD COLUMN     "referer" TEXT;

-- AlterTable
ALTER TABLE "web_vitals" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT;
