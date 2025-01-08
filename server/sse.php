<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

sleep(5);
echo "data: Drag and drop the images to spots on the map\n\n";
flush();
?>
