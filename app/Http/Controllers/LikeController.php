<?php

namespace App\Http\Controllers;

use App\Model\Like;
use App\Model\Reply;
use Illuminate\Http\Request;

class LikeController extends Controller
{

    public function __construct()
    {
        $this->middleware('JWT');
    }

   public function likeit(Reply $reply)
   {
        $reply->likes()->create([
            'user_id'   => '1'
        ]);
   }

   public function unLikeit(Reply $reply)
   {
       $reply->likes()->where('user_id' ,'1')->first()->delete();

   }
}
