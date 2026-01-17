export function addRandomImages(scene, countObj) {
    const { width, height } = scene.sys.game.canvas;

    Object.entries(countObj).forEach(([spriteName, count]) => {
        for (let i = 0; i < count; i++) {
            const randomX = Phaser.Math.Between(0, width);
            const randomY = Phaser.Math.Between(0, height);
            scene.add.image(randomX, randomY, spriteName);
        }
    });
}
