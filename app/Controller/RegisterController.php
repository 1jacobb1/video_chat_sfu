<?php
class RegisterController extends AppController {

  public function beforeFilter() {
    $this->Auth->allow(array(
      'index'
    ));
  }

  public $uses = array('User');

  public function index() {
    if ($this->request->is('post')) {
      $data = $this->request->data;
      if (!empty($data['User']['username']) && !empty($data['User']['password'])) {
        $this->User->create();
        $result = $this->User->save($data);
        $this->Session->write('User', $result);
        $this->redirect('/login');
      } else {
        $this->Session->setFlash('Username and Password is required!');
      }
    }
  }

}
