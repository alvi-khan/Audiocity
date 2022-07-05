DROP TABLE IF EXISTS music_files CASCADE;
DROP TABLE IF EXISTS playlist_songs CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE "music_files" (
  "id" int NOT NULL,
  "title" varchar(100) NOT NULL,
  "artist" varchar(100) NOT NULL,
  "album" varchar(100) NOT NULL,
  "uploader" varchar(100) NOT NULL,
  "filepath" varchar(100) NOT NULL,
  "coverpath" varchar(100) NOT NULL
) ;

CREATE TABLE "playlists" (
  "id" int NOT NULL,
  "name" varchar(100) NOT NULL,
  "owner" varchar(100) NOT NULL
) ;

CREATE TABLE "playlist_songs" (
  "playlist_id" int NOT NULL,
  "song_id" int NOT NULL
) ;

CREATE TABLE "users" (
  "email" varchar(100) NOT NULL,
  "password" varchar(100) NOT NULL
) ;

ALTER TABLE "music_files"
  ADD PRIMARY KEY ("id");

ALTER TABLE "playlists"
  ADD PRIMARY KEY ("id");

ALTER TABLE "playlist_songs"
  ADD PRIMARY KEY ("playlist_id","song_id");

ALTER TABLE "users"
  ADD PRIMARY KEY ("email");

ALTER TABLE "music_files"
  ALTER "id" ADD GENERATED ALWAYS AS IDENTITY;

ALTER TABLE "playlists"
  ALTER "id" ADD GENERATED ALWAYS AS IDENTITY;

INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (1, 'Drenched', 'Jordan Winslow', 'Neo Retro', 'admin', './Music Files/eNu2y1L9JMopuIoGDdQF6.mp3', 'eNu2y1L9JMopuIoGDdQF6.jpeg');
INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (2, 'Lose Myself', 'Jordan Winslow', 'Neo Retro', 'admin', './Music Files/_U0BqrKL4i5o67aXhS1Xq.mp3', '_U0BqrKL4i5o67aXhS1Xq.jpeg');
INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (3, 'Warrior', 'Jordan Winslow', 'Beginning', 'admin', './Music Files/MZ1_10YclyEYQF9_d2gVK.mp3', 'MZ1_10YclyEYQF9_d2gVK.jpeg');
INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (4, 'Stars Around Us', 'Jordan Winslow', 'Beginning', 'admin', './Music Files/uKMcoLFCtNNZa0oXFNIIc.wav', 'uKMcoLFCtNNZa0oXFNIIc.jpeg');
INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (5, 'Advertisements', 'Holizna', 'Only In The Milky Way', 'admin', './Music Files/81oECuJTm-UcbDvhRg6es.mp3', '81oECuJTm-UcbDvhRg6es.jpeg');
INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (6, 'Quiet Houses', 'Holizna', 'Only In The Milky Way', 'admin', './Music Files/CuwNfWc18R4QDzw-yzKPu.mp3', 'CuwNfWc18R4QDzw-yzKPu.jpeg');
INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (7, 'Puppy Love', 'Holizna', 'Only In The Milky Way', 'admin', './Music Files/dxor3rNPhn1XDjn3qIBuk.mp3', 'dxor3rNPhn1XDjn3qIBuk.jpeg');
INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (8, 'Triumphant', 'Zakhar Valaha', 'Long', 'admin', './Music Files/EgsvlRD1G-fQRLrxuALT5.mp3', 'EgsvlRD1G-fQRLrxuALT5.jpeg');
INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (9, 'Melody of Nature', 'Zakhar Valaha', 'Main', 'admin', './Music Files/-Jc02zU-M50V5gWBlhZCX.mp3', '-Jc02zU-M50V5gWBlhZCX.jpeg');
INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (10, 'My Life', 'Zakhar Valaha', 'Main', 'admin', './Music Files/i0mRVg8Wxn8UbhA2V7Iw-.mp3', 'i0mRVg8Wxn8UbhA2V7Iw-.jpeg');
INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (11, 'Electronic Rock', 'Alex Grohl', 'King Around Here', 'admin', './Music Files/f9SAJIlwSzrZoVIeeYvJR.mp3', 'f9SAJIlwSzrZoVIeeYvJR.jpg');
INSERT INTO public.music_files OVERRIDING SYSTEM VALUE VALUES (12, 'Stomping Rock', 'Alex Grohl', 'Four Shots', 'admin', './Music Files/m5BuULKRcAByq_RtmYSTI.mp3', 'm5BuULKRcAByq_RtmYSTI.jpg');

INSERT INTO public.playlists OVERRIDING SYSTEM VALUE VALUES (3, 'Favorites', 'admin');

INSERT INTO public.users VALUES ('admin', 'e880dc0067d4f9d2fd74aa6778e49255');

SELECT pg_catalog.setval('music_files_ID_seq', 12, true);

SELECT pg_catalog.setval('playlists_ID_seq', 12, true);