import Phaser from "phaser";
import Boot from "./src/Boot";
import Play from "./src/Play";

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'game-container',
    zoom: 1,
    width: 640,
    height: 480,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    mode: Phaser.Scale.NONE
  },
  backgroundColor: 0x444444,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: [Boot, Play]
};

new Phaser.Game(config);