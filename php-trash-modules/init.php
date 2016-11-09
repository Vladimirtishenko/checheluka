<?php
// подключаем файл с настройками
require_once('config.php');
require_once('libs/Mobile_Detect.php');
$detect = new Mobile_Detect;

// подключаем класс для работы с конфигом
require_once('config.class.php');
$config = new Config();


$roundrozpriceto=50;

if (!empty($_GET['ref']))
{
	
		
	
		 
		$daysone=20; // 20 days
		
		$long=60*60*24*$daysone;
		
		$t1=time()+$long;
		
		setcookie("partnerid",$_GET['ref'],$t1,'/',  $_SERVER['HTTP_HOST']);	
		
		$ff=file_get_contents("http://partner.chechelyka.com/insertboughtproduct.php?key=hKJhk6hk89cfdgshfgdl9JHj&pid=".$_GET['ref']."&counter=1");
		
		
		
	
}







// запускаем сессии
session_start();
$_SESSION['id'] = session_id();

require_once('auth.php');

$upddb = "UPDATE ".$sessions_tbl." SET time_start ='".time()."' WHERE session_id='".$_SESSION['id']."'";
mysql_query($upddb);
$rozmmultiple=($_SESSION['optpass']==true)?'1':'2.5';

// optpass
if ($_COOKIE['optpass'] && !isset($_SESSION['optpass']))
{
	$_SESSION['optpass']=	$_COOKIE['optpass'];
}
//echo $_COOKIE['optpass'].'123';

if (isset($_GET['clearcook']))
{
		setcookie('currency','',time()-150000,'/',  $_SERVER['HTTP_HOST']); 

		setcookie('cur_sign','',time()-150000, '/',  $_SERVER['HTTP_HOST']);
		setcookie('cur_course','',time()+150000, '/',  $_SERVER['HTTP_HOST']);
		setcookie('ceilnum',$row_cur['ceilnum'],time()+150000, '/',  $_SERVER['HTTP_HOST']); 
		setcookie('optpass','',time()-150000, '/',  $_SERVER['HTTP_HOST']); 
		setcookie('passpercent','',time()-150000, '/',  $_SERVER['HTTP_HOST']); 
		
		mysql_query("DELETE FROM sessions WHERE  session_id = '".$_SESSION['id']."'");
		
		session_destroy();	
		header("location: ".$_SERVER['HTTP_REFERER']);

	
}

if (!empty($_COOKIE['optpass']) && !($_COOKIE['passpercent']))
{
	$sqloptass=mysql_query("SELECT * FROM optpass WHERE cur='".mysql_real_escape_string($_COOKIE['currency'])."'");
	if ($rowoptass=mysql_fetch_array($sqloptass))
	{
		
				setcookie('passpercent',$rowoptass['percent'],time()+150000, '/',  $_SERVER['HTTP_HOST']); 
				header('location: '.$_SERVER['REQUEST_URI']);
	}

}

if ($_GET['utm_source'])
{
	setcookie('source',$_GET['utm_source'],time()+150000000,'/',  $_SERVER['HTTP_HOST']); 	
	
}

if (isset($_GET['utm_source']) && ($_GET['utm_source']=='yandexdirect' ||$_GET['utm_source']=='googleadwords' ))
{
	 
	$sqloptass=mysql_query("SELECT * FROM optpass WHERE pass='22222'");
	if ($rowoptass=mysql_fetch_array($sqloptass))
	{
		session_start();
		
		setcookie('currency',$rowoptass['cur'],time()+150000,'/',  $_SERVER['HTTP_HOST']); 
		$set_currency=mysql_query("SELECT * FROM ".$currency_tbl." WHERE id='".mysql_real_escape_string($rowoptass['cur'])."'");
		$row_cur=mysql_fetch_array($set_currency);
		setcookie('cur_sign',$row_cur['sign'],time()+150000, '/',  $_SERVER['HTTP_HOST']);
		setcookie('cur_course',$row_cur['cource'],time()+150000, '/',  $_SERVER['HTTP_HOST']);
		setcookie('ceilnum',$row_cur['ceilnum'],time()+150000, '/',  $_SERVER['HTTP_HOST']); 
		setcookie('optpass',$_POST['setoptpass'],time()+150000, '/',  $_SERVER['HTTP_HOST']); 
		setcookie('passpercent',$rowoptass['percent'],time()+150000, '/',  $_SERVER['HTTP_HOST']); 
		
		
		
		
		
	
$PASSPERCENT=mysql_query("SELECT percent FROM optpass WHERE country=".$rowoptass['country']."");
$rtyu=mysql_fetch_array($PASSPERCENT);	

		$_SESSION['optpass']=true;	
		//echo $_SERVER['REQUEST_URI'];
		$REQUEST=preg_replace("/\?utm_source=.*/","",$_SERVER['REQUEST_URI']);
		
		header("Location: ".$REQUEST); //back
		
		
	}

}

