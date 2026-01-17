import Phaser from 'phaser';
import { ASSETS } from '../config/AssetConfig.js';

class Boot extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        Object.entries(ASSETS).forEach(([key, path]) => {
            this.load.image(key, path);
        });
    }

    create() {
        this.scene.start('Play');
    }
}

export default Boot;
