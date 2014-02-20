//declare timer vars and arrays here outside of curlies, so all function refer to them 
var spawntimer;
var movetimer;
var dropArray=new Array();
var user_bucket=new Bucket(25,250);
onload=init;

function init() {
	//setinterval fires off a function peiodically
	spawntimer = setInterval(spawn,500);
	movetimer = setInterval(moveAllDrops,1000/10);
	//actually put the bucket on the page
	user_bucket.create();
	document.onkeydown=function(e){checkKey(e);}
}
function spawn(){
	//make an object that's an instance of the Drop Class:
	var anotherdrop = new Drop();
	anotherdrop.create();
	//store into our drop array
	dropArray.push(anotherdrop);
}
function moveAllDrops(){
	//interate through the array of drops and do whats in {} to each one
	for(var i=0; i<dropArray.length; i++){
		var currentdrop=dropArray[i];
	//adds a little to the stored y property of the drop
	currentdrop.y+=5;
	//move the drop a few pixels
	currentdrop.item_on_page.style.top=currentdrop.y+"px";
	
	//if drop gets to "bottom" of screen, destroy it
	if(currentdrop.y>350){
		currentdrop.destroy();
	}
	//if the currentdrop is hitting the bucket
	if(collisionCheck(user_bucket,currentdrop)){
		//do various things like add to score and get rid of drop
		currentdrop.destroy();
	}
	}//close for looop
}
function checkKey(e){
	//equalize understanding of the event in all browsers
	e=e||window.event;
	//if its the left arrow...
	if(e.keyCode=='39'){
		//add to buckets x (which will move it rightward) and apply to CSS left
		user_bucket.x+=15;
		user_bucket.setpos();
	}
	//if its the right arrow...
	if(e.keyCode=='37'){
		//subtract from buckets x (move leftward)
		user_bucket.x-=15;
		user_bucket.setpos();
	}
}
function collisionCheck(big_obj,small_obj){
	var big_obj_left_x=big_obj.x;
	var big_obj_right_x=big_obj.x+big_obj.width;
	var big_obj_top_y=big_obj.y;
	var big_obj_bottom_y=big_obj.y+big_obj.height;

	var small_obj_left_x=small_obj.x;
	var small_obj_right_x=small_obj.x+small_obj.width;
	var small_obj_top_y=small_obj.y;
	var small_obj_bottom_y=small_obj.y+small_obj.height;
	console.log(small_obj_left_x +" "+ big_obj_left_x +" "+small_obj_right_x +" "+big_obj_right_x);
	console.log(small_obj_top_y +" "+ big_obj_top_y +" "+small_obj_bottom_y +" "+big_obj_bottom_y);
	console.log("x  "+(small_obj_left_x > big_obj_left_x)+(small_obj_right_x<big_obj_right_x));
	console.log("y  "+(small_obj_top_y<big_obj_top_y)+(small_obj_bottom_y>big_obj_bottom_y));
	
	//if the coordinates of the two objects indicate theyre touching in their left to right positions
	if((small_obj_left_x > big_obj_left_x)&&(small_obj_right_x<big_obj_right_x)){
	console.log("x");
		//if the coordinates of the two objects indicate theyre touching in their top to bottom positions
		if((small_obj_top_y > big_obj_top_y)&&(small_obj_bottom_y < big_obj_bottom_y)){
		//send back that yes theyre colliding return true
	console.log("y");
		return true;
		}
	}
	//otherwise send back that no they NOT colliding
	return false;
	
}