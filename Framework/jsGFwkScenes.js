jsGFwk.Scenes = (function() {

	function scene(parameters) {
		var self = this;
		var _sceneObjects = parameters.gameObjects || [];
		
		this.setGameObjects = function(objects) {
			if (objects == undefined) { return; }
			_sceneObjects = objects;
		};
		
		this.disable = function() {
			var i = 0;
			for (; i < _sceneObjects.length; _sceneObjects[i++].destroy());
		};
		
		this.enable = function() {
			var i = 0;
			for (; i < _sceneObjects.length; jsGFwk.createObject(_sceneObjects[i++]));
		};
	}

	_onStart = function () { };
	_onObjectCreated = function (newObject) { };
	
	return {
		onStart: _onStart,
		onObjectCreated: _onObjectCreated,
		scenes: {},
		create: function (parameters) {
			if (parameters.name == undefined) { return; }
			this.scenes[parameters.name] = new scene(parameters);
		}
	};
})();