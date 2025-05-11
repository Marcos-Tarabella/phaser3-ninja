// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("hello-world");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("sky", "./public/assets/cielo.webp");
    this.load.image("ninja", "./public/assets/Ninja.png");
    this.load.image("plataform", "./public/assets/platform.png");
    this.load.image("diamond", "./public/assets/diamond.png")
    this.load.image("triangle", "./public/assets/triangle.png")
    this.load.image("square", "./public/assets/square.png")
    this.load.image("bana", "./public/assets/bana.png")
   
  }

  create() {
    // create game objects
    this.add.image(400, 300, "sky").setScale(2)
    this.ninja= this.physics.add.image(400, 300, 'ninja').setScale(0.1);
    this.plataformas = this.physics.add.staticGroup();
    this.plataformas.create(400, 580, 'plataform').setScale(2).refreshBody(); 
    this.plataformas.create(200, 400, 'plataform').setScale(0.5).refreshBody(); 
    this.plataformas.create(600, 300, 'plataform').setScale(0.5).refreshBody(); 


    this.physics.add.collider(this.ninja, this.plataformas,);
    this.teclas = this.input.keyboard.addKeys({
      A: 'A',
      D: 'D',
    LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,   
    RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    R: Phaser.Input.Keyboard.KeyCodes.R,
    SALTO: Phaser.Input.Keyboard.KeyCodes.W,  
    SALTO_UP: Phaser.Input.Keyboard.KeyCodes.UP
    });
    this.ninja.setCollideWorldBounds(true);
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


    this.timeLeft = 30; 
    this.gameOver = false;
    this.timeText = this.add.text(700, 30, `Time: ${this.timeLeft}`, {
      fontSize: '32px',
      fill: '#000'
    });

    this.timeText.setOrigin(0.5, 0.5);

   
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (!this.gameOver) {
          this.timeLeft -= 1;
          this.timeText.setText(`Time: ${this.timeLeft}`);

          if (this.timeLeft <= 0) {
            this.timer.remove(); 
            this.physics.pause(); 
            this.ninja.setVelocity(0, 0); 
            this.gameOver = true;
            this.generadorItems.remove()
             this.scene.start('EscenaFinal', { puntaje: this.puntaje, ganaste: false });
          }
        }
      },
      loop: true
    });

    this.items = this.physics.add.group();

      this.puntaje = 0;
  this.textoPuntaje = this.add.text(16, 16, `Puntaje: ${this.puntaje}`, {
    fontSize: '32px',
    fill: '#000'
  });

  
  this.generadorItems = this.time.addEvent({
    delay: 500,
    callback: () => {
      this.tiposItems = ['diamond', 'triangle', 'square',"bana"];
      this.tipoItem = Phaser.Utils.Array.GetRandom(this.tiposItems);
      this.posXItem = Phaser.Math.Between(50, 750);
      this.item = this.physics.add.sprite(this.posXItem, 0, this.tipoItem)
      if (this.tipoItem === 'bana') {
      this.item.setScale(0.2);  
    } else {
      this.item.setScale(0.4);  
    }


      this.item.setVelocityY(100);
      this.item.setCollideWorldBounds(true);
      this.item.setBounce(0.7);
      this.item.rebotes = 0; 


      this.physics.add.collider(this.item, this.plataformas, (item, plataforma) => {
      item.rebotes++;  

      if (item.rebotes >= 5) {
    item.destroy(); 
     }
  });


      
      this.physics.add.overlap(this.ninja, this.item, this.recolectarItem, null, this);
    },
    loop: true
  });
}


recolectarItem(ninja, item) {
  let puntos = 0;

 
  if (item.texture.key === 'diamond') {
    puntos = 10;
  } else if (item.texture.key === 'triangle') {
    puntos = 5;
  } else if (item.texture.key === 'square') {
    puntos = 1;
  }
 if (item.texture.key === 'bana') {
    puntos = -5;
  }


  
  this.puntaje += puntos;
  this.textoPuntaje.setText(`Puntaje: ${this.puntaje}`);
  item.destroy(); 

   if (this.puntaje >= 100) {
    this.physics.pause();
    this.generadorItems.remove(); 
    this.ninja.setVelocity(0, 0); 
   this.timer.remove();
  }
if (this.timeLeft <= 0 || this.puntaje >= 100) {
  let ganaste = this.puntaje >= 100;
  this.scene.start('EscenaFinal', { puntaje: this.puntaje, ganaste: ganaste });
}


  }

  update() {
    if (this.teclas.A.isDown || this.teclas.LEFT.isDown) {
      this.ninja.setVelocityX(-250); 
    } else if (this.teclas.D.isDown || this.teclas.RIGHT.isDown) {
      this.ninja.setVelocityX(250); 
    } else {
      this.ninja.setVelocityX(0); 
    }
    if (this.teclas.R.isDown) {
      this.scene.restart();
    }

   if ((this.teclas.SALTO.isDown || this.teclas.SALTO_UP.isDown) && !this.saltando) {
  this.saltando = true;
  this.ninja.setVelocityY(-300);
}
if (this.ninja.body.touching.down) {
  this.saltando = false; 
}
  }



}
