<?php
require 'init.php';

if (!empty($_GET['editGoods']))
{
	if (mysql_query("UPDATE products SET isauc=0 WHERE product_id=".(int)$_GET['editGoods']))
	{
		echo $_GET['editGoods'].' removed from auction'; exit;
	}
}
header('Access-Control-Allow-Origin: *');





// error_reporting(E_ALL);

if (isset($_GET['start']) && isset ($_GET['end']))
{
	$limit="LIMIT ".(int)$_GET['start'].",".(int)$_GET['end'];
}
function my_json_encode($arr)
{
        //convmap since 0x80 char codes so it takes all multibyte codes (above ASCII 127). So such characters are being "hidden" from normal json_encoding
        array_walk_recursive($arr, function (&$item, $key) { if (is_string($item)) $item = mb_encode_numericentity($item, array (0x80, 0xffff, 0, 0xffff), 'UTF-8'); });
        return mb_decode_numericentity(json_encode($arr), array (0x80, 0xffff, 0, 0xffff), 'UTF-8');

}

if (!empty($_GET['searhByTitle']))
{
	$addsearch=" AND title LIKE '%".$_GET['searhByTitle']."%' ";
}
if (!empty($_GET['searhByArt']))
{
	$addsearch.=" AND artikul LIKE '%".$_GET['searhByArt']."%' ";
}

$sql=mysql_query("SELECT * FROM products  WHERE category_id !='1'  
				AND active='1' AND maker_id NOT IN(SELECT maker_id FROM maker WHERE active=0)
				 
				  AND product_id IN (SELECT DISTINCT product_id FROM images WHERE color!=0)
				  $addsearch
				ORDER BY product_id ASC $limit");

// if ($_SERVER['REMOTE_ADDR']=='195.28.31.198')
// {
// 	echo "SELECT * FROM products  WHERE category_id !='1'  
// 				AND active='1' AND maker_id NOT IN(SELECT maker_id FROM maker WHERE active=0)
				 
// 				  AND product_id IN (SELECT DISTINCT product_id FROM images WHERE color!=0)
// 				  $addsearch
// 				ORDER BY product_id ASC $limit";
// }
// ECHO '<br>step 1';
while($row=mysql_fetch_array($sql))
{
	// ECHO '<br>step 2 loop';
	$cat=mysql_query("SELECT name FROM category WHERE id=".$row['category_id']."");
		
	$catrow=mysql_fetch_array($cat);

$colors=mysql_query("SELECT * FROM images WHERE product_id =".$row['product_id']." AND color!=0 ORDER BY sort DESC ");
    while($colorsdata=mysql_fetch_array($colors))
    {

// ECHO '<br>step 3 loop';
 $colsel=mysql_query("SELECT * FROM colors WHERE id=".$colorsdata['color']."");
        
        $coldata=mysql_fetch_array($colsel);

        if($colorsdata['sizes']=='N;'  and $colorsdata['color'] !=0)     {continue;}
        if($colorsdata['colorquan']==0 and $colorsdata['isunlim']==0 )   {continue;}
        $rr=unserialize($colorsdata['sizes']);

         foreach($rr as &$val)
            { 
            	 $sdata=mysql_query("SELECT * FROM sizes WHERE id=".(int)$val."");
                $srow=mysql_fetch_array($sdata);
            	// ECHO '<br>step 4 loop';
$allszs[]=$srow['size'];
// echo $error.'<br>';
// var_dump($arrayprepare[$newid], $error === JSON_ERROR_UTF8);
            }
$newsizedata=implode(',', $allszs);
                

if ($row['rub']!=0)
				{
					$row['price']=$row['rub'];
				}
		
				$row['price2']=convertPrice2($row['price'],$rozmmultiple,$row['percent']);




               
                $newid=$row['product_id'].$colorsdata['id'].$srow['id'];
                $arrayprepare[$newid]['id']=$row['product_id'];
                $arrayprepare[$newid]['title']=$row['title'].', код \''.$row['artikul'].'\'';
                $arrayprepare[$newid]['description']=$row['description'];
                $arrayprepare[$newid]['img']="http://".$_SERVER['HTTP_HOST']."/image___400___559___".$colorsdata['img'];
                $arrayprepare[$newid]['color']=$coldata['color'];
                $arrayprepare[$newid]['size']=$newsizedata;
                $arrayprepare[$newid]['countInWarehouse']=999;
                $arrayprepare[$newid]['categoryName']=$catrow['name'];
                $arrayprepare[$newid]['CategoryId']=$row['category_id'];
                $arrayprepare[$newid]['Sostav']=$row['sostav'];
                $arrayprepare[$newid]['Material']=$row['tkan'];
                $arrayprepare[$newid]['PriceRoz']=$row['price2'];


$finalarray['goods'][]=$arrayprepare[$newid];
                // echo '<pre>';
                // print_r($arrayprepare[$newid]);
                // echo '</pre>';
$error = json_last_error();
unset($allszs);

// ECHO '<br>step 5 loop';



// [{id:13333, title: title, description: description, img: url, color: red, size:38, countInWarehouse:9, categoryName: name, CategoryId: 10}, {nextgoods}, {nextgoods}] 


}



}
$finalarray['offset'][]=$_GET['end'];
print my_json_encode($finalarray);