export const videoPlayerInit = () => {
    const playerBlock = document.querySelector('.player-block');
    const videoPlayer = document.querySelector('.video-player');
    const videoButton__play = document.querySelector('.video-button__play');
    const videoButton__stop = document.querySelector('.video-button__stop');
    const videoTime__passed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTime__total = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoVolumePlus = document.querySelector('.video-icon--plus');
    const videoVolumeMinus = document.querySelector('.video-icon--minus');
    const videoFullscreen = document.querySelector('.video-fullscreen');

    const toggleIcon = () => {
        videoButton__play.classList.toggle('fa-play');
        videoButton__play.classList.toggle('fa-pause');
    };

    const togglePlay = (event) => {
        event.preventDefault();
        if (videoPlayer.paused) {
            videoPlayer.play();
        }
        else {
            videoPlayer.pause();
        }
    }

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    const changeVolume = () => {
        const volume = videoVolume.value;
        videoPlayer.volume = volume / 100;
        localStorage.setItem('volumeLevel', volume / 100);
    };

    const addZero = n => n < 10 ? '0' + n : n;

    const changeVolumeProgress = () => {
        const volume = videoPlayer.volume;
        videoVolume.value = volume * 100;
    };

    const toggleFullScreen = () => {
        videoPlayer.requestFullscreen();
    }

    videoPlayer.addEventListener('click', togglePlay);

    videoButton__play.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);

    videoPlayer.addEventListener('pause', toggleIcon);

    videoButton__stop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = Math.round(videoPlayer.currentTime);
        const duration = videoPlayer.duration;
        videoProgress.value = (currentTime / duration * 100);

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTime__passed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTime__total.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    })

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;


        videoPlayer.currentTime = value * duration / 100;
    })

    videoVolume.addEventListener('input', changeVolume);
    // console.log(videoPlayer.volume);
    changeVolume();
    // console.log(videoPlayer.volume);

    videoPlayer.addEventListener('volumechange', changeVolumeProgress);

    videoVolumePlus.addEventListener('click', () => {

        if (videoPlayer.volume !== 1) {
            videoPlayer.volume = 1;
        }
        else {
            videoPlayer.volume = localStorage.getItem('volumeLevel');
        }

    })

    videoVolumeMinus.addEventListener('click', () => {

        if (videoPlayer.volume !== 0) {
            videoPlayer.volume = 0;
        }
        else {
            videoPlayer.volume = localStorage.getItem('volumeLevel');
        }

    })

    videoFullscreen.addEventListener('click', toggleFullScreen);

    document.body.addEventListener('keydown', (event) => {
        if (event.code === 'KeyF' && playerBlock.classList.contains('active')) {
            toggleFullScreen();
            console.dir(toggleFullScreen);
        }
    })

    

};

