export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeader = document.querySelector('.radio-header__big');
    const radioCover__img = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelectorAll('.radio-volume');
    const radioProgress = document.querySelector('.radio-progress');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        }
        else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    const selectItem = () => { 
        radioItem.forEach((item) => {
            item.classList.remove('select');
        })
    };

    const changeVolumeRadio = () => {
        const value = radioProgress.value / 100;
        audio.volume = value;
    };

    radioNavigation.addEventListener('change', (event) => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        const title = parrent.querySelector('.radio-name').textContent;
        const imgSrc = parrent.querySelector('.radio-img').src;

        selectItem();
        parrent.classList.add('select');

        radioHeader.textContent = title;

        radioCover__img.src = imgSrc;

        radioStop.disabled = false;

        audio.src = target.dataset.radioStantion;

        audio.play();

        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }
        changeIconPlay();
    });

    radioProgress.addEventListener('input', changeVolumeRadio);
    changeVolumeRadio();

    radioVolume.forEach((button, index) => {
        audio.addEventListener('timeupdate', () => {
            radioProgress.value = audio.volume * 100;
        })
        button.addEventListener('click', () => {
            if (index === 0) {
                audio.volume = 0;
            }
            if (index === 1) {
                audio.volume = 1;
            }
        })
    })

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };

};