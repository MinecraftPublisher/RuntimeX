/*
 *
 * RuntimeX.JS
 * Embed power in your websites.
 * Made by martia_f
 * Licensed under the MIT license.
 * 
 */

// Creates a DOM observer callback to monitor the body element and detect added script tags.
var observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function( obj, callback ){
    if( !obj || obj.nodeType !== 1 ) return; 

    if( MutationObserver ){
      var mutationObserver = new MutationObserver(callback)
      mutationObserver.observe( obj, { childList:true, subtree:true })
      return mutationObserver
    }
    else if( window.addEventListener ){
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})()