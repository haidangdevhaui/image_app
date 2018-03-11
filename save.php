<?php

if (isset($_GET['path']) && $_GET['path'] && file_exists($_GET['path'])) {
	rename($_GET['path'], str_replace('/temp/', '/created/', $_GET['path']));
}