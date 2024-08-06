var backgroundApp = "#f8f1e7";
var tela = 0;
var telaDificuldade = 6;
var fundoCorNome;
var textoCorNome;
var larguraPrimeiroBotao = 400;
var larguraBotaoSecundario = 300;
var alturaPrimeiroBotao = 50;

var xTextMenuInicio = 300;
var buttonColor = "#20b3c8";
var buttonTextColor = "#fff";
var subTitlesColor = 100;

// Distancia (X) das caixas de fundo dos menus
var xPrimeiroMenu = 100;
var xMenuSecundario = 150;
var xTextSeletorDificuldades = 300;

// Altura (Y) das caixas de fundo dos menus
var yMenu1 = 250;
var yMenu2 = 325;
var yMenu3 = 400;
var yAlturaSeletorDificuldades = 200;

// Botao de voltar a tela
var larguraBackButton = 50;
var alturaBackButton = 50;
var xBackButton = 10;
var yBackButton = 10;

// Configuracao da imagem do logo
var imagemLogo;
var imagemLogoPositionX = 200;
var imagemLogoPositionY = 25;
var imagemLogoDiametro = 200;

// Configuracao da imagem do click
var imgemClick;
var imgemClickPositionX = 250;
var imgemClickPositionY = 100;
var imgemClickDiametro = 100;

// Configuracao da imagem do back button
var backbutton;
var imgemBackButtonPositionX = 20;
var imgemBackButtonPositionY = 20;
var imgemBackButtonDiametro = 30;

// Controle do texto com rolagem
var scrollOffset = 0;
var scrollHeight = 150;
var maxScroll = 200;

//Configuracoes tela de creditos
var xTextCredits = 10;
var yTextCredits1 = 120;
var yTextCredits2 = 320;
var yTextCredits3 = 430;
var xImageCreators = 425;
var xImageQr = 350;
var yImageCreators1 = 100;
var yImageQr = 175;
var yImageCreators2 = 300;
var diameterImageCreators = 125;
var diameterImageQr = 100;

//Iniciando imports de e variaves dos efeitos sonoros
var bgMusic;
var playIcon;
var pauseIcon;
var carregamento = 0;
var tempoCarregamento = 3000;
var tempoInicio;
var cooldown = false;
var cooldownTime = 500;

var isPlaying = localStorage.getItem('isPlaying') === 'true';

var volume = 0.5;
var volumeVisible = false;
var volumeTimer;
var hoverVolume = false;

function preload() {
  imgemClick = loadImage("assets/click.png");
  imagemLogo = loadImage("assets/logo.png");
  playIcon = loadImage("assets/icons/play.png");
  pauseIcon = loadImage("assets/icons/pause.png");
  backButton = loadImage("assets/back.png");
  imageFelipe = loadImage("assets/imgCredits/felipe.jpg");
  imageQr = loadImage("assets/imgCredits/qrFelipe.jpg");
  imageBruno = loadImage("assets/imgCredits/bruno.jpg");
  bgMusic = loadSound("assets/sounds/bgMusic.mp3", () => {
    bgMusic.setVolume(volume);});
  clickSound = loadSound("assets/sounds/click.mp3");
}

function tocarSomClique() {
  clickSound.play();
}

function desenharTelaControles() {
  background(backgroundApp);
  BackButton();

  fill(subTitlesColor);
  textAlign(LEFT);
  textStyle(BOLD);
  textSize(20);
  text("Como jogar:", 60, 100);
  textSize(16);
  fill(240);
  fill(0);
  text(
    "Bem-vindo ao jogo Letras coloridas!\n" +
    "O jogo tem o objetivo simples de testar sua atenção\n" +
    "e foco em meio as adversidades.\n" +
    "Você verá o nome de uma cor no centro da tela\n"+
    "e deve selecionar a cor correspondente a palavra.\n"+
    "Seu principal desafio é acertar a cor sem deixar que\n" +
    "as adversidades te atrapalhem.\n\n" +
    "Dicas:\n" +
    "1. Foque na cor, não no texto que possa surgir\n" +
    "entre as opções de escolha.\n" +
    "2. Você tem 30 segundos para acertar o máximo de cores.\n" +
    "3. Cada acerto vale 10 pontos.\n" +
    "4. Dependendo do nivel que escolher, o jogo será\n" +
    "mais desafiador\n\n" +
    "Divirta-se e teste sua percepção!",
    60, 140, 480
  );
}

