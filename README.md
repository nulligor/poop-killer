# Poop Killer 💩

## Agradecimentos
Esse projeto foi totalmente feito na plataforma [Phaser.js](http://phaser.io/) utilizando sua versão 3 (suporte ES6).

## Requisitos
Você precisa de [Node.js](https://nodejs.org) para instalar e rodar os scripts.

## Instalar e Rodar
Abra seu terminal, `cd` no diretório da aplicação e:

| Command | Description |
|---------|-------------|
| `npm install` | Instala as dependências.|
| `npm start` | Roda o bundler da aplicação e inicia um proceso **http-server**. <br> Pressione `Ctrl + c` para matar o processo. |

----
<br>

## Documentação

### Objetivo: 
Derrotar o **Chefe Cocozão** e conseguir o seu diploma.

### Gênero: 
Plataforma 2D

### Recursos: 
* Node.js, 
* Phaser.js
* Git/Github
* Um editor de texto
* Windows (💩)
* (???) mãos

### Estrutura de pastas: 
```
.
|   index.html
|   LICENSE
|   package.json
|   README.md
|   webpack.config.js
|
+---assets
|   +---font
|   |       font.fnt
|   |       font.png
|   |
|   +---icon
|   |       favicon.ico
|   |
|   +---img
|   |       background.png
|   |       boss.png
|   |       boss_2.png
|   |       boss_bullet.png
|   |       bullet.png
|   |       diploma.png
|   |       platform.png
|   |
|   \---sprites
|           contra.png
|
\---src
        BootScene.js
        GameOverScene.js
        index.js
        MainScene.js
        TitleScene.js
```

### Funcionamento da Aplicação: 

* Ao rodar `npm start` estamos invocando o comando `scripts.start` dentro de `package.json`, assim, invocando consequentemente o nosso bundler [Webpack](https://webpack.js.org/) que pega todo o conteúdo localizado em `/src` e cria o arquivo `build/project.bundle.js` com todo o nosso código dentro, referenciado pelo arquivo `index.html`, sendo assim servimos um web-server com uma página HTML e dentro dela todo o nosso código Javascript, a bundle começa invocando `index.js` na estrutura de pastas.
* Seguindo a documentação (ainda escassa) do Framework (Phaser) https://photonstorm.github.io/phaser3-docs/#api-documentation houve a separação de cenas a serem carregadas pela aplicação: 
 
        BootScene,  // <-- carrega os componentes visuais (assets)
        TitleScene,  // <-- cena do inicio
        MainScene,   // <-- cena principal (toda a lógica reside aqui)
        GameOverScene // <-- cena de fim de jogo

* MainScene...