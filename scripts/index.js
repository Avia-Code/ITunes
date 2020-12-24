import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivation = () => {
    temp.style = 'display:none;'
    playerBtn.forEach((item)=>{ item.classList.remove('active')});
    playerBlock.forEach((item) => { item.classList.remove('active') });
    
    radioPlayerInit.stop();
    musicPlayerInit.stop();
    videoPlayerInit.stop();
};

playerBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        deactivation();
        btn.classList.add('active');
        playerBlock[index].classList.add('active');
    });
});

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();