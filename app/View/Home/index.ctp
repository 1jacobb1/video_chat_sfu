Welcome to Home

<?php echo $this->Form->create('Room', array('action' => 'createRoom')); ?>
  <?php
    echo $this->Form->input('description', array(
      'id' => 'room_description',
    ));

    echo $this->Form->submit('Create Room');
  ?>
<?php echo $this->Form->end(); ?>
