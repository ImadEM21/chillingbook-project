var userFeed = new Instafeed({
    get: 'user',
    target: "instafeed-container",
    resolution: 'low_resolution',
    limit: 2,
    accessToken: 'IGQVJVSXp5Tl8tUlM5YnVvck13ZAHUyQzBXRV9rUnJOQW1sZAHJ0b0FHbFd2S2FRZA05iaTE5UktSMUJUX1FIU1RlTUJpVVpCdnlLdzZAmUGpzd0tpS3VrMjdiUk9YUnZAOVlBCVnI2TG1rMnJiUURXbVk2SAZDZD'
});
userFeed.run();