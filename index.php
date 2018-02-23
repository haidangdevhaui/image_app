<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Image app</title>
		<link rel="stylesheet" href="public/css/app.css">
		<link rel="stylesheet" href="public/css/jquery-ui.min.css">
		<link rel="stylesheet" href="public/css/bootstrap-slider.min.css">
		<!-- <link rel="stylesheet" href="public/css/bootstrap.min.css"> -->
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
									<button class="btn-restore">restore</button>
								</li>
								<li>
									<button class="btn-rotate">rotate</button>
								</li>
								<li>
									<button class="btn-move-left">move left</button>
								</li>
								<li>
									<button class="btn-move-right">move right</button>
								</li>
								<li>
									<button class="btn-move-top">move top</button>
								</li>
								<li>
									<button class="btn-move-bottom">move bottom</button>
								</li>
							</ul>
						</div>
						<div class="app-editor-content" id="editor-content">
							<div class="editor-upload"></div>
							<div class="editor-frame"></div>
							<div class="editor-object">
								<div class="editor-object-rero"></div>
							</div>
 <!--<div class="editor-object-rero"></div>-->
						</div>
					</div>
					<div class="app-bottom">
						<button class="btn-upload">Upload</button>
					</div>
				</div>
			</div>
		</div>
		<img style="display: none;" src="public/images/upload.png" id="image-upload" alt="">
		<!-- jQuery -->
		<script src="public/js/jquery.min.js"></script>
		<script src="public/js/jquery-ui.min.js"></script>
		<script src="public/js/jquery.ui.rotatable.min.js"></script>
		<!-- <script src="public/js/bootstrap.min.js"></script> -->
		<!-- <script src="public/js/bootstrap-slider.min.js"></script> -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/camanjs/4.0.0/caman.full.min.js"></script>
		<script src="public/js/app.js"></script>
	</body>
</html>