if ($_POST['setoptpass'])
{ 
	$sqloptass=mysql_query("SELECT * FROM optpass WHERE pass='".mysql_real_escape_string($_POST['setoptpass'])."'");
	if ($rowoptass=mysql_fetch_array($sqloptass))
	{
		session_start();
		$set_currency=mysql_query("SELECT * FROM ".$currency_tbl." WHERE id='".mysql_real_escape_string($rowoptass['cur'])."'");
		$row_cur=mysql_fetch_array($set_currency);
		setcookie('optpass',$_POST['setoptpass'],time()+150000, '/',  $_SERVER['HTTP_HOST']); 
		setcookie('passpercent',$rowoptass['percent'],time()+150000, '/',  $_SERVER['HTTP_HOST']); 
		
		
		
		
		
$prdata=mysql_query("SELECT price,percent,product_id,rub FROM products WHERE product_id IN(SELECT product_id FROM sessions WHERE  	session_id='".$_SESSION['id']."')");
	
$PASSPERCENT=mysql_query("SELECT percent FROM optpass WHERE country=".$rowoptass['country']."");
$rtyu=mysql_fetch_array($PASSPERCENT);	

	while($prrow=mysql_fetch_array($prdata))
	{
$prrow['allperc']=$rowoptass['percent']+$prrow['percent'];		

		if ($rowoptass['cur']==11 && $prrow['rub']!=0)
				{
					$prrow['price']=floor($prrow['rub']/$row_cur['cource']);
					$rub=" ,rub=1 ";
					$prrow['allperc']=0;
				}	

		$upd="UPDATE sessions SET percent=".$prrow['allperc'].",`product_price`='".$prrow['price']."'$rub WHERE product_id=".$prrow['product_id']." AND session_id='".$_SESSION['id']."'";
	/*if ($_SERVER['REMOTE_ADDR']=='80.77.43.107')
		{
			echo $prrow['allperc'];
			exit;
		}*/	
		// UPDATE sessions SET percent=0,`product_price`='0' ,rub=1 WHERE product_id=6536 AND session_id='ms5u45djsck9pog6ana6mgi606'
		mysql_query($upd);
		
	}
		
		
		
		
		
		
		
		
		$_SESSION['optpass']=true;	
		header("Location: ".$_SERVER['HTTP_REFERER']); //back
	}
}


function convertPrice($optprice,$rozm,$percent)
{
	
		global $roundrozpriceto,$_COOKIE;
		
		

			$optprice = $optprice * $_COOKIE['cur_course'];
				
			//$optprice=$optprice+($optprice/100*($percent));
			
			// if ($_COOKIE['ceilnum']!=0){

			// 	$optprice =ceil($optprice/$_COOKIE['ceilnum']) * $_COOKIE['ceilnum']; 
				
			// 	}

				
				
			$optprice=$optprice*$rozm;

	

				if ($rozm==1)
				{
					$optprice =ceil($optprice); 

				}
				else
				{
					if ($_COOKIE['currency']==11)
					{
						$optprice =ceil($optprice/$roundrozpriceto)*$roundrozpriceto; 
					}
					else
					{
						$optprice =ceil($optprice);
					}
				}
				
			return 	$optprice;
		


	
}

