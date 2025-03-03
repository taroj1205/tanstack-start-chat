-- Only create default data if no data was inserted already
DO
$$
BEGIN
    IF (SELECT COUNT(*) FROM "user") = 0 THEN
        -- Default system user
        INSERT INTO "user" (id, name, email, "emailVerified", image, "createdAt", "updatedAt")
        VALUES ('system-user', 'System', 'system@example.com', true, NULL, NOW(), NOW());

        -- Default channels
        INSERT INTO "channel" (name, description, "createdAt", "updatedAt", "createdBy")
        VALUES ('General', 'A place for team-wide communication', NOW(), NOW(), 'system-user'),
               ('Random', 'Off-topic conversations and fun discussions', NOW(), NOW(), 'system-user'),
               ('Help', 'Ask questions and get support from the team', NOW(), NOW(), 'system-user');
    END IF;
END;
$$
LANGUAGE 'plpgsql';