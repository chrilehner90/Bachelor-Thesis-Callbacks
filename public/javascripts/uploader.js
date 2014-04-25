window.onload = function() {

	function handleFileInput(evt) {
		var files = evt.target.files;
		console.log(files.length);
		
		var processedFiles = []

		for(var i = 0; i < files.length; i++) {
			f = files[i];
			readFile(f, function(data) {	
				processedFiles.push(data);
				if(processedFiles.length === files.length) {
					console.log("readFiles");
				}
				//console.log(processedFiles);
				
				
			});
		}
		
		console.log("TEST");
	}

	function readFile(f, callback) {
		setTimeout(function() {
			var reader = new FileReader();
			reader.onloadend = function() {
				var file = {
					'data': f,
					'path': reader.result
				};
				callback(file);
			};
			reader.readAsDataURL(f);
		}, 0, f, callback);
	}


	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		document.getElementById('files').addEventListener('change', handleFileInput, false);

		// Click button to see that the site is still responding while it reads the files
		document.getElementById('btn').addEventListener('click', function() {
			console.log("clicked");
		}, false);
	}
	else {
		alert('The File APIs are not fully supported in this browser.');
	}

};