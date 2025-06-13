/* @name CountUsersByCreatedAt */
/* @param created_at:timestamp */
SELECT
    COUNT(*) AS count
FROM
    users
WHERE
    created_at >= :created_at
    AND is_active = TRUE;