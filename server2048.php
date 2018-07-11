<?php
header("Content-type: text/html; charset=UTF-8");
  //接收get请求的参数
$playerName = urldecode($_GET['playerName']);
$time = $_GET['time'];
$bestPosition = urldecode($_GET['bestPosition']);
$bestSalary = $_GET['bestSalary'];
$comment = urldecode($_GET['comment']);

// $playerName = urldecode($_POST['playerName']);
// $time = $_POST['time'];
// $bestPosition = urldecode($_POST['bestPosition']);
// $bestSalary = $_POST['bestSalary'];
// $comment = urldecode($_POST['comment']);


 //连主库
$link=mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
  // 连从库
  // $link=mysql_connect(SAE_MYSQL_HOST_S.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
if($link)
{
  mysql_select_db(SAE_MYSQL_DB,$link);
  //插入
  mysql_query(" INSERT INTO charts2048 (playerName, time, bestPosition, bestSalary, comment) VALUES ('".$playerName."', '".$time."', '".$bestPosition."', ".$bestSalary.", '".$comment."')");

  //查询
  $sql = "SELECT * FROM charts2048 ORDER BY bestSalary DESC limit 10";
  $result = mysql_query($sql,$link);

    $json = "";

    while($row = mysql_fetch_array($result))
    {
      $json .= $row["playerName"] . "=&=" . $row["time"]. "=&=" . $row["bestPosition"]. "=&=" . $row["bestSalary"]. "=&=" . $row["comment"];
      if ($x < mysql_num_rows($result) -1)  
        $json .= "-=^=-";          
    }

  // $json = "{\"data\":[";

  //   while($row = mysql_fetch_array($result))
  //   {
  //     $json .= "{\"playerName\":\"" . $row["playerName"] . "\",\"time\":\"" . $row["time"]. "\",\"bestPosition\":\"" . $row["bestPosition"]. "\",\"bestSalary\":" . $row["bestSalary"]. ",\"comment\":\"" . $row["comment"] . "\"}";
  //     if ($x < mysql_num_rows($result) -1)  
  //       $json .= ",";          
  //   }
  // $json .= "]}";

mysql_close($link);

}else{
  die('Could not connect: ' . mysql_error());
}
      //返回数据
echo $json;
?>