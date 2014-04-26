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
					uploadFiles(processedFiles, function(response) {
						console.log(response);
					});
				}
			});
		}
	}

	function readFile(f, callback) {
		var reader = new FileReader();
		reader.onloadend = function() {
			var file = {
				'data': f,
				'path': reader.result
			};
			callback(file);
		};
		reader.readAsDataURL(f);
	}

	function uploadFiles(files, callback) {
		var xhr = new XMLHttpRequest();
		var formData = new FormData();
		xhr.onload = function(evt) {
			callback(evt.target.response);
		};
		
		xhr.open("POST", "http://localhost:3000/upload", true);
		xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
		for(var file in files) {
			formData.append("uploads", files[file].data);
		}
		xhr.send(formData);
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