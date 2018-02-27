<?php

if (isset($_GET['path']) && $_GET['path'] && file_exists($_GET['path'])) {
	unlink($_GET['path']);
}