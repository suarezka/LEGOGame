/**
 * Created by Hans Dulimarta on 4/5/17.
 */
define(function (require) {
    var THREE = require('../vendor/three');

    class LegoBrick {
        constructor(size, color) {
            var NUM_GROOVES;
            var BRICK_LENGTH;

            const BRICK_WIDTH = 50;
            const CYL_RAD = 12;
            const CYL_DIA = 24;

            switch (size) {
                case 8: {
                    NUM_GROOVES = 8;
                    BRICK_LENGTH = 96;
                    break;
                }
                case 4: {
                    NUM_GROOVES = 4;
                    BRICK_LENGTH = 48;
                    break;
                }
                case 2: {
                    NUM_GROOVES = 2;
                    BRICK_LENGTH = 24;
                    break;
                }
            }

            const brickGroup = new THREE.Group();
            const brickGeo = new THREE.BoxGeometry(BRICK_WIDTH, BRICK_LENGTH, BRICK_WIDTH);
            const brickMat = new THREE.MeshPhongMaterial({color: color});
            const brick = new THREE.Mesh(brickGeo, brickMat);

            const grooveGeo = new THREE.CylinderGeometry(10, 10, 10, 10);
            const grooveMat = new THREE.MeshPhongMaterial({color: color});
            const groove = new THREE.Mesh(grooveGeo, grooveMat);

            for (let k = 0; k < NUM_GROOVES; k++) {
                const g = groove.clone();
                g.translateZ(50);
                g.translateY(-(BRICK_LENGTH / 2) + CYL_RAD);

                if (k >= (NUM_GROOVES / 2)) {
                    g.translateY((k - (NUM_GROOVES / 2)) * (CYL_DIA));
                    g.translateX(-(BRICK_WIDTH / 2) + CYL_RAD);
                    g.rotateX(Math.PI / 2);
                } else {

                    g.translateY(k * (CYL_DIA));
                    g.translateX((BRICK_WIDTH / 2) - CYL_RAD);
                    g.rotateX(Math.PI / 2);
                }

                brickGroup.add(g);
            }

            brick.translateZ(25);

            brickGroup.add(brick);
            return brickGroup;
        }
    }

    return LegoBrick;
});
