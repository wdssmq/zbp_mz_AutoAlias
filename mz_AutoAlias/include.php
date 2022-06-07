<?php
#注册插件
RegisterPlugin("mz_AutoAlias", "ActivePlugin_mz_AutoAlias");

function ActivePlugin_mz_AutoAlias()
{
  Add_Filter_Plugin('Filter_Plugin_Admin_Header', 'mz_AutoAlias_SetCSS');
  Add_Filter_Plugin('Filter_Plugin_Admin_Footer', 'mz_AutoAlias_SetJS');
}
function mz_AutoAlias_SetCSS()
{
  $act = GetVars('act', 'GET');
  if ("ArticleEdt" !== $act) {
    return;
  }
  echo '<link rel="stylesheet" href="' . mz_AutoAlias_Path("css", "host") . '">';
}
function mz_AutoAlias_SetJS()
{
  $act = GetVars('act', 'GET');
  if ("ArticleEdt" !== $act) {
    return;
  }
  echo '<script src="' . mz_AutoAlias_Path("script", "host") . '"></script>';
}
function mz_AutoAlias_Path($file, $t = 'path')
{
  global $zbp;
  $result = $zbp->$t . 'zb_users/plugin/mz_AutoAlias/';
  switch ($file) {
    case 'css':
      return $result . 'css/style.css';
      break;
    case 'script':
      return $result . 'script/plugin.js';
      break;
      // case 'usr':
      //     return $result . 'usr/';
      //     break;
      // case 'var':
      //     return $result . 'var/';
      //     break;
    case 'main':
      return $result . 'main.php';
      break;
    default:
      return $result . $file;
  }
}
function InstallPlugin_mz_AutoAlias()
{
}
function UninstallPlugin_mz_AutoAlias()
{
}
