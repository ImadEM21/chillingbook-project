var userFeed = new Instafeed({
    get: 'user',
    target: "instafeed-container",
    resolution: 'low_resolution',
    limit: 2,
    accessToken: 'INSTAGRAM_TOKEN'
});
userFeed.run();
