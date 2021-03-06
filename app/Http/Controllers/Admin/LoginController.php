<?php
/**
 * Created by PhpStorm.
 * User: zwyl
 * Date: 2018/10/25
 * Time: 14:17
 */

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class LoginController extends Controller{


    /**
     * 后台登录页面
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){

        return view('console.login.index');
    }

    /**
     * 后台登录方法
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function login(Request $request,Admin $admin){

        $validator  = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',

        ],[
            'username.required' => '用户名必填',
            'password.required'  => '密码必填',

        ]);


        if ($validator->fails()) {

            $request->flashOnly(['username']); //闪存用户名
            return redirect(route('admin.login'))->withErrors($validator)->withInput();
        }


        if (Auth::guard('admin')->attempt(['username' => $request->username, 'password' => $request->password])) {

            $admin->login(Auth::guard('admin')->id());
            return redirect(route('admin.admin.index')); //验证成功后跳转
        }

        $validator->errors()->add('field', '账号或者密码错误'); //添加错误到返回

        return redirect(route('admin.login'))->withErrors($validator)->withInput();

    }

    /**
     * 退出
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function logout(){
        Auth::logout();
        return view('admin.login.index');
    }
}
