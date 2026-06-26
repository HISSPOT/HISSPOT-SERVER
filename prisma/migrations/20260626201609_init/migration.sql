-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "kakao_id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "profile_image_url" TEXT,
    "is_onboarded" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kings" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "order_number" INTEGER NOT NULL,
    "short_description" TEXT,
    "description" TEXT,
    "image_url" TEXT,

    CONSTRAINT "kings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "king_tags" (
    "id" SERIAL NOT NULL,
    "king_id" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "king_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "king_spots" (
    "id" SERIAL NOT NULL,
    "king_id" INTEGER NOT NULL,
    "spot_id" INTEGER NOT NULL,

    CONSTRAINT "king_spots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_collections" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "king_id" INTEGER NOT NULL,
    "collected_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spots" (
    "id" SERIAL NOT NULL,
    "content_id" TEXT,
    "name" TEXT NOT NULL,
    "area_code" INTEGER,
    "sigungu_code" INTEGER,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "image_url" TEXT,
    "opening_hours" TEXT,
    "closed_days" TEXT,
    "admission_fee" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" SERIAL NOT NULL,
    "king_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "tag" TEXT,
    "estimated_minutes" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_spots" (
    "id" SERIAL NOT NULL,
    "route_id" INTEGER NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "order_number" INTEGER NOT NULL,

    CONSTRAINT "route_spots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_routes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "route_id" INTEGER NOT NULL,
    "saved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_routes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_kakao_id_key" ON "users"("kakao_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "user_collections_user_id_king_id_key" ON "user_collections"("user_id", "king_id");

-- CreateIndex
CREATE UNIQUE INDEX "route_spots_route_id_spot_id_key" ON "route_spots"("route_id", "spot_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_routes_user_id_route_id_key" ON "user_routes"("user_id", "route_id");

-- AddForeignKey
ALTER TABLE "king_tags" ADD CONSTRAINT "king_tags_king_id_fkey" FOREIGN KEY ("king_id") REFERENCES "kings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "king_spots" ADD CONSTRAINT "king_spots_king_id_fkey" FOREIGN KEY ("king_id") REFERENCES "kings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "king_spots" ADD CONSTRAINT "king_spots_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collections" ADD CONSTRAINT "user_collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collections" ADD CONSTRAINT "user_collections_king_id_fkey" FOREIGN KEY ("king_id") REFERENCES "kings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_king_id_fkey" FOREIGN KEY ("king_id") REFERENCES "kings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_spots" ADD CONSTRAINT "route_spots_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_spots" ADD CONSTRAINT "route_spots_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_routes" ADD CONSTRAINT "user_routes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_routes" ADD CONSTRAINT "user_routes_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
