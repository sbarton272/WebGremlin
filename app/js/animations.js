var ANIMATIONS = {
    "inplace_bird" :
    {
        "type":"ANIMATION_IN_PLACE",
        "img":"res/img/bird.png",
        "width":"180px",
        "height":"123px",
        "no_of_frames":3,
        "fps":12,
        "duration": 5000,
        "sound":"res/audio/giggle 1.wav"
    },
    "multi_inplace_bird" :
    [{
        "type":"ANIMATION_IN_PLACE",
        "img":"res/img/bird.png",
        "width":"180px",
        "height":"123px",
        "no_of_frames":3,
        "fps":12,
        "duration": 5000,
        "sound":"res/audio/giggle 1.wav"
    },
    {
        "type":"ANIMATION_IN_PLACE",
        "img":"res/img/bird.png",
        "width":"180px",
        "height":"123px",
        "no_of_frames":3,
        "fps":24,
        "duration": 5000,
        "sound":"res/audio/giggle 4.wav"
    }],
    "move_bird" :
    {
        "type":"ANIMATION_MOVE",
        "img":"res/img/bird.png",
        "width":"180px",
        "height":"123px",
        "no_of_frames":3,
        "fps":12,
        "duration": 10000,
        "sound":"res/audio/whoosh 1.wav"
    },
    "whistle_gremlin" :
    {
        "type":"ANIMATION_IN_PLACE",
        "img":"res/img/innocent.png",
        "width":"170px",
        "height":"228px",
        "no_of_frames":2,
        "fps":3,
        "duration": 10000,
        "sound":"res/audio/whistle 2.wav"
    },
    "running_gremlin" :
    {
        "type":"ANIMATION_MOVE",
        "img":"res/img/running.png",
        "width":"170px",
        "height":"211px",
        "no_of_frames":8,
        "fps":3,
        "duration": 10000,
        "sound":"res/audio/run.wav"
    },
    "random_gremlin" :
    {
        "type":"ANIMATION_RANDOM",
        "img":"res/img/running.png",
        "width":"170px",
        "height":"211px",
        "no_of_frames":8,
        "fps":6,
        "duration": 1000,
        "sound":"res/audio/run.wav"
    },

    "tribbles" :
    {
        "type":"TRIBBLES",
        "sound":"res/audio/poof 1.wav"
    }
};
