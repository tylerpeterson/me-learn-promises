/*
 * This sample shows you what goes wrong when you pass a deferred to the allSettled function instead of deferred.promise.
 * You can run this sample with node:
 * > node allSettledOnDeferred.js
 */

var Q = require('q');
var _ = require('underscore');
var debug = require('debug')('me-learn-promises');
var dfd1 = Q.defer();
var dfd2 = Q.defer();

_.delay(function () {
  debug('Resolving...');
  dfd1.resolve('one');
  dfd2.resolve('two');
  debug('Resolving... DONE!');
}, 50);

/* THE CRUCIAL DECISION
 * The next few vars and function make it easy to switch between the working abd broken versions of this sample.
 */

var PASS_PROMISES = true;
var PASS_NAKED_DEFERREDS = false;

function crucialDecision(usePromises) {
  if (usePromises) {
    return [dfd1.promise, dfd2.promise];
  }
  return [dfd1, dfd2];
}


/*
 * If you pass naked deferred objects to allSettled then it completes before the deferreds are resolved.
 */

debug('calling allSettled');

Q.allSettled(crucialDecision(PASS_NAKED_DEFERREDS)).then(function (results) {
  debug("Finished");
});
