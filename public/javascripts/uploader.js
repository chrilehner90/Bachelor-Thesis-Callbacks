window.onload = function() {
	'use strict';
	function handleFileInput(evt) {
		var files = evt.target.files;
		var processedFiles = [];
		var f;
		for(var i = 0; i < files.length; i++) {
			f = files[i];
			readFile(f, function(err, data) {
				if(err) console.error(err);
				else {
					processedFiles.push(data);
					if(processedFiles.length === files.length) {
						uploadFiles(processedFiles, function(err, response) {
							if(err) console.error(err);
							else {
								console.log(response);
							}
						});
					}
				}
			});
		}
	}

	function readFile(f, callback) {
		var reader = new FileReader();
		reader.onload = function() {
			var file = {
				'data': f,
				'path': reader.result
			};
			callback(null, file);
		};
		reader.onerror = function(evt) {
			callback(evt.target.error.message);
		};
		reader.readAsDataURL(f);
	}

	function uploadFiles(files, callback) {
		var xhr = new XMLHttpRequest();
		var formData = new FormData();
		xhr.onload = function() {
			if(xhr.status == 200) {
				callback(null, xhr.statusText);	
			}
			else {
				callback(xhr.statusText, null);
			}
		};
		xhr.onerror = function() {
			callback(xhr.statusText, null);
		};
		
		xhr.open('POST', 'http://localhost:3000/upload', true);
		xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
		for(var file in files) {
			formData.append('uploads', files[file].data);
		}
		xhr.send(formData);
	}


	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		document.getElementById('files').addEventListener('change', handleFileInput, false);

		// Click button to see that the site is still responding while it reads the files
		document.getElementById('btn').addEventListener('click', function() {
			console.log('clicked');
		}, false);
	}
	else {
		alert('The File APIs are not fully supported in this browser.');
	}

};