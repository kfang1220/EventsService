DROP DATABASE IF EXISTS events;

CREATE DATABASE events;

\connect events;
-- ---
-- Table 'calendar'
--
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id INTEGER NOT NULL,
  user_name VARCHAR(30) NOT NULL,
  location VARCHAR(30) NOT NULL,
  PRIMARY KEY (user_id)
);


DROP TABLE IF EXISTS calendar;

CREATE TABLE calendar (
  date_id SERIAL NOT NULL,
  date INTEGER NOT NULL
  day INTEGER NOT NULL,
  week INTEGER NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  PRIMARY KEY (date_id)
);


-- ---
-- Table 'userSongStatistics'
--
-- ---

DROP TABLE IF EXISTS userSongStatistics;

CREATE TABLE userSongStatistics (
  id SERIAL,
  user_id_users INTEGER NOT NULL ,
  date_id_calendar INTEGER NOT NULL,
  shuffle_play_count INTEGER NOT NULL DEFAULT 0,
  regular_play_count INTEGER NOT NULL DEFAULT 0,
  shuffle_skip_count INTEGER NOT NULL DEFAULT 0,
  regular_skip_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table 'userQueryStatistics'
--
-- ---

DROP TABLE IF EXISTS userQueryStatistics;

CREATE TABLE userQueryStatistics (
  id SERIAL,
  user_id_users INTEGER NOT NULL ,
  date_id_calendar INTEGER NOT NULL,
  query_string VARCHAR(30) NOT NULL,
  query_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table 'songChunks'
--
-- ---

DROP TABLE IF EXISTS songChunks;

CREATE TABLE songChunks (
  song_chunk_id SERIAL,
  chunk_length INTEGER NOT NULL,
  PRIMARY KEY (song_chunk_id)
);

-- ---
-- Table 'songSession'
--
-- ---

DROP TABLE IF EXISTS songSession;

CREATE TABLE songSession (
  id SERIAL,
  user_id_users INTEGER NOT NULL ,
  date_id_calendar INTEGER NOT NULL,
  song_chunk_id_songChunks INTEGER NOT NULL,
  song_id INTEGER NOT NULL,
  song_length INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'location'
--
-- ---

DROP TABLE IF EXISTS location;

-- CREATE TABLE location (
--   id SERIAL,
--   -- id_city INTEGER NOT NULL,
--   id_stateProvidence INTEGER NOT NULL,
--   -- id_country INTEGER NULL,
--   PRIMARY KEY (id)
-- );

-- ---
-- Table 'city'
--
-- ---

DROP TABLE IF EXISTS city;

-- CREATE TABLE city (
--   id SERIAL,
--   city_name VARCHAR(30) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- ---
-- Table 'country'
--
-- ---

DROP TABLE IF EXISTS country;

-- CREATE TABLE country (
--   id SERIAL,
--   country_name VARCHAR(30) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- ---
-- Table 'stateProvidence'
--
-- ---

DROP TABLE IF EXISTS stateProvidence;

-- CREATE TABLE stateProvidence (
--   id SERIAL,
--   state_providence_name VARCHAR(30) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- ---
-- Foreign Keys
-- ---

ALTER TABLE userSongStatistics ADD FOREIGN KEY (user_id_users) REFERENCES users (user_id);
ALTER TABLE userSongStatistics ADD FOREIGN KEY (date_id_calendar) REFERENCES calendar (date_id);
ALTER TABLE userQueryStatistics ADD FOREIGN KEY (user_id_users) REFERENCES users (user_id);
ALTER TABLE userQueryStatistics ADD FOREIGN KEY (date_id_calendar) REFERENCES calendar (date_id);
ALTER TABLE songSession ADD FOREIGN KEY (user_id_users) REFERENCES users (user_id);
ALTER TABLE songSession ADD FOREIGN KEY (date_id_calendar) REFERENCES calendar (date_id);
ALTER TABLE songSession ADD FOREIGN KEY (song_chunk_id_songChunks) REFERENCES songChunks (song_chunk_id);
-- ALTER TABLE users ADD FOREIGN KEY (id_location) REFERENCES location (id);
-- ALTER TABLE location ADD FOREIGN KEY (id_city) REFERENCES city (id);
-- ALTER TABLE location ADD FOREIGN KEY (id_stateProvidence) REFERENCES stateProvidence (id);
-- ALTER TABLE location ADD FOREIGN KEY (id_country) REFERENCES country (id);
