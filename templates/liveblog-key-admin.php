<?php 
	$current_key_template = $template_variables['current_key_template'] ?? '';
	$current_key_format   = $template_variables['current_key_format'] ?? '';
	$current_key_limit    = $template_variables['current_key_limit'] ?? '';
	$key_name             = $template_variables['key_name'] ?? '';
	$key_format_name      = $template_variables['key_format_name'] ?? '';
	$key_description      = $template_variables['key_description'] ?? '';
	$key_limit            = $template_variables['key_limit'] ?? '';
	$key_button           = $template_variables['key_button'] ?? '';
	$templates            = $template_variables['templates'] ?? [];
	$formats              = $template_variables['formats'] ?? [];
?>
<hr/>
<p>
	<label for="liveblog-key-template-name"><?php echo esc_html( $key_name ); ?> </label>
	<select id="liveblog-key-template-name" name="liveblog-key-template-name">
		<?php foreach ( $templates as $template ) : ?>
		<option
			<?php
			if ( $template === $current_key_template ) :
				?>
selected="selected" <?php endif; ?> value="<?php echo esc_attr( $template ); ?>">
									<?php
									echo esc_html( ucwords( str_replace( '-', ' ', $template ) ) );
									?>
</option>
		<?php endforeach; ?>
	</select>
	<label for="liveblog-key-template-format"><?php echo esc_html( $key_format_name ); ?> </label>
	<select id="liveblog-key-template-format" name="liveblog-key-template-format">
		<?php foreach ( $formats as $format ) : ?>
			<option
			<?php
			if ( $format === $current_key_format ) :
				?>
selected="selected" <?php endif; ?> value="<?php echo esc_attr( $format ); ?>">
									<?php
									echo esc_html( ucwords( str_replace( '-', ' ', $format ) ) );
									?>
</option>
		<?php endforeach; ?>
	</select>
	<label for="liveblog-key-limit"><?php echo esc_html( $key_limit ); ?></label>
	<input id="liveblog-key-limit" type="text" name="liveblog-key-limit" value="<?php echo esc_attr( $current_key_limit ); ?>" />
	<button type="button" class="button button-primary liveblog-key-template-save" value="liveblog-key-template-save"><?php echo esc_html( $key_button ); ?></button>
</p>
<p class="howto"><?php echo esc_html( $key_description ); ?></p>
<p>
<p>
	<label for="liveblog-slack-channel">Slack Channel </label>
	<input type="text" id="liveblog-slack-channel" name="liveblog-slack-channel" class="widefat" value="<?php echo esc_attr( $slack_channel ); ?>">
</p>
