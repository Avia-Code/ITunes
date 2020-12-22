export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButton__play = document.querySelector('.video-button__play');
    const videoButton__stop = document.querySelector('.video-button__stop');
    const videoTime__passed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTime__total = document.querySelector('.video-time__total');

    const toggleIcon = () => {
        videoButton__play.classList.toggle('fa-play');
        videoButton__play.classList.toggle('fa-pause');
    };

    const togglePlay = () => {
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

    const addZero = n => n < 10 ? '0' + n : n;

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

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;


        videoPlayer.currentTime = value * duration / 100;
    })
};

