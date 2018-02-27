<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Image App</title>
		<link rel="stylesheet" href="public/css/font-awesome.min.css">
		<link rel="stylesheet" href="public/css/jquery-ui.min.css">
		<link rel="stylesheet" href="public/css/app.css">
	</head>
	<body>
		<div class="row">
			<div class="container">
				<div class="app">
					<div class="app-editor">
						<div class="app-editor-control">
							<ul class="app-list-editor">
								<li>
									<button class="btn-restore" title="Restore"><i class="fa fa-refresh fa-2x"></i></button>
								</li>
								<li>
									<button class="btn-rotate" title="Rotate"><i class="fa fa-rotate-right fa-2x"></i></button>
								</li>
								<li>
									<button class="btn-move-left" title="Move to left"><i class="fa fa-long-arrow-left fa-2x"></i></button>
								</li>
								<li>
									<button class="btn-move-right" title="Move to right"><i class="fa fa-long-arrow-right fa-2x"></i></button>
								</li>
								<li>
									<button class="btn-move-top" title="Move to up"><i class="fa fa-long-arrow-up fa-2x"></i></button>
								</li>
								<li>
									<button class="btn-move-bottom" title="Move to down"><i class="fa fa-long-arrow-down fa-2x"></i></button>
								</li>
							</ul>
						</div>
						<div class="app-editor-content" id="editor-content">
							<div class="editor-upload"></div>
							<div class="editor-frame"></div>
							<div class="editor-object">
								<div class="editor-object-rero"></div>
							</div>
						</div>
					</div>
					<div class="app-bottom">
						<button class="btn-upload" title="Choose a image file"><i class="fa fa-upload fa-2x"></i></button>
						<button class="btn-create" title="Save image"><i class="fa fa-save fa-2x"></i></button>
						Save as name:
						<input type="text" class="file-name" placeholder="ex: image">
						<select class="file-ext">
							<option value="jpg" selected>JPG</option>
							<option value="png">PNG</option>
							<option value="gif">GIF</option>
							<option value="tif">TIF</option>
							<option value="bmp">BMP</option>
							<option value="ico">ICO</option>
							<option value="psd">PSD</option>
							<option value="webp">WEBP</option>
						</select>
						<select class="file-zoom">
							<option value="2" selected>2x</option>
							<option value="4">4x</option>
							<option value="8">8x</option>
						</select>
						<span class="file-output"></span>
						<input type="file" style="display: none;" id="file-input">
					</div>
				</div>
			</div>
		</div>
		<div class="file-preview-dialog"></div>
		<a class="file-download" download hidden></a>
		<!-- jQuery -->
		<script src="public/js/jquery.min.js"></script>
		<script src="public/js/jquery-ui.min.js"></script>
		<script src="public/js/jquery.ui.rotatable.min.js"></script>
		<script src="public/js/download.js"></script>
		<script src="public/js/app.js"></script>
	</body>
</html>
