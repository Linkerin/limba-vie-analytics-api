-- CreateTable
CREATE TABLE "analytics" (
    "id" SERIAL NOT NULL,
    "pathname" VARCHAR(255) NOT NULL,
    "os" TEXT,
    "os_version" TEXT,
    "engine" TEXT,
    "engine_version" TEXT,
    "device_type" TEXT,
    "device_model" TEXT,
    "device_vendor" TEXT,
    "browser" TEXT,
    "browser_version" TEXT,
    "country" TEXT,
    "city" TEXT,
    "ip" TEXT,
    "user_id" TEXT,
    "bot" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "web_vitals" (
    "id" SERIAL NOT NULL,
    "metric_id" VARCHAR(255) NOT NULL,
    "metric_name" TEXT NOT NULL,
    "navigation_type" TEXT,
    "rating" TEXT,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "web_vitals_pkey" PRIMARY KEY ("id")
);
