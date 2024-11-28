create table roles(
role_id SERIAL not null,
name varchar(20) not null,
primary key(role_id)
);
create table Permissions(
Permission_id SERIAL not null,
Permission varchar(20) not null,
primary key(Permission_id)
);
CREATE TABLE rolePermissions (
  rolePermissions_id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (permission_id) REFERENCES Permissions(Permission_id),
  PRIMARY KEY (rolePermissions_id)
);
CREATE TABLE users (
  user_id SERIAL NOT NULL,
    user_name varchar (255),
      first_name varchar (255),
        last_name varchar(255),
          email varchar(255) UNIQUE,
            password varchar(255),
              country varchar(255),
                birth_date date,
                  profile_image text DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinMNf_Hjwf-aKigY4eASZhdz3F1WxJBIbuQ&s',
                    bio varchar(255),
                      created_at timestamp default now(),
                        role_id integer,
                          is_deleted smallint default 0,
                            foreign KEY(role_id) references roles(role_id),
                              PRIMARY KEY (user_id)
                              );
CREATE TABLE posts (
  post_id SERIAL NOT NULL,
  body text,
  image varchar(255),
  video varchar(255),
  user_id integer,
  created_at timestamp default now(),
  updated_at timestamp,
  is_deleted smallint default 0,
  foreign KEY(user_id) references users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (post_id)
);
CREATE TABLE comments (
  comment_id SERIAL NOT NULL,
  comment text,
  commenter integer,
  post_id integer,
  created_at timestamp default now(),
  updated_at timestamp,
  is_deleted smallint default 0,
  foreign KEY(commenter) references users(user_id) ON DELETE CASCADE,
  foreign KEY(post_id) references posts(post_id) ON DELETE CASCADE,
  PRIMARY KEY (comment_id)
);
CREATE TABLE savedPost (
 id serial Primary key,
 post_id integer ,
 user_id integer,
saved_at timestamp default now(),
 foreign key (post_id) references posts.post_id,
 foreign key (user_id) references users.user_id
);
CREATE TABLE reacts (
  react_id SERIAL NOT NULL,
  user_id integer,
  post_id integer,
  comment_id integer,
  reacts text [],
  is_deleted smallint default 0,
  foreign KEY(comment_id) references comments(comment_id) ON DELETE CASCADE,
  foreign KEY(post_id) references posts(post_id) ON DELETE CASCADE,
  foreign KEY(user_id) references users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (react_id)
);
CREATE TABLE followers (
  follow_id SERIAL NOT NULL,
  follower_id integer,
  following_id integer,
  followed_at timestamp default now(),
  is_deleted smallint default 0,
  foreign KEY(following_id) references users(user_id) ON DELETE CASCADE,
  foreign KEY(follower_id) references users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (follow_id)
);
CREATE TABLE messages (
  message_id SERIAL NOT NULL,
  sender integer,
  receiver integer,
  message_text text ,
  created_at timestamp default now(),
  is_deleted smallint default 0,
  foreign KEY(sender) references users(user_id) ON DELETE CASCADE,
  foreign KEY(receiver) references users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (message_id)
);
CREATE TABLE notifications (
  notification_id SERIAL NOT NULL,
  user_id integer,
  action varchar(100),
  notification_time timestamp default now(),
  foreign KEY(user_id) references users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (notification_id)
);
CREATE TABLE greetings (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  recipient_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    postId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(post_id) ON DELETE CASCADE,
    UNIQUE (userId, postId)
);
CREATE TABLE privacy_settings (
    u_id INT NOT NULL,
    profile_visibility VARCHAR(20) DEFAULT('Public'),
    blocked_accounts TEXT,
    FOREIGN KEY (u_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE security_settings (
    userid INT NOT NULL,
    two_factor_auth BOOLEAN DEFAULT FALSE,
    active_sessions JSON, 
    FOREIGN KEY (userid) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE contact_us (
    id SERIAL PRIMARY KEY,
    person_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_person FOREIGN KEY (person_id) REFERENCES users(user_id) ON DELETE CASCADE
);

