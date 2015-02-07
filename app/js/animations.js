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
        "fps":12
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
    "bird_back_and_forth" :
    [{
      // TODO  
    }]
};
