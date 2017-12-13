-- DROP DATABASE IF EXISTS events;
--
-- CREATE DATABASE events;
--
-- \connect events;
--
-- CREATE TABLE users (
--   user_id INTEGER NOT NULL PRIMARY KEY,
--   user_name VARCHAR(30) NULL DEFAULT NULL,
--   location_id INTEGER NOT NULL REFERENCES location (location_id),
-- );
--
-- CREATE TABLE calendar (
--   date_id INTEGER NOT NULL PRIMARY KEY,
--   full_date DATE NOT NULL,
--   day INTEGER NOT NULL,
--   week INTEGER NOT NULL,
--   month INTEGER NOT NULL,
--   year INTEGER NOT NULL,
-- );
--
-- CREATE TABLE userSongStatistics (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL REFERENCES users (user_id),
--   date_id INTEGER NOT NULL REFERENCES calendar (date_id),
--   shufflePlayCount INTEGER NOT NULL,
--   regularPlayCount INTEGER NOT NULL,
--   shuffleSkipCount INTEGER NOT NULL,
--   regulaySkipCount INTEGER NOT NULL,
--   queryCount INTEGER NOT NULL
-- );
--
-- CREATE TABLE songSession (
--   song_session_id INTEGER NOT NULL,
--   user_id INTEGER NOT NULL REFERENCES users (user_id),
--   date_id INTEGER NOT NULL REFERENCES calendar (date_id),
--   song_chunk_id INTEGER NOT NULL REFERENCES songChunk (song_chunk_id),
--   location_id INTEGER NOT NULL REFERENCES location (location_id),
--   song_title VARCHAR NOT NULL,
--   song_id INTEGER NOT NULL,
--   song_length INTEGER NOT NULL
-- );
--
-- CREATE TABLE songChunk (
--   song_chunk_id SERIAL NOT NULL PRIMARY KEY,
--   chunk_length INTEGER NOT NULL,
--   start_time INTEGER NOT NULL
-- );
--
-- CREATE TABLE location (
--   location_id INTEGER NOT NULL PRIMARY KEY,
--   city_id INTEGER NOT NULL REFERENCES city (city_id),
--   state_providence_id INTEGER NOT NULL REFERENCES stateProvidence (state_providence_id),
--   country_id INTEGER NOT NULL REFERENCES country (country_id)
-- );
--
-- CREATE TABLE city (
--   city_id SERIAL PRIMARY KEY,
--   city_name VARCHAR NOT NULL
-- );
--
-- CREATE TABLE stateProvidence (
--   state_providence_id SERIAL PRIMARY KEY,
--   state_providence_name VARCHAR NOT NULL
-- );
--
-- CREATE TABLE country (
--   country_id SERIAL PRIMARY KEY,
--   country_name VARCHAR NOT NULL
-- );
--
-- CREATE TABLE userQueries (
--   query_id SERIAL NOT NULL PRIMARY KEY,
--   user_id INTEGER NOT NULL REFERENCES users (user_id),
--   date_id integer NOT NULL REFERENCES calendar (date_id),
--   query_string VARCHAR NOT NULL
-- );

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'user'
--
-- ---

DROP DATABASE IF EXISTS events;

CREATE DATABASE events;

\connect events;

-- DROP TABLE IF EXISTS user;

