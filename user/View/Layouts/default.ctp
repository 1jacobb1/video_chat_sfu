<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.View.Layouts
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

$cakeDescription = __d('cake_dev', 'CakePHP: the rapid development php framework');
$cakeVersion = __d('cake_dev', 'CakePHP %s', Configure::version())
?>
<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); ?>
	<title>
		<?php //echo $cakeDescription ?>:
		<?php //echo $this->fetch('title'); ?>
		User
	</title>
	<?php
		echo $this->Html->meta('icon');

		echo $this->Html->css('cake.generic');

		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');

		echo $this->Html->script(array(
			'jquery.min.js',
			'bootstrap.min.js',
			'bootstrap-formhelpers.min.js',
			'bootstrap-typeahead.js',
			'jquery.mask.min.js',
			'metisMenu.min.js',
			'sb-admin-2.js',
			'status.main.js',
			'underscore.js'
		));

		echo $this->Html->css(array(
			'bootstrap.min.css',
			'modern-business.css',
			'font-awesome.min.css',
			'sb-admin-2.css',
			'select2.css',
			'metisMenu.min.css',
			'html5reset.css',
			'common.css',
			'animation.css',
			'menu_dropdown.css',
			'perfect_scrollbar.css',
			'modal.css',
			'font-awesome.min.css',
			'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css',
			'details.css',
			'details_reservation.css',
			'details_reserve_search.css',
			'details_lesson_log.css',
			'details_lesson_note.css',
			'details_chat_history.css',
			'details_lesson_finish.css',
			'details_mypage2.css',
			'details_wait.css',
			'details_exam.css',
			'details_pay.css',
			'details_pass.css',
			'details_message.css',
			'details_cs.css',
			'details_unsubscribe.css',
			'details_emailchange.css',
			'details_step.css',
			'details_subpages.css',
			'details_intro.css',
			'details_info.css',
			'details_settings.css',
			'details_textbook.css',
			'details_mypage3.css',
			'details_signup.css',
			'details_memo.css',
			'details_ranking.css',
			'details_download_browser.css',
			'details_counseling.css',
			'magnific-popup.css',
			'details_topics.css',
			'details_textbook_desc.css',
			'details_chatlog.css',
			'details_sitemap.css',
			'details_callan_flow.css',
			'details_interview.css',
			'details_campaign_invite_friends.css',
			'details_fund_raising.css',
			'details_usage.css'
		));
	?>
</head>
<body style="background: #f8f8f8;">
	<div class="container">
		<?php echo $this->Session->flash(); ?>

		<?php echo $this->fetch('content'); ?>
	</div>
</body>
</html>
