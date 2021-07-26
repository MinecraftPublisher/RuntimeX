/*
 *
 * RuntimeX.JS
 * Embed power in your websites.
 * Made by martia_f
 * Licensed under the MIT license.
 * 
 */

// RuntimeX's startup function\
// Adds NES.CSS, this will be removed in the production build.
document.innerHTML += `
	<link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet"/>`

// Add the console.runlog dialog
document.innerHTML += `<!-- Runtimex's dialog -->
	<dialog class="nes-dialog" id="runtimex-dialog">
    <form method="dialog">
      <p class="run-title"></p>
      <p class="run-text"></p>
      <menu class="dialog-menu">
        <button class="nes-btn is-primary">OK</button>
      </menu>
    </form>
  </dialog>
</section>`

// Adds console.runlog to make sure they are shown as a dialog.
console.runlog = (function (text) {
	document.querySelector("run-title").innerText = "RuntimeX error"
	document.querySelector("run-text").innerText = text
	document.querySelector("runtimex-dialog").showModal()
})

// Creates a DOM observer callback to monitor the body element and detect added script tags.
const observeDOM = (function () {
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver

	return function (obj, callback) {
		if (!obj || obj.nodeType !== 1) return

		if (MutationObserver) {
			var mutationObserver = new MutationObserver(callback)
			mutationObserver.observe(obj, { childList: true, subtree: true })
			return mutationObserver
		}
		else if (window.addEventListener) {
			obj.addEventListener('DOMNodeInserted', callback, false)
			obj.addEventListener('DOMNodeRemoved', callback, false)
		}
	}
})()

// Process and append a script with type text/runtime to the runner list.
const RuntimeX = (function (obj) {
	if (obj.tagName == "SCRIPT") {
		if (obj.type == "text/runtime") {
			RuntimeX.list.push(obj)
		}
		else {
			// Given object is not a text/runtime script, initiate fallback.

			return "Error: Given object is not a RuntimeX script."
		}
	}
	else {
		// Given object is not a script, initiate fallback.

		return "Error: Given object is not a script."
	}
})

RuntimeX.listRunner = (function () {
	RuntimeX.list.forEach(function (obj) {
		if ((obj.tagName == "SCRIPT") && (obj.type = "text/runtime")) {
			// Check if the object's RuntimeX is compiled or no
			if (obj.getAttribute("compiled") && obj.getAttribute("error") == 0) {
				// Check if the RuntimeX element is executed or no.
				if (obj.getAttribute("run") == "true") {
					// The element has been ran before, just execute the RUNTIME function.
				}
				else {
					// The element hasn't been ran before, run the MAIN function.
				}
			}
			else {
				if (obj.getAttribute("error") == "0") {
					// The element isn't compiled, compile it first, then proceed.
				}
				else {
					// The element has an error, abort.
				}
			}
		}
		else {
			// RuntimeX list contains a non-script element, REMOVE IT IMMEDIATELY.

			RuntimeX.list.splice(RuntimeX.list.indexOf(obj), 1)
		}
	})
})

RuntimeX.tools = (function(data) {
	RuntimeX.tools.index = 0
	RuntimeX.tools.data = data
})

RuntimeX.tools.peek = (function() {
	return RuntimeX.tools.data[RuntimeX.tools.index++]
})

RuntimeX.tools.get = (function() {
	return RuntimeX.tools.data[RuntimeX.tools.index]
})

RuntimeX.tools.readToWhitespace = (function() {
	var result = ""

	while(RuntimeX.tools.get().match(/\s/g) == null) {
		result += RuntimeX.tools.peek()
	}

	return result
})

RuntimeX.compile = (function (obj) {
	if ((obj.tagName == "SCRIPT") && (obj.type = "text/runtime")) {
		
	}
	else {
		obj.setAttribute("error", "1")
		console.log("Error: Element compilation failed, element is not a script with type \"text/runtime\".")
	}
})

// Observe the document body and look for Nodes added to the document body. If there are removed nodes, also remove them from the RuntimeX scripts.
observeDOM(document.body, function (m) {
	var addedNodes = [], removedNodes = []
	m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
	m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))

	addedNodes.forEach(node => {
		RuntimeX(node)
	})

	removedNodes.forEach(node => {
		// Check if RuntimeX scripts contains the removed element.
		if (RuntimeX.list.indexOf(node) > -1) {
			// The list contains the removed element, remove the element from the list.
			RuntimeX.list.splice(RuntimeX.list.indexOf(node), 1)
		}
		else {
			// The list doesn't contain the removed element, ignore.
		}
	})
})

// Run the listRunner every second.
RuntimeX.interval = setInterval(RuntimeX.listRunner, 1000)

RuntimeX.list = []