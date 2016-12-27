<?php echo $this->Form->create('User', array()); ?>
  <?php
    echo $this->Form->input('username', array(
      'type' => 'text',
      'label' => __('Username'),
      'required' => 'required'
    ));

    echo $this->Form->input('password', array(
      'type' => 'password',
      'label' => __("Password"),
      'required' => 'required'
    ));

    echo $this->Form->submit('Register');
  ?>
<?php echo $this->Form->end(); ?>
