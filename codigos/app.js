const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');

const alienImg = ['img/monster1.png', 'img/monter2.png', 'img/monster3.png'];
const intructionText= document.querySelector('.game-instrutions');
const startButtom = document.querySelector('.start-buttom');
let alienInterval;

//Ativar movimentos
function flyShip(event){
    if (event.key === 'ArrowUp'){
        event.preventDefaut;
        moveUp()
    } else if (event.key === 'ArrowDown'){
        event.preventDefaut;
        moveDown()
    } else if (event.key === ' '){
        event.preventDefaut;
        fireLaser();
    }
}

// Função de subir nave

function moveUp(){
    //Pega o valor que esta em your ship e passa para inteiro.
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if (topPosition === "0px"){
        return
    } else {
        let position = parseInt(topPosition);
        position += -50;
        yourShip.style.top=`${position}px`;
    }
}

//Função de descer a nave

function moveDown(){

//Trás toda a propriedade de CSS 
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');

    if (topPosition === "500px"){
        return
    } else {
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = `${position}px`
    }
}
//Funcionalidade de tiro
function fireLaser() {
    let laser= createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement(){
    //Posição exata de left e top do personagem 
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => { //comparando se cada alien foi atingido, se sim, troca o src da imagem
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })

        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

//Função inimigos sortear qual inimigo vai aparecer de forma aleatoria ;

function createAlien(){
    let newAlien = document.createElement('img');
    let alienSprite = alienImg[Math.floor(Math.random()* alienImg.length)]; //Sorteio de imagem

    newAlien.src= alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top= `${Math.floor(Math.random() * 330)+ 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

//Movimentação dos inimigos
function moveAlien(alien){
    let moveAlienInterval = setInterval(() => {

        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= 50) {
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                //gameOver();
            }
        } else {
            alien.style.left = `${xPosition - 4}px`;
        }
    }, 30);
}

//Função para colisão

function checkLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;
    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//Inicio do jogo

startButtom.addEventListener('click', (event)=>{
    playGame();
})


function playGame() {
    startButtom.style.display = 'none';
    intructionText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    alienInterval = setInterval(() => {
        createAlien();
    }, 2000);
}


//Função de GameOver();

function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());

    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());

    setTimeout(() => {
        alert('game over!');
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}
