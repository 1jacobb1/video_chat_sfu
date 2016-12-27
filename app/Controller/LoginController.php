<?php
class LoginController extends AppController {

  public $uses = array(
    "User"
  );

  public function index() {
    if ($this->request->is('post')) {
      $data = $this->request->data;
      $user = $this->User->find('first', array(
        'conditions' => array(
          'username' => $data['User']['username'],
          'password' =>  AuthComponent::password($data['User']['password'])
        )
      ));
      if ($this->Auth->login($user)) {
        return $this->redirect($this->Auth->redirectUrl());
      } else {
        $this->Session->setFlash(__('Username or Password is invalid'));
      }
    }
  }

  public function logout() {
    return $this->redirect($this->Auth->logout());
  }

}
