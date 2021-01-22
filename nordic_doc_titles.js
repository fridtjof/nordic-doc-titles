let tocFrame = undefined

function updateTitle() {
	window.document.title = tocFrame.document.getElementsByClassName("active")[0].title
}

function registerMutationListener() {
	// the currently selected documentation section has an 'active' class attached to it
	// so we react to this class changing to set the current title

	let dumpObserver = new MutationObserver((mutations) => {
		// we could use the mutations array to check if we should actually do something
		// but as this is (from what I've seen) the only case,
		// it's more efficient to just update the title anyway

		updateTitle()
	})

	// we could narrow our observer down by using the following target,
	// but using the body is more resistant to (unlikely) ID changes
	// am i putting too much thought into this?

	//let observationTarget = tocFrame.document.getElementById('tree_root');
	let observationTarget = tocFrame.document.body

	dumpObserver.observe(
		observationTarget,
		{
			subtree: true,
			// TODO maybe childList is redundant? (if it only monitors direct children)
			childList: true,
			attributes: true,
			attributeFilter: ['class']
		}
	)

	// initially set the title
	updateTitle()
}


//so. we have to wait for this entire chain of frames to load
// problem: they're set up using JS in the respective frames,
// so we can't rely on the browser to run this script late enough
// (technically, the page is "loaded" once the first layer of frames is there)

//so..... we're just going to loop and sleep until it's there

// i don't know why
// i've stopped caring why
// but (at least) firefox does not like await here
// so I'll do it the old way

function waitForFullLoad() {
	setTimeout(function() {
		try {
			// getting frames using their names does not work anymore??? it just randomly stopped working
			// tocFrame = window.frames.HelpFrame.frames.NavFrame.frames.ViewsFrame.frames.toc.frames.tocViewFrame;
			tocFrame = window.frames[2].frames[0].frames[0].frames[0].frames[1];
			
			registerMutationListener()
		} catch (e) { // something in the chain does not exist yet
			//ignore errors and try again next time
			waitForFullLoad()
		}
	}, 1000)
}

waitForFullLoad()