CREATE TABLE user (
  id SERIAL,
  user_name VARCHAR(20) NOT NULL,
  id_location INTEGER NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'calendar'
--
-- ---

-- DROP TABLE IF EXISTS calendar;

CREATE TABLE calendar (
  date_id TIMESTAMP,
  day DATE,
  week INTEGER NULL,
  month INTEGER NULL,
  year DATE,
  PRIMARY KEY (date_id)
);

-- ---
-- Table 'userSongStatistics'
--
-- ---

-- DROP TABLE IF EXISTS userSongStatistics;

CREATE TABLE userSongStatistics (
  id INTEGER AUTO_INCREMENT DEFAULT 1,
  date_id_calendar TIMESTAMP,
  id_user INTEGER NOT NULL,
  shuffle_play_count INTEGER DEFAULT 0,
  regular_play_count INTEGER DEFAULT 0,
  shuffle_skip_count INTEGER DEFAULT 0,
  regular_skip_count INTEGER DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table 'userQueryStatistics'
--
-- ---

-- DROP TABLE IF EXISTS userQueryStatistics;

CREATE TABLE userQueryStatistics (
  id INTEGER AUTO_INCREMENT DEFAULT 1,
  id_user INTEGER NOT NULL,
  query_string VARCHAR(20) NOT NULL,
  query_count INTEGER NOT NULL DEFAULT 0,
  date_id_calendar TIMESTAMP,
  PRIMARY KEY (id)
);

-- ---
-- Table 'songChunks'
--
-- ---

-- DROP TABLE IF EXISTS songChunks;

CREATE TABLE songChunks (
  song_chunk_id INTEGER AUTO_INCREMENT DEFAULT 1,
  start_time INTEGER NOT NULL,
  chunk_length INTEGER NOT NULL,
  PRIMARY KEY (song_chunk_id)
);

-- ---
-- Table 'songSession'
--
-- ---

-- DROP TABLE IF EXISTS songSession;

CREATE TABLE songSession (
  song_session_id INTEGER AUTO_INCREMENT DEFAULT 1,
  date_id_calendar TIMESTAMP NOT NULL DEFAULT,
  id_user INTEGER NOT NULL,
  song_chunk_id_songChunks INTEGER NULL,
  id_location INTEGER NULL DEFAULT NULL,
  song_title VARCHAR(30) NOT NULL DEFAULT,
  song_id INTEGER NOT NULL,
  song_length INTEGER NOT NULL,
  PRIMARY KEY (song_session_id)
);

-- ---
-- Table 'location'
--
-- ---

-- DROP TABLE IF EXISTS location;

CREATE TABLE location (
  id INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  id_city INTEGER NULL DEFAULT NULL,
  id_stateProvidence INTEGER NULL DEFAULT NULL,
  id_country INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'city'
--
-- ---

-- DROP TABLE IF EXISTS city;

CREATE TABLE city (
  id INTEGER AUTO_INCREMENT DEFAULT 1,
  city_name VARCHAR(30) NOT NULL DEFAULT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'stateProvidence'
--
-- ---

-- DROP TABLE IF EXISTS stateProvidence;

CREATE TABLE stateProvidence (
  id INTEGER AUTO_INCREMENT DEFAULT 1,
  state_providence_name VARCHAR(30) NOT NULL DEFAULT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'country'
--
-- ---

-- DROP TABLE IF EXISTS country;

CREATE TABLE country (
  id INTEGER AUTO_INCREMENT DEFAULT 1,
  country_name VARCHAR(30) NOT NULL DEFAULT,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE user ADD FOREIGN KEY (id_location) REFERENCES location (id);
ALTER TABLE userSongStatistics ADD FOREIGN KEY (date_id_calendar) REFERENCES calendar (date_id);
ALTER TABLE userSongStatistics ADD FOREIGN KEY (id_user) REFERENCES user (id);
ALTER TABLE userQueryStatistics ADD FOREIGN KEY (id_user) REFERENCES user (id);
ALTER TABLE userQueryStatistics ADD FOREIGN KEY (date_id_calendar) REFERENCES calendar (date_id);
ALTER TABLE songSession ADD FOREIGN KEY (date_id_calendar) REFERENCES calendar (date_id);
ALTER TABLE songSession ADD FOREIGN KEY (id_user) REFERENCES user (id);
ALTER TABLE songSession ADD FOREIGN KEY (song_chunk_id_songChunks) REFERENCES songChunks (song_chunk_id);
ALTER TABLE songSession ADD FOREIGN KEY (id_location) REFERENCES location (id);
ALTER TABLE location ADD FOREIGN KEY (id_city) REFERENCES city (id);
ALTER TABLE location ADD FOREIGN KEY (id_stateProvidence) REFERENCES stateProvidence (id);
ALTER TABLE location ADD FOREIGN KEY (id_country) REFERENCES country (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE user ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE calendar ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE userSongStatistics ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE userQueryStatistics ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE songChunks ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE songSession ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE location ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE city ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE stateProvidence ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE country ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO user (id,user_name,id_location) VALUES
-- ('','','');
-- INSERT INTO calendar (date_id,day,week,month,year) VALUES
-- ('','','','','');
-- INSERT INTO userSongStatistics (id,date_id_calendar,id_user,shuffle_play_count,regular_play_count,shuffle_skip_count,regular_skip_count) VALUES
-- ('','','','','','','');
-- INSERT INTO userQueryStatistics (id,id_user,query_string,query_count,date_id_calendar) VALUES
-- ('','','','','');
-- INSERT INTO songChunks (song_chunk_id,start_time,chunk_length) VALUES
-- ('','','');
-- INSERT INTO songSession (song_session_id,date_id_calendar,id_user,song_chunk_id_songChunks,id_location,song_title,song_id,song_length) VALUES
-- ('','','','','','','','');
-- INSERT INTO location (id,id_city,id_stateProvidence,id_country) VALUES
-- ('','','','');
-- INSERT INTO city (id,city_name) VALUES
-- ('','');
-- INSERT INTO stateProvidence (id,state_providence_name) VALUES
-- ('','');
-- INSERT INTO country (id,country_name) VALUES
-- ('','');
