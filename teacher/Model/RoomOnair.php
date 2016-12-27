<?php
class RoomOnair extends AppModel {

  public $usesTable = "room_onairs";

  public $validate = array(
    'description' => array(
      'rule-1' => array(
        'rule' => array('isUnique'),
        'message' => array('Room Description already exists')
      ),
      'rule-2' => array(
        'rule' => array('notEmpty'),
        'message' => array('Room Description is required')
      )
    ),
    'status' => array(
      'rule-1' => array(
        'rule' => array('notEmpty'),
        'message' => array('Status must not null')
      )
    ),
    'chat_hash' => array(
      'rule-1' => array(
        'rule' => array('notEmpty'),
        'message' => array('Chat hash must not null')
      )
    )
  );

}
