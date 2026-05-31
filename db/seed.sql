-- Sample data so the site looks alive on first run.
-- Safe to skip or delete. Re-running clears and re-inserts sample rows.

TRUNCATE classmates, memorials, feed_posts, flashback_photos RESTART IDENTITY;

INSERT INTO classmates (full_name, maiden_name, occupation, bio, current_city, lat, lng, photo_then_url, photo_now_url) VALUES
('Jordan Avery', NULL, 'Software Engineer', 'Moved west after college, still play in a weekend soccer league.', 'Seattle, WA', 47.6062, -122.3321, NULL, NULL),
('Maria Delgado', 'Reyes', 'Pediatric Nurse', 'Married my high school sweetheart, three kids and a golden retriever.', 'Austin, TX', 30.2672, -97.7431, NULL, NULL),
('Trevor Banks', NULL, 'Small Business Owner', 'Opened a coffee roastery downtown — come say hi at the reunion!', 'Chicago, IL', 41.8781, -87.6298, NULL, NULL),
('Priya Nair', NULL, 'Architect', 'Designing libraries and the occasional treehouse.', 'Boston, MA', 42.3601, -71.0589, NULL, NULL),
('Sam Whitfield', NULL, 'Teacher', 'Came back to teach at our old school. The cafeteria is exactly the same.', 'Springfield, IL', 39.7817, -89.6501, NULL, NULL);

INSERT INTO memorials (full_name, birth_year, passed_year, tribute, photo_url) VALUES
('Daniel Cooper', 1987, 2019, 'Class clown with the biggest heart. Missed every single day.', NULL),
('Aisha Bennett', 1987, 2023, 'Captain of the debate team and a friend to everyone. Forever in our memory.', NULL);

INSERT INTO feed_posts (author, body) VALUES
('Trevor Banks', 'Anyone else still have their letterman jacket? Asking for a friend (me).'),
('Maria Delgado', 'Cannot WAIT for October. Who is coming in from out of state?'),
('Sam Whitfield', 'Found a box of old prom photos in my parents'' attic. Bringing them to scan!');
