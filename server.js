var path = require('path');
var os = require('os');
var levelup = require('levelup');
var medeadown = require('medeadown');
var zetta = require('zetta');
var Registry = require('zetta/lib/registry');
var PeerRegistry = require('zetta/lib/peer_registry');

var registryDb = levelup(path.join(process.cwd(), '/.registry'), { db: medeadown, valueEncoding: 'json' });
var peerDb = levelup(path.join(process.cwd(), '/.peers'), { db: medeadown, valueEncoding: 'json' });

var registry = new Registry(registryDb);
var peerRegistry = new PeerRegistry(peerDb);

zetta({ registry: registry, peerRegistry: peerRegistry })
  .name(process.env.NAME || os.hostname())
  .listen(process.env.PORT || 3000);