function convertPrice2($optprice,$rozmmultiple,$percent)
{
	
		global $roundrozpriceto,$rozmmultiple,$currency_tbl;
		
		$empty_cur2=mysql_query("SELECT * FROM ".$currency_tbl." WHERE id=11 LIMIT 1");
		$empty_row2=mysql_fetch_array($empty_cur2);

			$optprice = $optprice * $empty_row2['cource'];
// echo $optprice;							
	$optprice=$optprice*$rozmmultiple;
	$optprice =ceil($optprice/$roundrozpriceto)*$roundrozpriceto; 
	return 	$optprice;
		


	
}





// Инициализируем Smarty
define('SMARTY_DIR', 'libs/smarty/');
require_once(SMARTY_DIR . 'Smarty.class.php');

$smarty = new Smarty();
if ( ($detect->isMobile() && !isset($_COOKIE['fullversion'])) || isset($_GET['mobile'])) {
	


	$smarty->template_dir = './templates/mobile/';
$smarty->compile_dir = './templates/mobile/compile/';
$smarty->cache_dir = './templates/mobile/cache/';
	
}
else {
	$smarty->template_dir = './templates/'.$config->get('template').'/';
$smarty->compile_dir = './templates/'.$config->get('template').'/compile/';
$smarty->cache_dir = './templates/'.$config->get('template').'/cache/';
	}
if (isset($_GET['fullversion']))
{
if ($_GET['fullversion']=='clear')
{
setcookie("fullversion",'',time()-1);
}
else
{
setcookie("fullversion",'true',time()+200000);
}
header("location: ".$_SERVER['HTTP_REFERER']);

}

$dir=str_replace("\\", "/",$smarty->template_dir[0]);


$smarty->caching = false;
$smarty->error_reporting = E_ERROR;
if (!empty($_GET['lang']))
	{
$sql_lang=mysql_query("SELECT * FROM langs WHERE symb='".mysql_real_escape_string($_GET['lang'])."'");
if(mysql_num_rows($sql_lang)>0)
	{
	$chpu_lang='lang/'.$_GET['lang'].'/';
	$normal_lang_question='?lang='.$_GET['lang'];
	$normal_lang='&lang='.$_GET['lang'];
	$lang_file=$_GET['lang'];
	$lang_sql='_'.$_GET['lang'];
	}
	else
	{
	$chpu_lang='';
	$normal_lang_question='';
	$normal_lang='';
	$lang_file=$config->get('lang_symb');
	$lang_sql='';
	
	}
	
	
	
}
if (!($_GET['lang']))
{
$lang_file=$config->get('lang_symb');
}
$selectcurlang=mysql_query("SELECT * FROM langdata WHERE `lang`= '$lang_file'");
while($langs=mysql_fetch_array($selectcurlang))
{
$lang[$langs['name']]=$langs['text'];

///print_r($lang);
}
//print_r($lang);
//require_once('langs/'.$lang_file.'/main.php');

//$smarty->debugging = true;
$managers = mysql_query("SELECT * FROM manager_users ORDER BY login ASC"); 
				if (mysql_num_rows($managers)>0){
				while($manager_users = mysql_fetch_array($managers))
					{
						$manager_users_all[] = $manager_users;
					}   
				}
$smarty->assign('managers', $manager_users_all);
$smarty->assign('dir', str_replace("\\", "/",$smarty->template_dir[0]));
$smarty->assign('chpu_lang', $chpu_lang);
$smarty->assign('normal_lang_question', $normal_lang_question);
$smarty->assign('normal_lang', $normal_lang);


/************************
Раздел подготовки данных
*************************/
// ваще все
if (!empty($_COOKIE[$_GET['prod_id']]))
	{
		$rated=true;
	}