function desenharTelaCreditos() {
  background(backgroundApp);
  BackButton();

  fill(subTitlesColor);
    textAlign(LEFT);
    textStyle(BOLD);
    textSize(18);
    text("Créditos: Felipe de Souza França\nContato: dev.felipefrancca@gmail.com", xTextCredits, yTextCredits1);
    image(imageFelipe, xImageCreators, yImageCreators1, diameterImageCreators, diameterImageCreators);
    image(imageQr, xImageQr, yImageQr, diameterImageQr, diameterImageQr);
    text("Créditos: Bruno da Cruz Barbosa\nContato: bruno.cruz.barbosa@gmail.com", xTextCredits, yTextCredits2);
    image(imageBruno, xImageCreators, yImageCreators2, diameterImageCreators, diameterImageCreators);
    text("Créditos da música tema:\n https://www.youtube.com/watch?v=es-CCX2Didw", xTextCredits, yTextCredits3);
}

//Construção do game:
function desenharTelaDificuldades() {
  background(backgroundApp);
  textAlign(CENTER);
  textSize(26);

  textSize(20);
  textAlign(CENTER);
  fill(subTitlesColor);
  noStroke();
  text("Selecione a Dificuldade", xTextSeletorDificuldades, 150);

  var dificuldades = ["Fácil", "Médio", "Difícil"]; 
  for (var i = 0; i < dificuldades.length; i++) {
    if (mouseX > xMenuSecundario && mouseX < xMenuSecundario + larguraBotaoSecundario && mouseY > 200 + i * 60 && mouseY < 200 + alturaPrimeiroBotao + i * 60) {
      cursor(HAND);
      stroke(200);
      strokeWeight(4);
    }
    fill(buttonColor);
    rect(xMenuSecundario, yAlturaSeletorDificuldades + i * 60, larguraBotaoSecundario, alturaPrimeiroBotao, 50);
    fill(buttonTextColor);
    noStroke();
    text(dificuldades[i], xTextSeletorDificuldades, 200 + 33 + i * 60);
  }
  BackButton();
}

var coresHex = ["#0000FF", "#FF0000", "#FFC0CB", "#808080", "#008000", "#800080"];
var coresNome = ["Azul", "Vermelho", "Rosa", "Cinza", "Verde", "Roxo"];

var pontuacao = 0;
var melhorPontuacao = JSON.parse(localStorage.getItem('melhorPontuacao')) || {1: 0, 2: 0, 3: 0};
var tempoRestante = 30;
var tempoInicial;
var jogoAtivo = false;
var corFundoIndex;
var palavrasEmbaralhadas = [...coresNome];
var corAnteriorIndex;

function iniciarJogo() {
  corAtualIndex = int(random(coresNome.length));
  corAnteriorIndex = corAtualIndex;
  atualizarCorFundo();
  tempoInicial = millis();
  jogoAtivo = true;
  pontuacao = 0;

  if (dificuldade == 1) {
    fundoCorNome = "#ffffff";
    textoCorNome = "#000000";
  } else if (dificuldade == 2 || dificuldade == 3) {
    atualizarCorFundo();
    textoCorNome = buttonTextColor;
  }
  console.log("Jogo iniciado com dificuldade: " + dificuldade);
}

function atualizarCorFundo() {
  do {
    corFundoIndex = int(random(coresHex.length));
  } while (corFundoIndex === corAtualIndex || corFundoIndex === corAnteriorIndex);
  corAnteriorIndex = corFundoIndex;
  fundoCorNome = coresHex[corFundoIndex];
}



function desenharTelaJogo() {
  background(backgroundApp);
  BackButton();

  textAlign(CENTER);
  textSize(32);

  fill(fundoCorNome);
  rect(width / 2 - 100, 20, 200, 40, 50);

  fill(textoCorNome);
  text(coresNome[corAtualIndex], width / 2, 50);

  for (var i = 0; i < coresHex.length; i++) {
    fill(coresHex[i]);
    rect(100 + (i % 3) * 150, 150 + int(i / 3) * 100, 80, 80);

    if (dificuldade === 3) {
      let nomeCorIndex;
      do {
        nomeCorIndex = int(random(coresNome.length));
      } while (nomeCorIndex == corAtualIndex);

      fill(0);
      textSize(16);
      textAlign(CENTER, CENTER);
      fill(coresHex[(i + 1) % coresHex.length]);
      text(palavrasEmbaralhadas[i], 140 + (i % 3) * 150, 190 + int(i / 3) * 100);
    }
  }

  fill(0);
  textSize(18);
  text("Pontuação: " + pontuacao, width - 100, 30);

  var tempoPassado = millis() - tempoInicial;
  var tempoTotal = 30;
  tempoRestante = max(0, tempoTotal - int(tempoPassado / 1000));
  fill(255, 0, 0);
  rect(50, 400, (tempoRestante / tempoTotal) * 500, 10);

  fill(0);
  textSize(16);
  text("Tempo: " + tempoRestante, 100, 450);

  if (tempoRestante === 0) {
    desenharTelaFinalizacao();
  }
}

