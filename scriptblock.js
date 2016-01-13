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
  var x = target.voxel[0];
  var y = target.voxel[1];
  var z = target.voxel[2];

  var bd = this.blockdata.get(x, y, z);
  if (!bd) {
    bd = {script: 'alert("Hello, voxel world!")'};
  }

  // interact (right-click) with top to set script, other sides to run
  // TODO: run script when block takes damage instead (left-click)
  if (target.side === 'top') {
    bd.script = prompt("Script for block at ("+[x,y,z].join(",")+"): ", bd.script);

    this.blockdata.set(x, y, z, bd);
  } else {
    eval(bd.script);
  }
};
