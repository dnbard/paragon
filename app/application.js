define(['phaser', 'preload'], function(Phaser, preload){
    var game = new Phaser.Game('100', '100', Phaser.CANVAS, 'phaser-example', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    var cursors;

    function create() {
        game.world.setBounds(0, 0, 1920, 1200);
        game.add.sprite(1000, 100, 'backdrop');
        cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
        if (cursors.up.isDown)
        {
            game.camera.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            game.camera.y += 4;
        }

        if (cursors.left.isDown)
        {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            game.camera.x += 4;
        }
    }

    function render() {
        game.debug.cameraInfo(game.camera, 8, 16);

        game.debug.text('Click to toggle sprite / camera movement with cursors', 32, 550);

    }

    return game;
});
