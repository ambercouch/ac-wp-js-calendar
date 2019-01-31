<?php
/*
  Plugin Name: AC JS Calendar
  Plugin URI: https://github.com/ambercouch/ac-wp-js-calendar
  Description: A javascript calendar
  Version: 1.2.0
  Author: AmberCouch
  Author URI: http://ambercouch.co.uk
  Author Email: richard@ambercouch.co.uk
  Text Domain: ac-js-cal
  Domain Path: /lang/
  License:
  Copyright 2018 AmberCouch
  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

defined('ABSPATH') or die('You do not have the required permissions');

if (!function_exists('ac_enqueue_scripts'))
{

    function ac_enqueue_scripts($atts)
    {
        wp_register_script( 'ac-js-calendar', plugin_dir_url( __FILE__ ) . 'assets/js/ac-js-calendar.js', array(), '20190121', true );
        wp_enqueue_script( 'ac-js-calendar' );
        wp_register_style('ac-js-calendar-styles', plugin_dir_url( __FILE__ ) . 'assets/css/ac-js-calendar-styles.css', array(), '20190121' );
        wp_enqueue_style('ac-js-calendar-styles');
    }
    add_action( 'wp_enqueue_scripts', 'ac_enqueue_scripts' );

}
