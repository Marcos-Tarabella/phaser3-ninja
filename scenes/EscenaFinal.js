export class EscenaFinal extends Phaser.Scene {
  constructor() {
    super('EscenaFinal');
  }

  init(data) {
    
    this.puntaje = data.puntaje; 
    this.ganaste = data.ganaste; 
  }

  preload() {
  this.load.image("final", "./public/assets/FondoMenu.jpg");
  }

  create() {
 

 this.add.image(400, 300, 'final')


    this.add.text(400, 200, this.ganaste ? '¡Ganaste!' : 'Perdiste', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);

 
    this.add.text(400, 300, `Puntos: ${this.puntaje}`, {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

   
    this.add.text(400, 400, 'Presiona R para reiniciar', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    
    this.teclas = this.input.keyboard.addKeys({ R: Phaser.Input.Keyboard.KeyCodes.R });
  }

  update() {
   
    if (this.teclas.R.isDown) {
      this.scene.start('hello-world');
    }
  }
}