if (!empty($_GET['prod_id']))
	{
		$see_rate=mysql_query("SELECT rate_mark,rate_quantity FROM " . $products_tbl . " 
		WHERE url='" . mysql_real_escape_string($_GET['prod_id']) . "'");
		$row_rate=mysql_fetch_array($see_rate);
		if ($row_rate['rate_quantity']<>0 && $row_rate['rate_mark']<>0)
		{
		$rate['res']=round($row_rate['rate_mark']/$row_rate['rate_quantity'],2);
		$rate['quan']=$row_rate['rate_quantity'];
		}
		else 
		{
		$rate['res']=0;
		$rate['quan']=0;
		}
	}

$kaptcha='<img src="libs/kcaptcha/?'.session_name().'='.session_id().'">';


$turn_com=$config->get('turn_com');
$turn_gb=$config->get('turn_gb');
$turn_com_art=$config->get('turn_com_art');
$shop_descr=$config->get('shop_descr');
$pr_per_line=$config->get('pr_per_line');
$domain=$config->get('domain');
$rate_on=$config->get('rate');
$smarty->assign('turn_com_art',$turn_com_art);
$smarty->assign('turn_com',$turn_com);
$smarty->assign('turn_gb',$turn_gb);
$smarty->assign('kap',$kaptcha);
$smarty->assign('rate_on', $rate_on);
$smarty->assign('rate', $rate);
$smarty->assign('rated', $rated);
$smarty->assign('shop_descr', $shop_descr);
$smarty->assign('pr_per_line', $pr_per_line);
$smarty->assign('domain', $domain);
if (!empty($_GET['cat_id']))
	{
		$par_sel=mysql_query("SELECT name".$lang_sql." AS name,cat_keywords".$lang_sql." AS cat_keywords,id,parent FROM " . $category_tbl . " WHERE id='".mysql_real_escape_string($_GET['cat_id'])."'");
		$par_cat=mysql_fetch_array($par_sel);
	}
if (!empty($_GET['sub_id']))
	{
		$sub_sel=mysql_query("SELECT name".$lang_sql." AS name,cat_keywords".$lang_sql." AS cat_keywords,id,parent FROM " . $category_tbl . " WHERE id='".mysql_real_escape_string($_GET['sub_id'])."'");
		$sub_cat=mysql_fetch_array($sub_sel);
	}
$smarty->assign('par_cat', $par_cat);
$smarty->assign('sub_cat', $sub_cat);





// sorting
if (!empty($_GET['set_order']))

{
	if ($_GET['set_order']=='clearsetorder')
	{
	setcookie("order",'',time()-2000);
	setcookie("sort",'',time()-2000);
			
	}
	else
	{
	
	setcookie("order",$_GET['set_order'],time()+2000);
	setcookie("sort",$_GET['sort'],time()+2000);
	}
	header("location: ".$_SERVER['HTTP_REFERER']);
	
	
}
		$order=mysql_real_escape_string($_COOKIE['order']);
		switch ($order) {
			
		case 'price':
        $order_sql=" price ";
        break;

		case 'sold':
        $order_sql=" sold ";
        break;
		
		case 'rate_mark':
        $order_sql=" rate_mark ";
        break;
		
		case 'title':
        $order_sql=" title ";
        break;	
		
		case 'sort':
        $order_sql=" sort ";
        break;	

		default:
		$order_sql=" postavshik =62 DESC, postavshik =5 DESC, postavshik =36 DESC, postavshik =56 DESC,   sort ";
			
		}
		
		
		
				
		$sorting=mysql_real_escape_string($_COOKIE['sort']);
		switch ($sorting) {
			
		case 'desc':
        $sort_it=" DESC ";
        break;

		case 'asc':
        $sort_it=" ASC ";
        break;
		
		default:
		$sort_it=" DESC ";
			
		}






// страницы
$pages_mysql = mysql_query("SELECT id,url,title".$lang_sql." as title FROM " . $pages_tbl . " WHERE active ='1' ORDER BY id ASC");
$pages['count'] = mysql_num_rows($pages_mysql);
if ($pages['count']>0) {$page_exist=true;}
$smarty->assign('page_exist', $page_exist);

while($page = mysql_fetch_array($pages_mysql))
{
	$page1['title'] = $page['title'];
	$page1['url'] = $page['url'];

	
	$pages['list'][] = $page1;
}
$smarty->assign('pages', $pages);

// валюты
$currency_mysql = mysql_query("SELECT id,title FROM ".$currency_tbl." WHERE active='1'");
$currency['count'] = mysql_num_rows($currency_mysql);
while($cur = mysql_fetch_array($currency_mysql))
{
	$currencies['list'][] = $cur;
}
$smarty->assign('currency', $currencies);






$smarty->assign('lang', $lang);


// товаров в корзине


	$rozmadd="*$rozmmultiple";
	

		$cur_crs=mysql_real_escape_string($_COOKIE['cur_course']);
		$ceiln=mysql_real_escape_string($_COOKIE['ceilnum']);

if ($rozmmultiple==1)
{

		//$product['price'] =ceil($product['price']/$_COOKIE['ceilnum']) * $_COOKIE['ceilnum'];
		
		
		
		$ff="((product_price*$cur_crs))*quantity *$rozmmultiple" ;
				
		
		

}
else
{
	$ff="CEILING((product_price*$cur_crs) *$rozmmultiple/$roundrozpriceto)*$roundrozpriceto*quantity" ;
}
$sessions_mysql = mysql_query("SELECT SUM(quantity) as total, SUM($ff) AS sum from ".$sessions_tbl." WHERE session_id='" . $_SESSION['id'] . "'");

if ($_SERVER['REMOTE_ADDR']=='188.163.84.51')
{
	
}

$basket_count = mysql_fetch_array($sessions_mysql);




$smarty->assign('basket_count', $basket_count['total']);
//$basket_count['sum']=convertPrice($basket_count['sum'],$rozmmultiple,0);
$smarty->assign('basket_sum', $basket_count['sum'] );
//
$langlist=mysql_query("SELECT * FROM langs");
while($rowlanglist=mysql_fetch_array($langlist))
{
	
	
	$languages2['list'][] = $rowlanglist;
	
	
}
	
$smarty->assign('languages2', $languages2);
	
$smarty->assign('orlangutitle', $config->get('def_lang_ttl'));
$smarty->assign('orlangusymb', $config->get('lang_symb'));	
	
	
function getNumEnding($number,$array,$endingArray)
{
	$lenofnum=strlen($number);
	$rev=strrev($number);
	
	if (!in_array($number,$array)) {$lenofnum=1;}
	
	$rev=substr($rev,0,$lenofnum);
	$rev=strrev($rev);
	foreach($array as $key=>$item)
	{
		if ($rev==$item) 
		{
				$ending=$endingArray[$key];
		}
	}


    return $ending;
}
	
	function debug($data)
	{
		if ($_SERVER['REMOTE_ADDR']=='46.172.69.30')
		{
			echo $data;	
		}
	}
	
function numb($n,$max) {
$ret = str_pad($n, $max, "0", STR_PAD_LEFT);
return $ret;
}	

function insertlog($log,$tstamp)
{
	global $dbname,$link,$db;

 $sql="INSERT INTO `userlog` (`user`,log,`tstamp`) 
		VALUES ('". $_SESSION['id'] ."','".$log."',".time().")";
		mysql_query($sql);	
	
}

function strme($data)
{
	
$data=mysql_real_escape_string($data);	
$data=strip_tags($data);	
return $data;
}









if (isset($_COOKIE['filtercat']))
{
	
	$getname=mysql_query("SELECT name FROM category WHERE id=".(int)$_COOKIE['filtercat']."");
	$getnamecat=mysql_fetch_array($getname);
	
	
	$catfilter=(int)$_COOKIE['filtercat'];
	$sexfilter.=" AND category_id = $catfilter ";
}	

if (isset($_GET['clearfilters']))
{
	setcookie('sexfilter','',time()-150000000,'/',  $_SERVER['HTTP_HOST']); 	
	setcookie('sizefilter','',time()-150000000,'/',  $_SERVER['HTTP_HOST']); 
	setcookie('filtercat','',time()-150000000,'/',  $_SERVER['HTTP_HOST']);
	header("location: filter.php");	

}

$allsexes=mysql_query("SELECT * FROM sexes ORDER BY id ASC");
while($sex=mysql_fetch_array($allsexes))
{
	$sexfiltr[]=$sex;
}





function recursive_array_search($needle,$haystack) {
    foreach($haystack as $key=>$value) {
        $current_key=$key;
        if($needle===$value OR (is_array($value) && recursive_array_search($needle,$value) !== false)) {
            return $current_key;
        }
    }
    return false;
}

$filtersizes=mysql_query("SELECT DISTINCT * FROM sizes WHERE realsize!='' GROUP BY realsize ORDER BY sort DESC");
while($sizefilter=mysql_fetch_array($filtersizes))
{	


	$sizefilter['realsizeurl']=base64_encode($sizefilter['realsize']);
	$szsfltr[]=$sizefilter;
}
/*if ($_SERVER['REMOTE_ADDR']=='46.172.69.30' && isset($_GET['test']))
										{
											echo '<pre>';	
											//$newarr=array_unique($newarr);
											print_r($newarr);
											exit;
										}
*/
$smarty->assign('sexfiltr', $sexfiltr);
$smarty->assign('szsfltr', $szsfltr);


$alltime=getdate($config->get('storedate'));



		
$storedate= numb($alltime['mday'],2).'.'. numb($alltime['mon'],2).'.'.numb($alltime['year'],2);
$storedate.=' &nbsp;|&nbsp; '. numb($alltime['hours'],2).':'. numb($alltime['minutes'],2);
$smarty->assign('storedate', $storedate);


function my_mb_ucfirst($str) {
    $fc = mb_strtoupper(mb_substr($str, 0, 1));
    return $fc.mb_substr($str, 1);
}







$smarty->assign('smillist', $smillist);	
$smarty->assign('smillist2', $smillist2);	

function replace_smiley($text) {
global $replacements,$replacements2 ;	

  $out = $text;
  foreach ($replacements as $code => $image) {
    $html = '<img src="templates/luka/img/smiles/' . $image . '" alt="' . $code . '" />';
    $out = str_replace($code, $html, $out);
  }
  foreach ($replacements2 as $code => $image) {
    $html = '<img src="templates/luka/img/smiles/' . $image . '" alt="' . $code . '" />';
    $out = str_replace($code, $html, $out);
  }
  return $out;
}


function arrayintostring($array)
{
	$kc=0;
	foreach($array as $item)	
	{
		if ($kc>0) {$del=",";} else {$del="";}
		if (is_numeric($item))
		{
			$finitem.=$del.mysql_real_escape_string($item);
		}
		else
		{
			$finitem.=$del."'".mysql_real_escape_string($item)."'";
		}
			$kc++;
	}	
	return $finitem;
}
	$sql=mysql_query("SELECT * FROM sexes WHERE showindex=1");
	while($row=mysql_fetch_array($sql))
	{
		$sexindex[]=$row;	
	}
	
	
	
	
	
	$smarty->assign('sexindex', $sexindex);
	
	
	





	$sqlformenu = mysql_query("SELECT p.*, s.id AS aiid, s.quantity,s.product_price,s.color AS colorsession,s.size AS sizesession,s.percent FROM ".$products_tbl." p, ".$sessions_tbl." s WHERE p.product_id=s.product_id AND s.session_id='".$_SESSION['id']."' LIMIT 5");
	//echo '<pre>';
	
	while ($resmenu=mysql_fetch_array($sqlformenu))	
	{	
		$resmenu['price_only']=convertPrice($resmenu['product_price'],$rozmmultiple,$resmenu['percent']);
			
		$resmenu['product_price']=$resmenu['price_only']* $resmenu['quantity'];

		$productsformenu['list'][] = $resmenu;
	}
	$smarty->assign('productsformenu', $productsformenu);









$smarty->assign('sima', '/simaland.php?data=YXJ0aWt1bHM9NzExODEsNzExODIsNzExODMsNzExODQsNzExODUsNzQwMDUsNzUwNDAmdGV4dD0%3D');




?>