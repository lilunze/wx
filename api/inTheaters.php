<?php
$res = file_get_contents("https://api.douban.com/v2/movie/in_theaters?start=0&count=3");
echo $res;