var userFeed = new Instafeed({
    get: 'user',
    target: "instafeed-container",
    resolution: 'low_resolution',
    limit: 2,
    accessToken: 'IGQVJXVVpzc3llYVpfSUU0YUtzazdvQm1CUHpyTl83cTViRTl2NjVTMEJnYTBQT09vYjVPZAXhRRmhLUzF4VF9BSmdDeUhkcldoN0lMTlo1T0VFNy1rcTh2N2R5bmRJZAGRuSWpvZAmxnQTdaWHV3Ty1FdgZDZD'
});
userFeed.run();