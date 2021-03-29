<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Event;
use App\Control;
use App\Feedback;
use App\Logs;
use App\RTUDevice;
use Auth;
use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Response;
class ControlController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         //dd($request);
     
            $countsall = Control::where('serial_number', $request->serialnumber)->count() > 0;
            $phonenumber = RTUDevice::where('serial_number', $request->serialnumber)->value("phonenumber");
            if($countsall){
				 $storeControl=Control::where('serial_number', $request->serialnumber)->first();
				 if(($request->line1 == "false")){
					 $storeControl->c1= '0';
				 }else{
					 $storeControl->c1= '1';
				 }
				 if(($request->line2 == "false")){
					 $storeControl->c2= '0';
				 }else{
					 $storeControl->c2='1';
				 }
				 if(($request->line3 == "false")){
					 $storeControl->c3= '0';
				 }else{
					 $storeControl->c3= '1';
				 }
				 $storeControl->save();
            }else{
				 $control_data = [];
				 $control_data = ['serial_number' => $request->serialnumber];
				 $control_data += ['name' => $request->housename];
				 if($request->line1 == "false"){
					 $control_data += ['c1' => '0'];
				 }else{
					 $control_data += ['c1' => '1'];
				 }
				 if($request->line2 == "false"){
					 $control_data += ['c2' => '0'];
				 }else{
					 $control_data += ['c2' => '1'];
				 }
				 if($request->line3 == "false"){
					 $control_data += ['c3' => '0'];
				 }else{
					 $control_data += ['c3' => '1'];
				 }
				 $storeControl= Control::create($control_data);
				 $storeControl->save();
				 $storeFeedback= Feedback::create([
				   'serial_number' => $request->serialnumber,
				 ]);
				 $storeFeedback->save();
            }
            $controldata = array('c1' => $storeControl->c1, 'c2' => $storeControl->c2,'c3' => $storeControl->c3);
            $response= $this->sendSMS($phonenumber,json_encode($controldata));
       
            $logs= Logs::create([
                'email' =>  Auth::user()->email,
                'name' =>  Auth::user()->name,
                'operation' => json_encode($controldata),
            ]);
            $logs->save();
        
        return response()->json([
            'message' => 'Successful',
            'status' => 200,
        ]);
    }
    public function sendSMS($phoneNumber,$message)
    {
        $client = new Client();
        $infobip_url = "https://knjz1.api.infobip.com/sms/1/text/query?username=SusejNigeria2018&password=Susejnigeria123@".'&to='.$phoneNumber.'&text='.$message;
        $response = $client->request('GET', $infobip_url);
      return $response;
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Control  $control
     * @return \Illuminate\Http\Response
     */
    public function show($request)
    {
        $countsall = Control::where('serial_number', $request)->count() > 0;
        $storeControl="";
        if($countsall){
         $storeControl=Control::where('serial_number', $request)->first();
         $storeFeedback=Feedback::where('serial_number', $request)->first();
         $data["control"]=$storeControl;
         $data["feedback"]=$storeFeedback;
        }
       return $data;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Control  $control
     * @return \Illuminate\Http\Response
     */
    public function edit(Control $control)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Control  $control
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Control $control)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Control  $control
     * @return \Illuminate\Http\Response
     */
    public function destroy(Control $control)
    {
        //
    }
}