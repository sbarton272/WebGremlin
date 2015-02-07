var ANIMATIONS = {
    "inplace_bird" :
    {
        "type":"ANIMATION_IN_PLACE",
        "img":"res/img/bird.png",
        "width":"180px",
        "height":"123px",
        "no_of_frames":3,
        "fps":12,
        "duration": 2000,
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
        "duration": 2000,
        "sound":"res/audio/giggle 1.wav"
    },
    {
        "type":"ANIMATION_IN_PLACE",
        "img":"res/img/bird.png",
        "width":"180px",
        "height":"123px",
        "no_of_frames":3,
        "fps":24,
        "duration": 2000,
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
        "sound":"res/audio/whoosh 1.wav"
    },
    "drag_bird" :
    {
        "type":"ANIMATION_DRAGGABLE",
        "img":"res/img/bird.png",
        "width":"180px",
        "height":"123px",
        "no_of_frames": 3,
        "fps": 12,
        "play_frames": 30,
        "sound":"res/audio/run.wav"
    },
    "inplace_gremlin" :
    {
        "type":"ANIMATION_IN_PLACE",
        "img":"res/img/innocent.png",
        "width":"170px",
        "height":"228px",
        "no_of_frames":2,
        "fps":4,
        "sound":"res/audio/whistle 2.wav"
    },
    "move_gremlin" :
    {
        "type":"ANIMATION_MOVE",
        "img":"res/img/running.png",
        "width":"170px",
        "height":"211px",
        "no_of_frames":8,
        "fps":3,
        "sound":"res/audio/run.wav"

    },
    "tribbles" :
    {
        "type":"TRIBBLES",
        "sound":"res/audio/poof 1.wav"
    }
};
