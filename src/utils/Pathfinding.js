import Phaser from 'phaser';

export function findNearestEntity(fromEntity, entityList) {
    if (!entityList || entityList.length === 0) {
        return null;
    }

    return entityList.reduce((nearest, current) => {
        const nearestDistance = Phaser.Math.Distance.Between(
            fromEntity.x,
            fromEntity.y,
            nearest.x,
            nearest.y
        );
        const currentDistance = Phaser.Math.Distance.Between(
            fromEntity.x,
            fromEntity.y,
            current.x,
            current.y
        );

        return nearestDistance <= currentDistance ? nearest : current;
    });
}
