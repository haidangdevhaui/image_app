<?php

if (!function_exists('app_config')) {
	/**
	 * app config reader
	 * @param  string $key
	 * @return string
	 */
    function app_config($key, $default = '')
    {
    	if (!file_exists('app.ini')) {
    		return $default;
    	}
    	$config = parse_ini_file('app.ini');
    	return isset($config[$key]) ? $config[$key] : $default;
    }
}
