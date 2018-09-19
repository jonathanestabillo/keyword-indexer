function loadFileAsText() {
	let fileToLoad = document.getElementById('inputGroupFile01').files[0];

	let fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		let textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById('txt_document').value = textFromFileLoaded;
		$(this).next('.custom-file-label').html(fileReader);
	};
	fileReader.readAsText(fileToLoad, 'UTF-8');
}

function clearFileTextArea() {
	document.getElementById('txt_document').value = null;
	document.getElementById('inputGroupFile01').value = null;

	document.getElementById('p_con_content').innerText = null;

	$("#txt_document").show();
    $("#p_con_content_parent").hide();
}
