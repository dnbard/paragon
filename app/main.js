requirejs.config({
    baseUrl: './app',
    paths: {
        'phaser': '../bower_components/phaser/build/phaser',
        'proto': '../proto'
    },
    shim:{
        'phaser':{
            exports: 'Phaser'
        }
    }
});

// Start the main app logic.
requirejs([
    'phaser',
    'application'
],function(phaser, app){

});
