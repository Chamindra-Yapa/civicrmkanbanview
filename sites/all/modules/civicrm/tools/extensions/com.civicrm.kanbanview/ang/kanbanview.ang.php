<?php
// This file declares an Angular module which can be autoloaded
// in CiviCRM. See also:
// http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_angularModules

return array (
  'js' => 
  array (
    0 => 'ang/kanbanview.js',
    1 => 'ang/kanbanview/*.js',
    2 => 'ang/kanbanview/*/*.js',
	3 => 'ang/dragDroplists.js', //added to include the file which has dndLists module
	),
  'css' => 
  array (
    0 => '/sites/all/modules/civicrm/tools/extensions/com.civicrm.kanbanview/ang/kanbanview.css',
  ),
  'partials' => 
  array (
    0 => 'ang/kanbanview',
  ),
  'settings' => 
  array (
  ),
);
