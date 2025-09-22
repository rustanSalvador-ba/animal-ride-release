import * as me from 'melonjs'
import data from '../../data/data.js'

export default class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // add a gray background to the default Stage
        // game.world.addChild(new ColorLayer("background", "#202020"));

        // // add a font text display object
        // HUDContainer.game.world.addChild(new me.BitmapText(game.viewport.width / 2, game.viewport.height / 2,  {
        //     font : "PressStart2P",
        //     size : 4.0,
        //     textBaseline : "middle",
        //     textAlign : "center",
        //     text : "Aventuras de Nina"
        // }));
        me.level.load("mapa3");
		// reset the score
		data.score = 0;

		// add our HUD to the game world
		this.HUD = new me.Container();
		me.game.world.addChild(this.HUD);
        
    }

    onDestroyEvent() {
		me.game.world.removeChild(this.HUD);
	}
};
