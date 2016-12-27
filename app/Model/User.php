<?php
class User extends AppModel {

  var $useTable = "users";

  public $validate = array(
    'username' => array(
      'rule-1' => array(
        'rule' => array('isUnique'),
        'message' => array('Username already exists')
      ),
      'rule-2' => array(
        'rule' => array('notEmpty'),
        'message' => array('Username is required')
      )
    ),
    'password' => array(
      'rule-1' => array(
        'rule' => array('notEmpty'),
        'message' => array('Password is required')
      ),
      'rule-2' => array(
        'rule' => array('minLength', 8),
        'message' => array('Password must be at least 8 characters long')
      )
    ),
  );

  public function beforeSave($options = array()) {
    $this->data[$this->alias]['password'] = AuthComponent::password($this->data[$this->alias]['password']);
    return true;
  }

}
