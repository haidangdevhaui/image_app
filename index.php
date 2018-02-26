<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Image app</title>
		<link rel="stylesheet" href="public/css/font-awesome.min.css">
		<link rel="stylesheet" href="public/css/jquery-ui.min.css">
		<link rel="stylesheet" href="public/css/app.css">
	</head>
	<body>
		<div class="row">
			<div class="container">

				<div id="slider"></div>
				<div class="app">
					<div class="app-editor">
						<div class="app-editor-control">
							<ul class="app-list-editor">
								<li>
									<button class="btn-restore"><i class="fa fa-refresh fa-2x"></i></button>
								</li>
								<li>
									<button class="btn-rotate"><i class="fa fa-rotate-right fa-2x"></i></button>
								</li>
								<li>
									<button class="btn-move-left"><i class="fa fa-long-arrow-left fa-2x"></i></button>
								</li>
								<li>
									<button class="btn-move-right"><i class="fa fa-long-arrow-right fa-2x"></i></button>
								</li>
								<li>
									<button class="btn-move-top"><i class="fa fa-long-arrow-up fa-2x"></i></button>
								</li>
								<li>
									<button class="btn-move-bottom"><i class="fa fa-long-arrow-down fa-2x"></i></button>
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
						<button class="btn-upload"><i class="fa fa-upload fa-2x"></i></button>
						<button class="btn-create"><i class="fa fa-save fa-2x"></i></button>
						Save as name:
						<input type="text" class="file-name">
						<input type="file" style="display: none;" id="file-input">
					</div>
				</div>
			</div>
		</div>
		<!-- jQuery -->
		<script src="public/js/jquery.min.js"></script>
		<script src="public/js/jquery-ui.min.js"></script>
		<script src="public/js/jquery.ui.rotatable.min.js"></script>
		<script src="public/js/app.js"></script>
	</body>
</html>
