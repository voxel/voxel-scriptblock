'use strict';

module.exports = function(game, opts) {
  return new ScriptblockPlugin(game, opts);
};
module.exports.pluginInfo = {
  loadAfter: ['voxel-registry', 'voxel-blockdata']
};

function ScriptblockPlugin(game, opts) {
  this.game = game;

  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-scriptblock requires "voxel-registry" plugin');

  this.blockdata = game.plugins.get('voxel-blockdata');
  if (!this.blockdata) throw new Error('voxel-scriptblock requires "voxel-blockdata" plugin');

  this.enable();
}

ScriptblockPlugin.prototype.enable = function() {
  this.registry.registerBlock('scriptblock', {
    texture: 'command_block',
    onInteract: ScriptblockPlugin.prototype.interact.bind(this)
  });

  // TODO: recipe?
};

ScriptblockPlugin.prototype.disable = function() {
  // TODO: unregister block
};

ScriptblockPlugin.prototype.interact = function(target) {
  console.log(target);
  // TODO: prompt for script, set at x,y,z
};