function embaralharCores() {
  for (let i = coresHex.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [coresHex[i], coresHex[j]] = [coresHex[j], coresHex[i]];
    [coresNome[i], coresNome[j]] = [coresNome[j], coresNome[i]];
  }
}

function desenharTelaFinalizacao() {
  background(backgroundApp);
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text("Fim de Jogo!", width / 2, height / 2 - 60);
  textSize(24);

  if (pontuacao > melhorPontuacao[dificuldade]) {
    melhorPontuacao[dificuldade] = pontuacao;
    localStorage.setItem('melhorPontuacao', JSON.stringify(melhorPontuacao));
  }

  text("Sua Pontuação: " + pontuacao, width / 2, height / 2);
  text("Melhor Pontuação: " + melhorPontuacao[dificuldade], width / 2, height / 2 + 40);

  BackButton();
  console.log("Melhor Pontuação:", melhorPontuacao);
}

function mousePressed() {
  if (tela == 2 && jogoAtivo) {
    for (var j = 0; j < coresHex.length; j++) {
      var x = 100 + (j % 3) * 150;
      var y = 150 + int(j / 3) * 100;
      if (mouseX > x && mouseX < x + 80 && mouseY > y && mouseY < y + 80) {
        if (j == corAtualIndex) {
          pontuacao += 10;
        }
        tocarSomClique();
        corAtualIndex = int(random(coresNome.length));
        if (dificuldade == 1) {
          fundoCorNome = "#ffffff";
        } else {
          atualizarCorFundo();
        }
        embaralharCores();
        desenharTelaJogo();
      }
    }
  } else if (tela == 6) {
    var dificuldades = ["Fácil", "Médio", "Difícil"];
    for (var k = 0; k < dificuldades.length; k++) {
      if (mouseX > xMenuSecundario && mouseX < xMenuSecundario + larguraBotaoSecundario && mouseY > 200 + k * 60 && mouseY < 200 + alturaPrimeiroBotao + k * 60) {
        dificuldade = k + 1;
        console.log("Dificuldade selecionada: " + dificuldade);
        tocarSomClique();
        tela = 2;
        iniciarJogo();
      }
    }
  }
}

function setup() {
  createCanvas(600, 500);
  tempoInicio = millis();
  corAtualIndex = int(random(coresNome.length));
  melhorPontuacao = JSON.parse(localStorage.getItem('melhorPontuacao')) || {1: 0, 2: 0, 3: 0};  
  bgMusic.setVolume(volume);
  if (isPlaying) {
    bgMusic.loop();
  }
}

