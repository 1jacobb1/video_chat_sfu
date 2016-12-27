<?php
class RoomsController extends AppController{

  public $uses = array(
    'RoomOnair'
  );

  public function createRoom(){
    $this->autoRender = false;
    if($this->request->is('post')){
      $data = $this->request->data['Room'];
      $user = $this->Auth->User('User');
      $roomToSave = array(
        'RoomOnair' => array(
          'description' => $data['description'],
          'user_id' => $user['id'],
          'other_user_id' => 0,
          'chat_hash' => $this->generateChatHash($user['id']),
          'status' => 1,
          'created_ip' => $this->request->clientIp(),
          'modified_ip' => $this->request->clientIp(),
          'created_date' => date('Y-m-d H:i:s'),
          'modified_date' => date('Y-m-d H:i:s'),
        )
      );
      $this->RoomOnair->create();
      $response = array(
        'error'=>'',
        'content'=>''
      );
      if($this->RoomOnair->save($roomToSave)){
        $response['error'] = false;
        $response['content'] = 'room_created';
        $id = $this->RoomOnair->id;
        $this->redirect("/room/".$id);
      }else{
        $response['error'] = 'room_created_failed';
        $response['content'] = $roomToSave;
      }
      return json_encode($response);
    }
  }

  public function index($id){
    $user = $this->Auth->User('User');
    $rooms = $this->RoomOnair->find('first', array(
      'conditions' => array(
        'user_id' => $user['id'],
        'id' => $id
      )
    ));
    if(empty($rooms)){
      $this->redirect('/?wrong_room_no');
    }
    $this->set('room', $rooms);
  }

  public function joinRoom($id){

  }

  //chat hash generation
  private function generateChatHash($userId){
		$chatHash =  $userId . '-' .time() . '-' . substr((md5(uniqid(rand(),1))), 0, 6);
    return $chatHash;
  }
}