function draw() {
  cursor(ARROW);
  
  if (tela == 0) {
    background(backgroundApp);
    image(imagemLogo, imagemLogoPositionX, imagemLogoPositionY, imagemLogoDiametro, imagemLogoDiametro);

    var tempoAtual = millis() - tempoInicio;
    carregamento = map(tempoAtual, 0, tempoCarregamento, 0, 400);
    fill(buttonColor);
    noStroke();
    rect(100, 300 - 10, carregamento, 10, 20);

    if (tempoAtual >= tempoCarregamento) {
      tela = 1;
    }
  } else if (tela == 1) {
    background(backgroundApp);
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(26);

    image(imagemLogo, imagemLogoPositionX, imagemLogoPositionY, imagemLogoDiametro, imagemLogoDiametro);

    if (mouseX > xPrimeiroMenu && mouseX < xPrimeiroMenu + larguraPrimeiroBotao && mouseY > yMenu1 && mouseY < yMenu1 + alturaPrimeiroBotao) {
      cursor(HAND);
      stroke(200);
      strokeWeight(4);
      if (mouseIsPressed) {
        tocarSomClique();
        tela = telaDificuldade;
      }
    }

    fill(buttonColor);
    rect(xPrimeiroMenu, yMenu1, larguraPrimeiroBotao, alturaPrimeiroBotao, 50);
    fill(buttonTextColor);
    noStroke();
    text("Iniciar", xTextMenuInicio, yMenu1 + 33);

    if (mouseX > xMenuSecundario && mouseX < xMenuSecundario + larguraBotaoSecundario && mouseY > yMenu2 && mouseY < yMenu2 + alturaPrimeiroBotao) {
      cursor(HAND);
      stroke(200);
      strokeWeight(4);
      if (mouseIsPressed) {
        tocarSomClique();
        tela = 3;
      }
    }
    fill(buttonColor);
    rect(xMenuSecundario, yMenu2, larguraBotaoSecundario, alturaPrimeiroBotao, 50);
    fill(buttonTextColor);
    noStroke();
    text("Como jogar", xTextMenuInicio, yMenu2 + 33);

    if (mouseX > xMenuSecundario && mouseX < xMenuSecundario + larguraBotaoSecundario && mouseY > yMenu3 && mouseY < yMenu3 + alturaPrimeiroBotao) {
      cursor(HAND);
      stroke(200);
      strokeWeight(4);
      if (mouseIsPressed) {
        tocarSomClique();
        tela = 4;
      }
    }
    fill(buttonColor);
    rect(xMenuSecundario, yMenu3, larguraBotaoSecundario, alturaPrimeiroBotao, 50);
    fill(buttonTextColor);
    noStroke();
    text("Créditos", xTextMenuInicio, yMenu3 + 33);

  } else if (tela == 2) {
    desenharTelaJogo();
    
  } else if (tela == 3) {
    desenharTelaControles();

  } else if (tela == 4) {
    desenharTelaCreditos();
    
  } else if (tela == 5) {
    desenharTelaFinalizacao();
    
  } else if (tela == telaDificuldade) {
    desenharTelaDificuldades();
  }

  playerBgMusic();
}



function BackButton() {
  if (mouseX > xBackButton && mouseX < xBackButton + larguraBackButton && mouseY > yBackButton && mouseY < yBackButton + alturaBackButton) {
    stroke(200);
    strokeWeight(4);
    if (mouseIsPressed) {
      tocarSomClique();
      tela = 1;
    }
  }
  fill(buttonColor);
  rect(xBackButton, yBackButton, larguraBackButton, alturaBackButton, 50);
  fill(0);
  noStroke();
  image(backButton, imgemBackButtonPositionX, imgemBackButtonPositionY, imgemBackButtonDiametro, imgemBackButtonDiametro);
}


function playerBgMusic() {
  fill(buttonColor);
  stroke(buttonTextColor);
  strokeWeight(4);
  rect(width - 62, height - 62, 50, 50, 6);
  image(isPlaying ? playIcon : pauseIcon, width - 52, height - 52, 30, 30);

  if (mouseX > width - 62 && mouseX < width - 12 && mouseY > height - 62 && mouseY < height - 12) {
    clearTimeout(volumeTimer);
    volumeVisible = true;
  } else if (volumeVisible && (mouseX < width - 72 || mouseX > width - 62 || mouseY < height - 162 || mouseY > height - 62)) {
    volumeTimer = setTimeout(() => {
      volumeVisible = false;
    }, 3000);
  }

  if (mouseIsPressed && !cooldown && mouseX > width - 62 && mouseX < width - 12 && mouseY > height - 62 && mouseY < height - 12) {
    cooldown = true;
    tocarSomClique();

    if (isPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.loop();
    }

    isPlaying = !isPlaying;
    localStorage.setItem('isPlaying', isPlaying);

    setTimeout(function() {
      cooldown = false;
    }, cooldownTime);
  }

  if (volumeVisible) {
  fill(buttonColor);
  rect(width - 42, height - 162, 10, 100, 5);
  let volumeY = map(volume, 0, 1, height - 62, height - 162);
  fill(buttonTextColor);
  ellipse(width - 37, volumeY, 10, 10);

  if (mouseIsPressed && mouseX > width - 42 && mouseX < width - 32 && mouseY > height - 162 && mouseY < height - 62) {
    volume = constrain(map(mouseY, height - 62, height - 162, 0, 1), 0, 1);
    bgMusic.setVolume(volume);
  }
}
}